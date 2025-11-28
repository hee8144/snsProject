const express = require("express");
const cors = require("cors");
const path = require("path");
const http = require("http"); // 추가
const { Server } = require("socket.io"); // 추가

// const stuRouter = require("./routes/student");
const feedRouter = require("./routes/feed");
const userRouter = require("./routes/user");
const commentRouter = require("./routes/comment");
const favRouter = require("./routes/fav");
const followRouter = require("./routes/follow");
const NotifiRouter = require("./routes/Notification");

const app = express();
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/userImg", express.static(path.join(__dirname, "userImg")));
// router 영역
app.use("/feed", feedRouter);
app.use("/comment", commentRouter);
app.use("/fav", favRouter);
app.use("/user", userRouter);
app.use("/follow", followRouter);
app.use("/notification", NotifiRouter);

// 서버 + Socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  // 클라이언트에서 댓글 보내기
  socket.on("send_comment", (data) => {
    console.log("받은 댓글:", data);
    // 모든 클라이언트에게 전달
    io.emit("receive_comment", data);
  });

  socket.on("disconnect", () => {
    console.log(`User Disconnected: ${socket.id}`);
  });
});

server.listen(3010, () => {
  console.log("server start!");
});
