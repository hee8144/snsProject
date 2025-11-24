import React from "react";
import { Container, Typography, Box, Avatar, Grid, Paper } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
function MyPage() {
  let [info, setInfo] = useState([]);
  let [cnt, setCnt] = useState(0);
  useEffect(() => {
    fetch("http://localhost:3010/user/qwer")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setInfo(data.list);
        setCnt(data.cnt[0]);
      });
  }, []);

  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start"
        minHeight="100vh"
        sx={{ padding: "20px" }}
      >
        <Paper elevation={3} sx={{ padding: "20px", borderRadius: "15px", width: "100%" }}>
          {/* 프로필 정보 상단 배치 */}
          <Box display="flex" flexDirection="column" alignItems="center" sx={{ marginBottom: 3 }}>
            <Avatar
              alt="프로필 이미지"
              src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e" // 프로필 이미지 경로
              sx={{ width: 100, height: 100, marginBottom: 2 }}
            />
            <Typography variant="h5">{info?.userName}</Typography>
            <Typography variant="body2" color="text.secondary">
              @{info?.userId}
            </Typography>
          </Box>
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            <Grid item xs={4} textAlign="center">
              <Typography variant="h6">팔로워</Typography>
              <Typography variant="body1">{info?.follower}</Typography>
            </Grid>
            <Grid item xs={4} textAlign="center">
              <Typography variant="h6">팔로잉</Typography>
              <Typography variant="body1">{info?.following}</Typography>
            </Grid>
            <Grid item xs={4} textAlign="center">
              <Typography variant="h6">게시물</Typography>
              <Typography variant="body1">{cnt?.CNT}</Typography>
            </Grid>
          </Grid>
          <Box sx={{ marginTop: 3 }}>
            <Typography variant="h6">내 소개</Typography>
            <Typography variant="body1">{info?.intro}</Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default MyPage;
