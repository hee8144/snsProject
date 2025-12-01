import React, { useState, useRef, useEffect } from "react";
import { Box, TextField, Button, List, ListItem, Typography } from "@mui/material";
import io from "socket.io-client";
import { jwtDecode } from "jwt-decode";
import { useParams } from "react-router-dom";
import BackButton from "./BackButton"; // 🔹 여기서 import

function PrivateChat({ showNotification }) {
  const { otherUserId } = useParams();
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  const [currentUserId, setCurrentUserId] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const [otherUserName, setOtherUserName] = useState(otherUserId);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const decoded = jwtDecode(token);
    setCurrentUserId(decoded.userId);
  }, []);

  useEffect(() => {
    if (!currentUserId || socketRef.current) return;

    const socket = io("http://localhost:3010");
    socketRef.current = socket;

    socket.emit("join_room", { sender: currentUserId, receiver: otherUserId });

    socket.on("update_messages", (rows) => {
      const normalized = rows.map((item) => ({
        msg_id: item.msg_id,
        userId: item.sender_id,
        receiverId: item.receiver_id,
        content: item.content,
        time: new Date(item.created_at).toLocaleTimeString(),
        nickname: item.sender_id === currentUserId ? "나" : item.NICKNAME || item.userName || item.sender_id,
        read_status: item.read_status,
      }));
      setMessages(normalized);
    });

    socket.on("receive_message", (data) => {
      setMessages((prev) => {
        if (prev.some((m) => m.msg_id === data.msg_id)) return prev;
        return [...prev, { ...data, nickname: data.userId === currentUserId ? "나" : data.nickname || data.userId }];
      });

      if (data.userId !== currentUserId && showNotification) {
        showNotification(data);
      }
    });

    return () => {
      socket.off("receive_message");
      socket.off("update_messages");
      socket.disconnect();
      socketRef.current = null;
    };
  }, [currentUserId, otherUserId, showNotification]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!newMsg.trim() || !currentUserId) return;

    const msgData = {
      userId: currentUserId,
      receiver: otherUserId,
      content: newMsg,
    };

    socketRef.current.emit("send_message", msgData);
    setNewMsg("");
  };

  return (
    <Box
      sx={{
        width: 450,
        height: 550,
        border: "1px solid #ccc",
        borderRadius: 3,
        display: "flex",
        flexDirection: "column",
        mx: "auto",
        mt: 5,
        boxShadow: 3,
        backgroundColor: "#f9f9f9",
      }}
    >
      {/* 🔹 헤더: 뒤로가기 버튼 + 상대방 이름 */}
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
          {otherUserName}
        </Typography>
      </Box>

      <List sx={{ flex: 1, overflowY: "auto", px: 2, py: 1 }}>
        {messages.map((msg, idx) => {
          const isMe = msg.userId === currentUserId;
          return (
            <ListItem key={msg.msg_id || idx} sx={{ justifyContent: isMe ? "flex-end" : "flex-start" }}>
              <Box
                sx={{
                  position: "relative",
                  backgroundColor: isMe ? "#1976d2" : "#e0e0e0",
                  color: isMe ? "#fff" : "#000",
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  maxWidth: "70%",
                  wordBreak: "break-word",
                }}
              >
                {isMe && msg.read_status === 0 && (
                  <Box
                    sx={{
                      position: "absolute",
                      left: -12,
                      bottom: 0,
                      bgcolor: "red",
                      color: "#fff",
                      borderRadius: "50%",
                      width: 18,
                      height: 18,
                      fontSize: 12,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    1
                  </Box>
                )}

                <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                  {msg.nickname}
                </Typography>
                <Typography variant="body2">{msg.content}</Typography>
                <Typography variant="caption" sx={{ display: "block", textAlign: "right", mt: 0.3 }}>
                  {msg.time}
                </Typography>
              </Box>
            </ListItem>
          );
        })}
        <div ref={messagesEndRef} />
      </List>

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

export default PrivateChat;
