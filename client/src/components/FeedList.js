import React, { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Modal,
  TextField,
  Button,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

export default function FeedList({ feedList, currentUserId, refresh }) {
  const [comments, setComments] = useState({});
  const [commentsVisible, setCommentsVisible] = useState({});
  const [commentCount, setCommentCount] = useState({});
  const [newComment, setNewComment] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFeedNo, setSelectedFeedNo] = useState(null);
  const [openEditFeedNo, setOpenEditFeedNo] = useState(null);
  const contentRef = useRef();
  const codepenRef = useRef();

  // 메뉴
  const handleMenuOpen = (e, feedNo) => {
    setAnchorEl(e.currentTarget);
    setSelectedFeedNo(feedNo);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedFeedNo(null);
    setOpenEditFeedNo(null);
  };
  const handleEditOpen = (feedNo) => {
    setOpenEditFeedNo(feedNo);
    handleMenuClose();
  };

  // 글 수정
  const fnEditFeed = (feedNo) => {
    fetch(`http://localhost:3010/feed/${feedNo}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        feedNo,
        content: contentRef.current.value,
        codepen: codepenRef.current.value,
      }),
    }).then(() => {
      alert("수정 완료");
      setOpenEditFeedNo(null);
      refresh();
    });
  };

  // 글 삭제
  const fnDeleteFeed = (feedNo) => {
    if (!window.confirm("삭제하시겠습니까?")) return;
    fetch(`http://localhost:3010/feed/${feedNo}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then(() => {
      alert("삭제 완료");
      refresh();
    });
  };

  // 댓글 토글
  const toggleComments = (feedNo) => {
    setCommentsVisible((prev) => ({ ...prev, [feedNo]: !prev[feedNo] }));
    if (!comments[feedNo]) {
      fetch(`http://localhost:3010/comment/${feedNo}`)
        .then((res) => res.json())
        .then((data) => {
          setComments((prev) => ({ ...prev, [feedNo]: data.comment }));
          setCommentCount((prev) => ({ ...prev, [feedNo]: data.comment.length }));
        });
    }
  };

  // 댓글 입력 핸들러
  const handleCommentChange = (feedNo, value) => {
    setNewComment((prev) => ({ ...prev, [feedNo]: value }));
  };

  // 댓글 제출
  const submitComment = (feedNo) => {
    if (!newComment[feedNo] || newComment[feedNo].trim() === "") return;

    const token = localStorage.getItem("token");

    fetch(`http://localhost:3010/comment/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        feedNo,
        fromUser: currentUserId,
        contents: newComment[feedNo],
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setNewComment((prev) => ({ ...prev, [feedNo]: "" }));
        // 댓글 새로 불러오기
        fetch(`http://localhost:3010/comment/${feedNo}`)
          .then((res) => res.json())
          .then((data) => {
            setComments((prev) => ({ ...prev, [feedNo]: data.comment }));
            setCommentCount((prev) => ({ ...prev, [feedNo]: data.comment.length }));
            setCommentsVisible((prev) => ({ ...prev, [feedNo]: true }));
          });
      });
  };

  // 초기 댓글 개수 세팅
  useEffect(() => {
    feedList.forEach((item) => {
      fetch(`http://localhost:3010/comment/cnt/${item.feed_no}`)
        .then((res) => res.json())
        .then((data) => {
          setCommentCount((prev) => ({ ...prev, [item.feed_no]: data.cnt }));
        });
    });
  }, [feedList]);

  return (
    <>
      {feedList.map((item) => (
        <Card key={item.feed_no} sx={{ mb: 2 }}>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="subtitle1" fontWeight="bold">
                {item.NICKNAME}
              </Typography>

              {item.userId === currentUserId && (
                <>
                  <IconButton onClick={(e) => handleMenuOpen(e, item.feed_no)}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu anchorEl={anchorEl} open={selectedFeedNo === item.feed_no} onClose={handleMenuClose}>
                    <MenuItem onClick={() => handleEditOpen(item.feed_no)}>수정</MenuItem>
                    <MenuItem onClick={() => fnDeleteFeed(item.feed_no)}>삭제</MenuItem>
                  </Menu>
                </>
              )}
            </Box>

            <Typography>{item.CONTENTS}</Typography>
          </CardContent>

          <CardActions>
            <IconButton onClick={() => toggleComments(item.feed_no)}>
              <ChatBubbleOutlineIcon />
              <Typography sx={{ ml: 0.5 }}>{commentCount[item.feed_no] || 0}</Typography>
            </IconButton>
          </CardActions>

          {commentsVisible[item.feed_no] && (
            <List sx={{ width: "100%", px: 2 }}>
              {comments[item.feed_no]?.length > 0 ? (
                comments[item.feed_no].map((cmt) => (
                  <ListItem key={cmt.sns_commentNo} alignItems="flex-start" sx={{ borderTop: "1px solid #ccc" }}>
                    <ListItemAvatar>
                      <Avatar>{cmt.NICKNAME.charAt(0).toUpperCase()}</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={cmt.NICKNAME} secondary={cmt.CONTENTS} />
                  </ListItem>
                ))
              ) : (
                <Typography sx={{ px: 2, py: 1 }}>댓글이 없습니다.</Typography>
              )}

              {/* 댓글 입력 */}
              <Box sx={{ display: "flex", px: 2, py: 1, gap: 1 }}>
                <TextField
                  value={newComment[item.feed_no] || ""}
                  onChange={(e) => handleCommentChange(item.feed_no, e.target.value)}
                  placeholder="댓글을 입력하세요"
                  size="small"
                  fullWidth
                />
                <Button variant="contained" onClick={() => submitComment(item.feed_no)}>
                  등록
                </Button>
              </Box>
            </List>
          )}

          <Modal open={openEditFeedNo === item.feed_no} onClose={() => setOpenEditFeedNo(null)}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
              }}
            >
              <Typography textAlign="center" variant="h6" gutterBottom>
                글 수정
              </Typography>
              <TextField
                inputRef={contentRef}
                defaultValue={item.CONTENTS}
                fullWidth
                multiline
                rows={4}
                margin="normal"
              />
              <TextField
                inputRef={codepenRef}
                defaultValue={item.codepenUrl}
                fullWidth
                margin="normal"
                placeholder="CodePen URL"
              />
              <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={() => fnEditFeed(item.feed_no)}>
                수정
              </Button>
            </Box>
          </Modal>
        </Card>
      ))}
    </>
  );
}
