// NotificationList.js
import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemText, Badge, IconButton, Box } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

export default function NotificationList({ currentUserId }) {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!currentUserId) return;
    fetch(`http://localhost:3010/notification/${currentUserId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setNotifications(data.notifications || []);
      });
  }, [currentUserId]);

  // 알림 읽음 처리
  const markAsRead = (notifId) => {
    fetch(`http://localhost:3010/notification/read/${notifId}`, { method: "PUT" }).then(() => {
      setNotifications((prev) => prev.filter((n) => n.NOTIF_ID !== notifId));
    });
  };

  // 읽지 않은 알림 개수
  const unreadCount = notifications.filter((n) => n.IS_READ === 0).length;

  return (
    <Box sx={{ position: "relative" }}>
      <IconButton onClick={() => setOpen(!open)}>
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      {open && (
        <List
          sx={{
            width: 300,
            bgcolor: "background.paper",
            position: "absolute",
            top: 45,
            right: 0,
            boxShadow: 3,
            zIndex: 100,
          }}
        >
          {notifications.length === 0 && (
            <ListItem>
              <ListItemText primary="알림이 없습니다." />
            </ListItem>
          )}

          {notifications.map((notif) => (
            <ListItem
              key={notif.NOTIF_ID}
              button
              onClick={() => markAsRead(notif.NOTIF_ID)}
              sx={{
                bgcolor: notif.IS_READ === 0 ? "#e3f2fd" : "inherit",
              }}
            >
              <ListItemText
                primary={`${notif.from_user || notif.FROM_USER} ${
                  notif.TYPE === "like"
                    ? "님이 좋아요를 눌렀습니다"
                    : notif.TYPE === "comment"
                    ? "님이 댓글을 남겼습니다"
                    : "님이 팔로우했습니다"
                }`}
                secondary={notif.content || notif.CONTENT || null}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}
