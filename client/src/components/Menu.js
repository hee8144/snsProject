import { AppBar, Toolbar, Typography, Button, Box, IconButton } from "@mui/material";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import PeopleIcon from "@mui/icons-material/People";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ChatIcon from "@mui/icons-material/Chat";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import NotificationList from "./NotificationList";

export default function Menu({ currentUserId }) {
  const token = localStorage.getItem("token");

  return (
    <AppBar position="fixed" color="primary" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, boxShadow: 3 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* 로고 */}
        <Typography
          variant="h6"
          component={Link}
          to="/feed"
          sx={{ textDecoration: "none", color: "inherit", fontWeight: "bold", mr: 2 }}
        >
          SNS
        </Typography>

        {/* 버튼 그룹 */}
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Button
            component={Link}
            to="/feed"
            startIcon={<DynamicFeedIcon />}
            color="inherit"
            sx={{ textTransform: "none", fontWeight: 500 }}
          >
            전체피드
          </Button>

          <Button
            component={Link}
            to="/followfeed"
            startIcon={<PeopleIcon />}
            color="inherit"
            sx={{ textTransform: "none", fontWeight: 500 }}
          >
            팔로워/팔로잉
          </Button>

          <Button
            component={Link}
            to="/register"
            startIcon={<AddCircleOutlineIcon />}
            color="inherit"
            sx={{ textTransform: "none", fontWeight: 500 }}
          >
            등록
          </Button>

          <Button
            component={Link}
            to="/ChatRoomList"
            startIcon={<ChatIcon />}
            color="inherit"
            sx={{ textTransform: "none", fontWeight: 500 }}
          >
            채팅방
          </Button>

          <Button
            component={Link}
            to="/mypage"
            startIcon={<AccountCircleIcon />}
            color="inherit"
            sx={{ textTransform: "none", fontWeight: 500 }}
          >
            마이페이지
          </Button>

          {token ? (
            <Button
              component={Link}
              startIcon={<LogoutIcon />}
              color="inherit"
              sx={{ textTransform: "none", fontWeight: 500 }}
              onClick={() => {
                alert("로그아웃되었습니다.");
                localStorage.removeItem("token");
              }}
              to="/"
            >
              로그아웃
            </Button>
          ) : (
            <Button
              component={Link}
              to="/"
              startIcon={<LoginIcon />}
              color="inherit"
              sx={{ textTransform: "none", fontWeight: 500 }}
            >
              로그인
            </Button>
          )}

          {/* 알림 아이콘 */}
          <IconButton sx={{ ml: 2, color: "inherit", position: "relative" }}>
            <Box sx={{ position: "absolute", right: 0 }}>
              <NotificationList currentUserId={currentUserId} />
            </Box>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
