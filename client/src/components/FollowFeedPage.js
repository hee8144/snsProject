import React, { useEffect, useState } from "react";
import { Container, Box, Typography } from "@mui/material";
import FeedList from "../components/FeedList";

export default function FollowFeedPage() {
  const [feedList, setFeedList] = useState([]);
  const [currentUserId, setCurrentUserId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    // JWT에서 userId 가져오기
    const decoded = JSON.parse(atob(token.split(".")[1])); // 간단하게 디코딩
    setCurrentUserId(decoded.userId);

    fetch("http://localhost:3010/feed/followfeed", {
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => res.json())
      .then((data) => setFeedList(data.list || []))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 3 }}>
        <Typography variant="h5" gutterBottom>
          팔로워/팔로잉 피드
        </Typography>
        <FeedList feedList={feedList} currentUserId={currentUserId} refresh={() => {}} />
      </Box>
    </Container>
  );
}
