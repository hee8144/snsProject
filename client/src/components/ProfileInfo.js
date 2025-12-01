import React, { useState, useEffect } from "react";
import { Box, Avatar, Typography, Grid, Button, Modal, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ProfileInfo({ user, userId, follow, feedCount, currentUserId, refresh }) {
  const [open, setOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [newNickname, setNewNickname] = useState("");
  const [newIntro, setNewIntro] = useState("");
  const [currentPw, setCurrentPw] = useState("");
  const [pwError, setPwError] = useState("");
  const [isFollowing, setIsFollowing] = useState(follow?.isFollowing || false);

  const navigate = useNavigate();
  const isMyPage = currentUserId === userId;

  useEffect(() => {
    if (!currentUserId || isMyPage) return;
    fetch(`http://localhost:3010/chat/unread/${userId}/${currentUserId}`)
      .then((res) => res.json())
      .then((data) => setUnreadCount(data.count || 0));
  }, []);

  useEffect(() => {
    if (isMyPage) return; // 내 페이지면 팔로우 버튼 없음

    const token = localStorage.getItem("token");
    fetch(`http://localhost:3010/user/isFollowing/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setIsFollowing(data.isFollowing);
      })
      .catch((err) => console.log(err));
  }, [userId, isMyPage]);

  const toggleFollow = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:3010/follow`, {
      method: isFollowing ? "DELETE" : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        follower: currentUserId,
        following: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.msg);
        // 상태 업데이트
        setIsFollowing(!isFollowing);
      });
  };

  const handleOpen = () => {
    setNewNickname(user?.NICKNAME || "");
    setNewIntro(user?.INTRO || "");
    setCurrentPw("");
    setPwError("");
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const saveProfile = async () => {
    setPwError("");
    const checkRes = await fetch("http://localhost:3010/user/checkPw", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
      body: JSON.stringify({ userId, password: currentPw }),
    });
    const checkData = await checkRes.json();
    if (!checkData.valid) {
      setPwError("현재 비밀번호가 올바르지 않습니다.");
      return;
    }
    const updateRes = await fetch(`http://localhost:3010/user/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
      body: JSON.stringify({ nickname: newNickname, intro: newIntro }),
    });
    const updateData = await updateRes.json();
    alert(updateData.msg);
    refresh();
    handleClose();
  };

  return (
    <Box width="100%" p={2} sx={{ border: "1px solid #ddd", borderRadius: 2, bgcolor: "#fafafa" }}>
      {/* 상단 Avatar + 이름 + 팔로우 버튼 */}
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Avatar src={user?.profile_PATH || ""} sx={{ width: 100, height: 100, mr: 2 }} />
          <Box>
            <Typography fontWeight="bold" fontSize={18}>
              {user?.NICKNAME}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              @{user?.userId}
            </Typography>
          </Box>
        </Box>
        {!isMyPage && (
          <Button
            variant={isFollowing ? "outlined" : "contained"}
            color="primary"
            onClick={toggleFollow}
            sx={{ minWidth: 90 }}
          >
            {isFollowing ? "팔로잉" : "팔로우"}
          </Button>
        )}
      </Box>

      {/* 게시물 / 팔로워 / 팔로잉 */}
      <Box display="flex" justifyContent="space-around" mt={2} textAlign="center">
        <Box>
          <Typography fontWeight="bold">{feedCount?.CNT ?? 0}</Typography>
          <Typography variant="body2">게시물</Typography>
        </Box>
        <Box>
          <Typography fontWeight="bold">{follow?.followerCnt ?? 0}</Typography>
          <Typography variant="body2">팔로워</Typography>
        </Box>
        <Box>
          <Typography fontWeight="bold">{follow?.followingCnt ?? 0}</Typography>
          <Typography variant="body2">팔로잉</Typography>
        </Box>
      </Box>

      {/* 소개 */}
      {user?.INTRO && (
        <Typography mt={2} fontSize={14} color="textSecondary">
          {user.INTRO}
        </Typography>
      )}

      {/* 메시지 / 프로필 수정 버튼 */}
      <Box mt={2} display="flex" gap={1}>
        {isMyPage ? (
          <Button variant="outlined" fullWidth onClick={handleOpen}>
            프로필 수정
          </Button>
        ) : (
          <Button variant="contained" fullWidth onClick={() => navigate(`/privatechat/${userId}`)}>
            메시지 {unreadCount > 0 && `(${unreadCount})`}
          </Button>
        )}
      </Box>

      {/* 모달 */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 420,
            bgcolor: "background.paper",
            p: 3,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" mb={2}>
            프로필 수정
          </Typography>
          <TextField
            fullWidth
            label="닉네임"
            value={newNickname}
            onChange={(e) => setNewNickname(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="소개"
            multiline
            rows={3}
            value={newIntro}
            onChange={(e) => setNewIntro(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            type="password"
            label="현재 비밀번호"
            value={currentPw}
            onChange={(e) => setCurrentPw(e.target.value)}
            sx={{ mb: 1 }}
            error={pwError !== ""}
            helperText={pwError}
          />
          <Button variant="contained" fullWidth onClick={saveProfile}>
            저장
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
