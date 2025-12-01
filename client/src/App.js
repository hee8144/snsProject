import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import Login from "./components/Login";
import Join from "./components/Join"; // Join으로 변경
import Feed from "./components/Feed";
import Register from "./components/Register";
import MyPage from "./components/MyPage";
import Menu from "./components/Menu"; // Menu로 변경
import UserPage from "./components/UserPage";
import FollowFeedPage from "./components/FollowFeedPage";
import Publicchat from "./components/Publicchat";
import Privatechat from "./components/Privatechat";
import ChatRoomList from "./components/ChatRoomList";

import { jwtDecode } from "jwt-decode";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthPage = location.pathname === "/" || location.pathname === "/join";

  const [currentUserId, setCurrentUserId] = React.useState("");

  // 토큰 확인 함수
  const checkToken = React.useCallback(() => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000; // 현재 시간 (초)
      if (decoded.exp && decoded.exp < now) {
        // 만료됨
        localStorage.removeItem("token");
        setCurrentUserId("");
        alert("다시 로그인 해주세요.");
        navigate("/"); // 로그인 화면으로 이동
        return false;
      }
      setCurrentUserId(decoded.userId);
      return true;
    } catch {
      localStorage.removeItem("token");
      setCurrentUserId("");
      navigate("/");
      return false;
    }
  }, [navigate]);

  React.useEffect(() => {
    checkToken(); // 처음 로드 시 체크

    // 주기적으로 체크 (예: 1초마다)
    const interval = setInterval(checkToken, 1000);
    return () => clearInterval(interval);
  }, [checkToken]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {!isAuthPage && <Menu currentUserId={currentUserId} />}
      <Box component="main" sx={{ flexGrow: 1, mt: 8 }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/feed" element={<Feed currentUserId={currentUserId} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mypage" element={<MyPage currentUserId={currentUserId} />} />
          <Route path="/user/:userId" element={<UserPage currentUserId={currentUserId} />} />
          <Route path="/followfeed" element={<FollowFeedPage currentUserId={currentUserId} />} />
          <Route path="/publicchat" element={<Publicchat currentUserId={currentUserId} />} />
          <Route path="/chatroomList" element={<ChatRoomList currentUserId={currentUserId} />} />
          <Route path="/privatechat/:otherUserId" element={<Privatechat currentUserId={currentUserId} />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
