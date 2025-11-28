import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import NotificationList from "./NotificationList";
export default function Menu({ currentUserId }) {
  return (
    <AppBar position="absolute" color="default" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          SNS
        </Typography>

        <Button component={Link} to="/feed" startIcon={<HomeIcon />}>
          전체피드
        </Button>
        <Button component={Link} to="/followfeed" startIcon={<HomeIcon />}>
          팔로워/팔로잉
        </Button>
        <Button component={Link} to="/register" startIcon={<HomeIcon />}>
          등록
        </Button>
        <Button component={Link} to="/chat" startIcon={<HomeIcon />}>
          채팅방
        </Button>
        <Button component={Link} to="/mypage" startIcon={<HomeIcon />}>
          마이페이지
        </Button>
        <Button>
          <NotificationList currentUserId={currentUserId} />
        </Button>
      </Toolbar>
    </AppBar>
  );
}
