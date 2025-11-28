import { Box, TextField, Button, List, ListItem, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";
import io from "socket.io-client";

function Chat({ currentUserId }) {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");

  // 1️⃣ Socket.io 연결
  useEffect(() => {
    const s = io("http://localhost:3010");
    setSocket(s);

    s.on("connect", () => console.log("Socket connected:", s.id));

    // 2️⃣ 서버에서 받은 메시지 수신
    s.on("receive_comment", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => s.disconnect();
  }, []);

  // 3️⃣ 메시지 전송
  const sendMessage = () => {
    if (!newMsg.trim()) return;

    const messageData = {
      userId: currentUserId,
      content: newMsg,
      time: new Date().toLocaleTimeString(),
    };

    socket?.emit("send_comment", messageData); // 서버로 전송
    setNewMsg(""); // 입력창 초기화
  };

  return (
    <Box
      sx={{
        width: 400,
        height: 500,
        border: "1px solid #ccc",
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* 메시지 목록 */}
      <List sx={{ flex: 1, overflowY: "auto", px: 1 }}>
        {messages.map((msg, idx) => (
          <ListItem key={idx}>
            <ListItemText primary={`${msg.userId}: ${msg.content}`} secondary={msg.time} />
          </ListItem>
        ))}
      </List>

      {/* 입력창 */}
      <Box sx={{ display: "flex", p: 1, gap: 1 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="메시지를 입력하세요"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />
        <Button variant="contained" onClick={sendMessage}>
          전송
        </Button>
      </Box>
    </Box>
  );
}

export default Chat;
