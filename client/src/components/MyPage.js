import React, { useEffect, useState, useRef } from "react";
import {
  Container,
  TextField,
  Menu,
  MenuItem,
  IconButton,
  Typography,
  Box,
  Avatar,
  Grid,
  Paper,
  Button,
  Modal,
  Tabs,
  Tab,
  Card,
  CardContent,
} from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function MyPage() {
  let [user, setUser] = useState({});
  let [follow, setFollow] = useState([]);
  let [feed, setFeed] = useState("");
  const [myFeedList, setMyFeedList] = useState([]);
  const [favFeedList, setFavFeedList] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  let content = useRef();
  let navigate = useNavigate();

  function fnGetUser() {
    // 원래 아이디를 jwt 토큰에서 꺼내야 함
    const token = localStorage.getItem("token");
    // console.log("token ==> ", token);
    if (token) {
      const decoded = jwtDecode(token);
      console.log("decoded ==> ", decoded);

      fetch("http://localhost:3010/user/" + decoded.userId)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setUser(data.info);
          setFollow(data.follow);
          setFeed(data.cnt);
          setFavFeedList(data.favfeed);
          setMyFeedList(data.myfeed);
        });
    } else {
      // 로그인페이지로 이동
      alert("로그인 후 이용해주세요.");
      navigate("/");
    }
  }

  useEffect(() => {
    fnGetUser();
  }, []);

  //모달

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleMenuClose = () => setAnchorEl(null);
  function fnSave() {
    fetch("http://localhost:3010/user/" + user.userId, {
      method: "PUT",
      headers: { "Content-type": "application/json", Authorization: "Bearer " + localStorage.getItem("token") },
      body: JSON.stringify({ content: content.current.value }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.msg);
        fnGetUser();
        handleClose();
        handleMenuClose();
      });
  }
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
            <Avatar alt="프로필 이미지" src={user.profile_PATH} sx={{ width: 100, height: 100, marginBottom: 2 }} />
            <Typography variant="h5">{user?.NICKNAME}</Typography>
            <Typography variant="body2" color="text.secondary">
              @{user?.userId}
            </Typography>
          </Box>
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            <Grid item xs={4} textAlign="center">
              <Typography variant="h6">팔로워</Typography>
              <Typography variant="body1">{follow?.followerCnt}</Typography>
            </Grid>
            <Grid item xs={4} textAlign="center">
              <Typography variant="h6">팔로잉</Typography>
              <Typography variant="body1">{follow?.followingCnt}</Typography>
            </Grid>
            <Grid item xs={4} textAlign="center">
              <Typography variant="h6">게시물</Typography>
              <Typography variant="body1">{feed?.CNT}</Typography>
            </Grid>
          </Grid>
          <Box sx={{ marginTop: 3 }}>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography variant="h6">내 소개</Typography>
              <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                <MoreVertIcon />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <MenuItem onClick={handleOpen}>수정</MenuItem>
              </Menu>
            </Box>
            {user.INTRO ? (
              <>
                <Typography variant="body1">{user?.INTRO}</Typography>
              </>
            ) : (
              <>
                <Button onClick={handleOpen} variant="contained">
                  소개 작성하러가기
                </Button>
              </>
            )}
          </Box>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
              }}
            >
              <Typography id="modal-modal-title" variant="h6" component="h2" textAlign={"center"}>
                소개작성하기
              </Typography>
              <TextField
                inputRef={content}
                label="내용"
                variant="outlined"
                margin="normal"
                fullWidth
                multiline
                rows={4}
              />
              <Button
                onClick={() => {
                  fnSave();
                }}
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: "20px" }}
              >
                수정하기
              </Button>
            </Box>
          </Modal>
          <Box mt={3}>
            <Tabs value={tabValue} onChange={(e, newVal) => setTabValue(newVal)} centered>
              <Tab label="나의 글" />
              <Tab label="좋아요한 글" />
            </Tabs>

            {/* 탭 콘텐츠 */}
            <Box mt={2}>
              {tabValue === 0 &&
                (myFeedList.length > 0 ? (
                  myFeedList.map((item) => (
                    <Card key={item.feed_no} sx={{ mb: 2 }}>
                      <CardContent>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {item.NICKNAME}
                        </Typography>
                        <Typography>{item.CONTENTS}</Typography>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Typography>등록된 글이 없습니다.</Typography>
                ))}

              {tabValue === 1 &&
                (favFeedList.length > 0 ? (
                  favFeedList.map((item) => (
                    <Card key={item.FAVNO} sx={{ mb: 2 }}>
                      <CardContent>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {item.NICKNAME}
                        </Typography>
                        <Typography>{item.CONTENTS}</Typography>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Typography>좋아요한 글이 없습니다.</Typography>
                ))}
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default MyPage;
