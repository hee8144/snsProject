import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import Login from "./components/Login";
import Join from "./components/Join"; // Join으로 변경
import Feed from "./components/Feed";
import Register from "./components/Register";
import MyPage from "./components/MyPage";
import Menu from "./components/Menu"; // Menu로 변경
import UserPage from "./components/UserPage";
import FollowFeedPage from "./components/FollowFeedPage";
import Chat from "./components/chat";
import { jwtDecode } from "jwt-decode";

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/" || location.pathname === "/join";

  const [currentUserId, setCurrentUserId] = React.useState("");

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setCurrentUserId(decoded.userId);
      } catch {
        localStorage.removeItem("token");
      }
    }
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {!isAuthPage && <Menu currentUserId={currentUserId} />}
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/feed" element={<Feed currentUserId={currentUserId} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mypage" element={<MyPage currentUserId={currentUserId} />} />
          <Route path="/user/:userId" element={<UserPage currentUserId={currentUserId} />} />
          <Route path="/followfeed" element={<FollowFeedPage currentUserId={currentUserId} />} />
          <Route path="/chat" element={<Chat currentUserId={currentUserId} />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
