import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Container, Paper } from "@mui/material";
import ProfileInfo from "./ProfileInfo";
import FeedTabs from "./FeedTabs";
import { jwtDecode } from "jwt-decode";

export default function UserPage() {
  const { userId: paramUserId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [follow, setFollow] = useState({});
  const [feedCount, setFeedCount] = useState({});
  const [myFeedList, setMyFeedList] = useState([]);
  const [favFeedList, setFavFeedList] = useState([]);
  const [images, setImages] = useState([]);
  const [currentUserId, setCurrentUserId] = useState("");

  const fetchUserData = (userId) => {
    fetch(`http://localhost:3010/user/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data.info);
        setFollow(data.follow);
        setFeedCount(data.cnt);
        setMyFeedList(data.myfeed);
        setFavFeedList(data.favfeed);
        setImages(data.img);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("로그인 후 이용해주세요.");
      navigate("/");
      return;
    }

    let userIdFromToken;
    try {
      const decoded = jwtDecode(token);
      userIdFromToken = decoded.userId;
      setCurrentUserId(userIdFromToken);
    } catch (err) {
      localStorage.removeItem("token");
      navigate("/");
      return;
    }

    const fetchId = paramUserId || userIdFromToken;
    fetchUserData(fetchId);
  }, [paramUserId, navigate]);

  return (
    <Container maxWidth="md">
      <Box display="flex" flexDirection="column" alignItems="center" sx={{ padding: 2 }}>
        <Paper sx={{ padding: 3, width: "100%", borderRadius: 2 }}>
          {/* ProfileInfo에 로그인한 사용자 ID 전달 */}
          <ProfileInfo
            user={user}
            userId={paramUserId}
            follow={follow}
            feedCount={feedCount}
            currentUserId={currentUserId} // 수정 버튼 렌더링 조건 확인용
          />
          <FeedTabs
            userId={paramUserId}
            myFeedList={myFeedList}
            favFeedList={favFeedList}
            images={images}
            refresh={() => fetchUserData(paramUserId)}
            currentUserId={currentUserId}
          />
        </Paper>
      </Box>
    </Container>
  );
}
