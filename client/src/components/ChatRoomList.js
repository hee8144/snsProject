// ChatRoomList.js
import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemText, Badge, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ChatRoomList({ currentUserId }) {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUserId) return;

    fetch(`http://localhost:3010/chat/rooms/${currentUserId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.rooms) {
          setRooms(data.rooms);
        }
      })
      .catch((err) => console.error(err));
  }, [currentUserId]);

  const enterRoom = (room) => {
    if (room.type === "public") {
      navigate("/publicchat");
    } else if (room.type === "private") {
      navigate(`/privatechat/${room.other_user_id}`);
    }
  };

  return (
    <Box
      sx={{
        width: 400,
        mx: "auto",
        mt: 5,
        borderRadius: 3,
        boxShadow: 4,
        bgcolor: "#fafafa",
        overflow: "hidden",
        border: "1px solid #e0e0e0",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          p: 2,
          borderBottom: "1px solid #e0e0e0",
          textAlign: "center",
          fontWeight: "bold",
          backgroundColor: "#1976d2",
          color: "#fff",
        }}
      >
        채팅방 목록
      </Typography>
      <List sx={{ maxHeight: 500, overflowY: "auto" }}>
        {rooms.length === 0 && (
          <ListItem sx={{ justifyContent: "center" }}>
            <ListItemText primary="채팅방이 없습니다." sx={{ textAlign: "center" }} />
          </ListItem>
        )}
        {rooms.map((room) => (
          <ListItem
            button
            key={room.other_user_id}
            onClick={() => enterRoom(room)}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              px: 3,
              py: 1.5,
              transition: "all 0.2s",
              "&:hover": {
                bgcolor: "#e3f2fd",
                transform: "translateX(2px)",
              },
            }}
          >
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                {room.type === "public" ? "공용 채팅" : room.other_user_id}
              </Typography>
              <Typography variant="body2" sx={{ color: "#555", mt: 0.5 }}>
                {room.last_message || "최근 메시지가 없습니다."}
              </Typography>
            </Box>
            {room.unread_count > 0 && (
              <Badge
                badgeContent={room.unread_count}
                color="error"
                sx={{ "& .MuiBadge-badge": { fontSize: 14, minWidth: 24, height: 24 } }}
              />
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
