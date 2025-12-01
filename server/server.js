const express = require("express");
const cors = require("cors");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

const feedRouter = require("./routes/feed");
const userRouter = require("./routes/user");
const commentRouter = require("./routes/comment");
const favRouter = require("./routes/fav");
const followRouter = require("./routes/follow");
const NotifiRouter = require("./routes/Notification");
const chatRouter = require("./routes/chat");

const db = require("./db");

const app = express();
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/userImg", express.static(path.join(__dirname, "userImg")));

app.use("/feed", feedRouter);
app.use("/comment", commentRouter);
app.use("/fav", favRouter);
app.use("/user", userRouter);
app.use("/follow", followRouter);
app.use("/notification", NotifiRouter);
app.use("/chat", chatRouter);

// --- Socket.io 서버 ---
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  // 채팅방 참여
  socket.on("join_room", async ({ sender, receiver }) => {
    const room = receiver ? [sender, receiver].sort().join("_") : "public";
    socket.join(room);
    console.log(`${sender} joined room: ${room}`);

    if (receiver) {
      try {
        // 읽음 처리
        await db.query(
          `UPDATE sns_private_chat
           SET read_status = 1
           WHERE sender_id = ? AND receiver_id = ? AND read_status = 0`,
          [receiver, sender]
        );

        // 기존 메시지 가져오기
        const [rows] = await db.query(
          `SELECT p.*, u.NICKNAME
           FROM sns_private_chat p
           INNER JOIN sns_user u ON p.sender_id = u.userid
           WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?)
           ORDER BY created_at ASC`,
          [sender, receiver, receiver, sender]
        );

        io.to(room).emit("update_messages", rows);
      } catch (err) {
        console.error("❌ 읽음 처리 오류:", err);
      }
    }
  });

  // 메시지 전송
  socket.on("send_message", async (data) => {
    try {
      if (data.receiver) {
        const room = [data.userId, data.receiver].sort().join("_");

        // DB에 메시지 저장
        const [result] = await db.query(
          "INSERT INTO sns_private_chat (sender_id, receiver_id, content, created_at, read_status) VALUES (?, ?, ?, NOW(), 0)",
          [data.userId, data.receiver, data.content]
        );
        const msgId = result.insertId;

        // 알림 생성 (자기 자신이면 생략)
        if (data.userId !== data.receiver) {
          await db.query(
            `INSERT INTO SNS_NOTIFICATION
             (USER_ID, TYPE, FROM_USER, CONTENT, IS_READ, CREATED_AT)
             VALUES (?, 'message', ?, ?, 0, NOW())`,
            [data.receiver, data.userId, "새로운 1:1 메시지가 도착하였습니다"]
          );

          // 실시간 알림 전송
          io.to(room).emit("new_notification", {
            type: "message",
            content: "새로운 1:1 메시지가 도착하였습니다",
            from_user: data.userId,
          });
        }

        // 메시지 전송 (클라이언트에서 로컬 append 하지 않음)
        io.to(room).emit("receive_message", {
          msg_id: msgId,
          userId: data.userId,
          receiverId: data.receiver,
          content: data.content,
          nickname: "나",
          time: new Date().toLocaleTimeString(),
          read_status: 0,
        });
      } else {
        const room = "public";
        await db.query(
          "INSERT INTO sns_public_chat (userId, content, created_at, room_id) VALUES (?, ?, NOW(), 'public')",
          [data.userId, data.content]
        );

        io.to(room).emit("receive_message", {
          userId: data.userId,
          content: data.content,
          time: new Date().toLocaleTimeString(),
          receiver: null,
          read_status: 0,
        });
      }
    } catch (err) {
      console.error("❌ 메시지 전송 오류:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log(`User Disconnected: ${socket.id}`);
  });
});

server.listen(3010, () => {
  console.log("server start!");
});
