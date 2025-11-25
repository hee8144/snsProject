import React, { useState } from "react";
import {
  Grid,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Card,
  CardMedia,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  DialogActions,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  CardActions,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

function Feed() {
  const [commentsVisible, setCommentsVisible] = useState({});
  const [open, setOpen] = useState(false);
  const [selectedFeed, setSelectedFeed] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  let [feed, setFeed] = useState([]);
  let [userid, setUserId] = useState("");
  function getFeedList() {
    let token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUserId(decoded.userId);
      fetch("http://localhost:3010/feed/" + decoded.userId)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          setFeed(data.list);
        });
    } else {
      alert("로그인하세요");
      window.location.href = "/";
    }
  }

  useEffect(() => {
    getFeedList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function fnRemove(feedNo) {
    fetch("http://localhost:3010/feed/" + feedNo, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.msg);
        handleClose();
        getFeedList();
      });
  }
  const handleClickOpen = (feed) => {
    console.log(feed);

    setSelectedFeed(feed);
    setOpen(true);
    setComments([
      { id: "user1", text: "멋진 사진이에요!" },
      { id: "user2", text: "이 장소에 가보고 싶네요!" },
      { id: "user3", text: "아름다운 풍경이네요!" },
    ]); // 샘플 댓글 추가
    setNewComment(""); // 댓글 입력 초기화
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFeed(null);
    setComments([]); // 모달 닫을 때 댓글 초기화
  };

  const getEmbedUrl = (url) => {
    if (!url) return null;
    try {
      const regex = /https:\/\/codepen\.io\/([^/]+)\/pen\/([^/]+)/;
      const match = url.match(regex);
      if (match) {
        const username = match[1];
        const penId = match[2];
        return `https://codepen.io/${username}/embed/${penId}?height=400&theme-id=dark&default-tab=result`;
      }
    } catch (err) {
      console.error("CodePen URL 변환 실패", err);
    }
    return null;
  };

  const handleToggleComments = (id) => {
    setCommentsVisible((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddComment = (id) => {
    if (newComment[id]?.trim()) {
      const commentText = newComment[id];

      setNewComment((prev) => ({ ...prev, [id]: "" }));
    }
  };

  return (
    <Container maxWidth="md">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">SNS</Typography>
        </Toolbar>
      </AppBar>

      {feed.length > 0 ? (
        feed.map((item) => {
          const embedUrl = getEmbedUrl(item.codepenUrl);
          return (
            <Card key={item.feed_no} sx={{ width: "70%", margin: "16px auto 0px" }}>
              {item.imgPath && <CardMedia component="img" height="300" image={item.imgPath} alt={item.imgName} />}
              <CardContent>
                <Typography variant="subtitle2" color="textSecondary">
                  {item.nickname || item.userId}
                </Typography>
                <Typography variant="body1">{item.CONTENTS}</Typography>
                {embedUrl && (
                  <Box sx={{ mt: 1 }}>
                    <iframe
                      src={embedUrl}
                      height="400"
                      style={{ width: "100%" }}
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  </Box>
                )}
              </CardContent>
              <CardActions>
                <IconButton>
                  <FavoriteIcon></FavoriteIcon>
                </IconButton>
                <IconButton
                  aria-label="add to favorites"
                  onClick={() => {
                    handleToggleComments(item.feed_no);
                  }}
                >
                  <ChatBubbleOutlineIcon />
                </IconButton>
              </CardActions>
              {/*  */}
              {/* 댓글 영역 */}

              {commentsVisible[item.feed_no] && (
                <Box display="flex" alignItems={"center"} gap={"12px"} padding={"16px"}>
                  {userid}
                  <TextField
                    variant="outlined"
                    size="small"
                    style={{ width: "80%" }}
                    placeholder="댓글을 입력하세요"
                    value={newComment[item.id] || ""}
                    onChange={(e) => setNewComment((prev) => ({ ...prev, [item.id]: e.target.value }))}
                  />
                  <Button variant="contained" onClick={() => handleAddComment(item.id)}>
                    추가
                  </Button>
                </Box>
              )}
            </Card>
          );
        })
      ) : (
        <Typography sx={{ mt: 4 }}>등록된 피드가 없습니다.</Typography>
      )}
    </Container>
  );
}

export default Feed;
