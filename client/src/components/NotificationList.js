// NotificationList.js
import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemText, Badge, IconButton, Box } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import io from "socket.io-client";

export default function NotificationList({ currentUserId }) {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const socketRef = React.useRef(null);

  useEffect(() => {
    if (!currentUserId) return;

    fetch(`http://localhost:3010/notification/${currentUserId}`)
      .then((res) => res.json())
      .then((data) => setNotifications(data.notifications || []));

    const socket = io("http://localhost:3010");
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Notification socket connected:", socket.id);
      socket.emit("join_room", { sender: currentUserId });
    });
    socket.on("receive_message", (msg) => {
      if (msg.receiver === currentUserId) {
        setNotifications((prev) => [
          {
            NOTIF_ID: `msg_${Date.now()}`,
            TYPE: "message",
            IS_READ: 0,
            from_user: msg.nickname || msg.userId,
            content: msg.content,
          },
          ...prev,
        ]);
      }
    });

    return () => socket.disconnect();
  }, [currentUserId]);

  const markAsRead = (notifId) => {
    fetch(`http://localhost:3010/notification/read/${notifId}`, { method: "PUT" }).finally(() => {
      setNotifications((prev) => prev.filter((n) => n.NOTIF_ID !== notifId));
    });
  };

  const unreadCount = notifications.filter((n) => n.IS_READ === 0).length;

  return (
    <Box sx={{ position: "relative" }}>
      <IconButton onClick={() => setOpen(!open)} sx={{ color: "inherit" }}>
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      {open && (
        <List
          sx={{
            width: 300,
            maxHeight: 400,
            overflowY: "auto",
            bgcolor: "#ffffff",
            position: "absolute",
            top: 40,
            right: 0,
            boxShadow: 3,
            borderRadius: 2,
            zIndex: 1500,
            p: 0,
          }}
        >
          {notifications.length === 0 && (
            <ListItem>
              <ListItemText
                primary="알림이 없습니다."
                primaryTypographyProps={{ textAlign: "center", color: "text.secondary" }}
              />
            </ListItem>
          )}

          {notifications.map((notif) => (
            <ListItem
              key={notif.NOTIF_ID}
              button
              onClick={() => markAsRead(notif.NOTIF_ID)}
              sx={{
                bgcolor: notif.IS_READ === 0 ? "#43a047" : "#f5f5f5",
                color: notif.IS_READ === 0 ? "#fff" : "inherit",
                "&:hover": { bgcolor: notif.IS_READ === 0 ? "#115293" : "#e0e0e0" },
                borderBottom: "1px solid #e0e0e0",
                py: 1,
                px: 2,
              }}
            >
              <ListItemText
                primaryTypographyProps={{ fontSize: 14 }}
                secondaryTypographyProps={{ fontSize: 12, color: "text.secondary" }}
                primary={
                  notif.TYPE === "message"
                    ? `${notif.FROM_USER}님이 메시지를 보냈습니다`
                    : notif.TYPE === "like"
                    ? `${notif.FROM_USER}님이 좋아요를 눌렀습니다`
                    : notif.TYPE === "comment"
                    ? `${notif.FROM_USER}님이 댓글을 남겼습니다`
                    : `${notif.FROM_USER}님이 팔로우했습니다`
                }
                secondary={notif.content || null}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}
