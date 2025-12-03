import React, { useEffect, useState } from "react";
import { Container, Box, Paper, Tabs, Tab } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProfileInfo from "./ProfileInfo";
import FeedList from "./FeedList";
import { jwtDecode } from "jwt-decode";

export default function MyPage() {
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState("");
  const [follow, setFollow] = useState({});
  const [feedCount, setFeedCount] = useState({});
  const [myFeedList, setMyFeedList] = useState([]);
  const [favFeedList, setFavFeedList] = useState([]);
  const [images, setImages] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const navigate = useNavigate();

  const fetchUserData = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("로그인 후 이용해주세요.");
      navigate("/");
      return;
    }

    let decoded;
    try {
      decoded = jwtDecode(token);
      setUserId(decoded.userId);
    } catch (err) {
      localStorage.removeItem("token");
      navigate("/");
      return;
    }

    fetch(`http://localhost:3010/user/${decoded.userId}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data.info);
        setFollow(data.follow || {}); // 팔로워, 팔로잉 정보
        setFeedCount(data.cnt || {}); // 게시물 수
        setMyFeedList(data.myfeed || []);
        setFavFeedList(data.favfeed || []);
        setImages(data.img || []);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <Container maxWidth="md">
      <Box display="flex" flexDirection="column" alignItems="center" sx={{ p: 2 }}>
        <Paper sx={{ p: 3, width: "100%", borderRadius: 2 }}>
          {/* ProfileInfo */}
          <ProfileInfo
            user={user}
            userId={userId}
            follow={follow}
            feedCount={feedCount}
            currentUserId={userId} // 수정 버튼 렌더링 조건 확인용
            refresh={fetchUserData}
          />

          {/* 탭 */}
          <Box mt={3}>
            <Tabs value={tabValue} onChange={(e, newVal) => setTabValue(newVal)} centered>
              <Tab label="나의 글" />
              <Tab label="좋아요한 글" />
            </Tabs>

            <Box mt={2}>
              {tabValue === 0 ? (
                <FeedList feedList={myFeedList} currentUserId={userId} refresh={fetchUserData} />
              ) : (
                <FeedList feedList={favFeedList} currentUserId={userId} refresh={fetchUserData} />
              )}
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
