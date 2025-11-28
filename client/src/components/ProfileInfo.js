import React, { useState, useRef } from "react";
import { Box, Avatar, Typography, Grid, Button, Modal, TextField } from "@mui/material";

export default function ProfileInfo({ user, userId, follow, feedCount, currentUserId, refresh }) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fnSaveIntro = () => {
    fetch(`http://localhost:3010/user/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({ content: contentRef.current.value }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.msg);
        refresh(); // 부모에서 데이터 다시 가져오기
        handleClose();
      });
  };

  const isMyPage = currentUserId === userId; // 로그인한 사용자와 해당 페이지 사용자 비교

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
      <Avatar src={user?.profile_PATH || ""} alt={user?.NICKNAME || ""} sx={{ width: 100, height: 100, mb: 2 }} />
      <Typography variant="h5">{user?.NICKNAME || "익명"}</Typography>
      <Typography variant="body2" color="text.secondary">
        @{userId}
      </Typography>

      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={4} textAlign="center">
          <Typography variant="h6">팔로워</Typography>
          <Typography>{follow?.followerCnt ?? 0}</Typography>
        </Grid>
        <Grid item xs={4} textAlign="center">
          <Typography variant="h6">팔로잉</Typography>
          <Typography>{follow?.followingCnt ?? 0}</Typography>
        </Grid>
        <Grid item xs={4} textAlign="center">
          <Typography variant="h6">게시물</Typography>
          <Typography>{feedCount?.CNT ?? 0}</Typography>
        </Grid>
      </Grid>

      <Box mt={2} width="100%">
        {user?.INTRO ? (
          <Typography>{user.INTRO}</Typography>
        ) : isMyPage ? (
          <Button variant="contained" onClick={handleOpen}>
            소개 작성하기
          </Button>
        ) : (
          <Typography color="text.secondary">소개가 없습니다.</Typography>
        )}
      </Box>

      {isMyPage && (
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h6" textAlign="center" gutterBottom>
              소개 작성하기
            </Typography>
            <TextField
              inputRef={contentRef}
              defaultValue={user?.INTRO || ""}
              multiline
              rows={4}
              fullWidth
              variant="outlined"
            />
            <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={fnSaveIntro}>
              저장
            </Button>
          </Box>
        </Modal>
      )}
    </Box>
  );
}
