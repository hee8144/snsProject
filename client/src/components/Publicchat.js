import { Box, TextField, Button, List, ListItem, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { jwtDecode } from "jwt-decode";
import BackButton from "./BackButton"; // 🔹 뒤로가기 버튼 import

function Publicchat() {
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const [currentUserId, setCurrentUserId] = useState("");

  // 0️⃣ 초기 유저 정보 세팅
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const decoded = jwtDecode(token);
    setCurrentUserId(decoded.userId);
  }, []);

  // 1️⃣ 기존 메시지 불러오기
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const res = await fetch("http://localhost:3010/chat/messages?room=public&userId=" + currentUserId);
        const data = await res.json();

        const normalized = (data.messages || []).map((item) => ({
          userId: item.userId,
          content: item.content,
          time: new Date(item.created_at).toLocaleTimeString(),
          nickname: item.NICKNAME || item.userName || item.userId,
        }));

        setMessages(normalized);
      } catch (err) {}
    };

    if (currentUserId) loadHistory();
  }, [currentUserId]);

  // 2️⃣ Socket 연결
  useEffect(() => {
    if (!currentUserId) return;

    const socket = io("http://localhost:3010");
    socketRef.current = socket;

    socket.on("connect", () => {
      socket.emit("join_room", { sender: currentUserId }); // public room join
    });

    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.disconnect();
  }, [currentUserId]);

  // 3️⃣ 스크롤 자동 아래로
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 4️⃣ 메시지 보내기
  const sendMessage = () => {
    if (!newMsg.trim() || !currentUserId) return;

    const msgData = {
      room: "public",
      userId: currentUserId,
      content: newMsg,
      nickname: currentUserId,
      time: new Date().toLocaleTimeString(),
    };

    socketRef.current.emit("send_message", msgData);
    setNewMsg("");
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f2f5",
      }}
    >
      <Box
        sx={{
          width: 450,
          height: 600,
          border: "1px solid #ccc",
          borderRadius: 3,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#f9f9f9",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        {/* 🔹 헤더: 뒤로가기 버튼 + Public */}
        <Box
          sx={{
            p: 2,
            borderBottom: "1px solid #ccc",
            backgroundColor: "#eee",
            display: "flex",
            alignItems: "center",
            fontWeight: "bold",
          }}
        >
          <BackButton />
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            공용 채팅
          </Typography>
        </Box>

        {/* 메시지 리스트 */}
        <List sx={{ flex: 1, overflowY: "auto", px: 2, py: 1 }}>
          {messages.map((msg, idx) => {
            const isMe = msg.userId === currentUserId;
            return (
              <ListItem
                key={idx}
                sx={{
                  display: "flex",
                  justifyContent: isMe ? "flex-end" : "flex-start",
                  py: 0.5,
                }}
              >
                <Box
                  sx={{
                    maxWidth: "70%",
                    bgcolor: isMe ? "#1976d2" : "#e0e0e0",
                    color: isMe ? "#fff" : "#000",
                    p: 1.2,
                    borderRadius: 2,
                    wordBreak: "break-word",
                  }}
                >
                  <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 0.3 }}>
                    {msg.nickname}
                  </Typography>
                  <Typography variant="body2">{msg.content}</Typography>
                  <Typography variant="caption" sx={{ display: "block", textAlign: "right", mt: 0.5 }}>
                    {msg.time}
                  </Typography>
                </Box>
              </ListItem>
            );
          })}
          <div ref={messagesEndRef} />
        </List>

        {/* 입력창 */}
        <Box sx={{ display: "flex", p: 1, gap: 1, borderTop: "1px solid #ccc" }}>
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
    </Box>
  );
}

export default Publicchat;
