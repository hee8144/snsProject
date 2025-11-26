import React, { useCallback, useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Card,
  CardContent,
  IconButton,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  CardActions,
  Menu,
  MenuItem,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { jwtDecode } from "jwt-decode";

function Feed() {
  // 피드 & 사용자
  const [feed, setFeed] = useState([]);
  const [userid, setUserId] = useState("");
  const [nickname, setNickname] = useState("");
  const [favList, setFavList] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFeedNo, setSelectedFeedNo] = useState(null);

  // 댓글
  const [commentsVisible, setCommentsVisible] = useState({});
  const [comments, setComments] = useState({}); // feedNo별
  const [newComments, setNewComments] = useState({});
  const [editMode, setEditMode] = useState(null);
  const [editValue, setEditValue] = useState({});
  const [commentCount, setCommentCount] = useState({}); // feedNo별

  // --- 초기 데이터 로드 ---
  const fnFavList = useCallback(() => {
    if (!userid) return;
    fetch("http://localhost:3010/feed/fav/" + userid, {
      method: "GET",
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
      .then((res) => res.json())
      .then((data) => setFavList(data.fav));
  }, [userid]);

  const getFeedList = useCallback(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("로그인하세요");
      window.location.href = "/";
      return;
    }
    const decoded = jwtDecode(token);
    setUserId(decoded.userId);
    setNickname(decoded.NICKNAME);

    fetch("http://localhost:3010/feed/" + decoded.userId)
      .then((res) => res.json())
      .then((data) => {
        setFeed(data.list);
        // 초기 댓글 개수
        const counts = {};
        data.cnt.forEach((c) => {
          counts[c.feed_no] = c.cnt;
        });
        setCommentCount(counts);
        fnFavList();
      });
  }, [fnFavList]);

  useEffect(() => {
    getFeedList();
  }, [getFeedList]);

  // --- 댓글 관련 ---
  const fnCommentList = useCallback((feedNo) => {
    fetch("http://localhost:3010/feed/comment/" + feedNo)
      .then((res) => res.json())
      .then((data) => setComments((prev) => ({ ...prev, [feedNo]: data.comment })));
  }, []);

  const handleToggleComments = (feedNo) => {
    setCommentsVisible((prev) => ({ ...prev, [feedNo]: !prev[feedNo] }));
    if (!comments[feedNo]) fnCommentList(feedNo);
  };

  const fnadd = (feedNo) => {
    const content = newComments[feedNo]?.trim();
    if (!content) return;

    fetch("http://localhost:3010/feed/comment/", {
      method: "POST",
      headers: { "Content-type": "application/json", Authorization: "Bearer " + localStorage.getItem("token") },
      body: JSON.stringify({ feedNo, userid, contents: content, nickname }),
    })
      .then((res) => res.json())
      .then((data) => {
        const newCmt = {
          sns_commentNo: data.result?.insertId || Date.now(),
          FEEDNO: feedNo,
          userId: userid,
          NICKNAME: nickname,
          CONTENTS: content,
          CDATETIME: new Date().toLocaleString(),
        };
        setComments((prev) => ({
          ...prev,
          [feedNo]: [...(prev[feedNo] || []), newCmt],
        }));
        setNewComments((prev) => ({ ...prev, [feedNo]: "" }));
        setCommentCount((prev) => ({ ...prev, [feedNo]: (prev[feedNo] || 0) + 1 }));
        alert(data.msg);
      });
  };

  const fndelete = (feedNo, cmtNo) => {
    if (!window.confirm("댓글을 삭제하시겠습니까?")) return;

    fetch("http://localhost:3010/feed/comment/" + cmtNo, {
      method: "DELETE",
      headers: { "Content-type": "application/json", Authorization: "Bearer " + localStorage.getItem("token") },
    })
      .then((res) => res.json())
      .then((data) => {
        setComments((prev) => ({
          ...prev,
          [feedNo]: prev[feedNo].filter((c) => c.sns_commentNo !== cmtNo),
        }));
        setCommentCount((prev) => ({ ...prev, [feedNo]: (prev[feedNo] || 1) - 1 }));
        alert(data.msg);
      });
  };

  const fnSave = (feedNo, cmt) => {
    fetch("http://localhost:3010/feed/comment/" + cmt.sns_commentNo, {
      method: "PUT",
      headers: { "Content-type": "application/json", Authorization: "Bearer " + localStorage.getItem("token") },
      body: JSON.stringify({ contents: editValue[cmt.sns_commentNo] }),
    })
      .then((res) => res.json())
      .then((data) => {
        setComments((prev) => ({
          ...prev,
          [feedNo]: prev[feedNo].map((c) =>
            c.sns_commentNo === cmt.sns_commentNo ? { ...c, CONTENTS: editValue[cmt.sns_commentNo] } : c
          ),
        }));
        setEditMode(null);
        alert(data.msg);
      });
  };

  const handleEditComment = (cmt) => {
    setEditMode(cmt.sns_commentNo);
    setEditValue((prev) => ({ ...prev, [cmt.sns_commentNo]: cmt.CONTENTS }));
  };

  // --- 좋아요 ---
  const fnAddFav = (feedNo) =>
    fetch("http://localhost:3010/feed/fav/", {
      method: "POST",
      headers: { "Content-type": "application/json", Authorization: "Bearer " + localStorage.getItem("token") },
      body: JSON.stringify({ feedNo, userid }),
    }).then((res) => res.json());

  const fnDeleteFav = (feedNo) =>
    fetch("http://localhost:3010/feed/fav/", {
      method: "DELETE",
      headers: { "Content-type": "application/json", Authorization: "Bearer " + localStorage.getItem("token") },
      body: JSON.stringify({ feedNo, userid }),
    }).then((res) => res.json());

  const fnFav = (feedNo) => {
    const isFav = favList.map((f) => f.FEED_NO).includes(feedNo);
    if (isFav) fnDeleteFav(feedNo).then(() => fnFavList());
    else fnAddFav(feedNo).then(() => fnFavList());
  };

  const handleMenuOpen = (event, feedNo) => {
    setAnchorEl(event.currentTarget);
    setSelectedFeedNo(feedNo);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedFeedNo(null);
  };

  const favSet = new Set(favList.map((f) => f.FEED_NO));

  const getEmbedUrl = (url) => {
    if (!url) return null;
    const regex = /https:\/\/codepen\.io\/([^/]+)\/pen\/([^/]+)/;
    const match = url?.match(regex);
    if (match) return `https://codepen.io/${match[1]}/embed/${match[2]}?height=400&theme-id=dark&default-tab=result`;
    return null;
  };
  //feed

  const fnDeleteFeed = (feedNo) =>
    fetch("http://localhost:3010/feed" + feedNo, {
      method: "DELETE",
      headers: { "Content-type": "application/json", Authorization: "Bearer " + localStorage.getItem("token") },
      body: JSON.stringify({ feedNo }),
    }).then((res) => res.json());

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
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="subtitle1" color="textSecondary">
                    {item.nickname || item.userId}
                  </Typography>
                  {item.userId === userid && (
                    <>
                      <IconButton onClick={(e) => handleMenuOpen(e, item.feed_no)}>
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={selectedFeedNo === item.feed_no}
                        onClose={handleMenuClose}
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                        transformOrigin={{ vertical: "top", horizontal: "right" }}
                      >
                        <MenuItem onClick={() => handleMenuClose()}>수정</MenuItem>
                        <MenuItem
                          onClick={() => {
                            fnDeleteFeed(item.feed_no);
                          }}
                        >
                          삭제
                        </MenuItem>
                      </Menu>
                    </>
                  )}
                </Box>
                <Typography variant="body1">{item.CONTENTS}</Typography>
                {embedUrl && <iframe src={embedUrl} style={{ width: "100%", height: 400 }} frameBorder="0" />}
              </CardContent>

              <CardActions>
                <IconButton onClick={() => fnFav(item.feed_no)}>
                  <FavoriteIcon color={favSet.has(item.feed_no) ? "error" : "inherit"} />
                </IconButton>
                <IconButton onClick={() => handleToggleComments(item.feed_no)}>
                  <ChatBubbleOutlineIcon />
                  <Typography sx={{ ml: 0.5, fontSize: "14px" }}>{commentCount[item.feed_no] || 0}</Typography>
                </IconButton>
              </CardActions>

              {/* 댓글 리스트 */}
              {commentsVisible[item.feed_no] && (
                <>
                  <List sx={{ width: "100%", paddingX: 2 }}>
                    {comments[item.feed_no]?.length > 0 ? (
                      comments[item.feed_no].map((cmt) => (
                        <ListItem
                          key={cmt.sns_commentNo}
                          alignItems="flex-start"
                          style={{ borderTop: "1px solid #ccc" }}
                          secondaryAction={
                            editMode !== cmt.sns_commentNo &&
                            cmt.userId === userid && (
                              <Box>
                                <Button size="small" onClick={() => handleEditComment(cmt)}>
                                  수정
                                </Button>
                                <Button
                                  size="small"
                                  color="error"
                                  onClick={() => fndelete(item.feed_no, cmt.sns_commentNo)}
                                >
                                  삭제
                                </Button>
                              </Box>
                            )
                          }
                        >
                          <ListItemAvatar>
                            <Avatar>{cmt.NICKNAME.charAt(0).toUpperCase()}</Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={cmt.NICKNAME}
                            secondary={
                              editMode === cmt.sns_commentNo ? (
                                <Box display="flex" gap={1} alignItems="center">
                                  <TextField
                                    size="small"
                                    sx={{ flex: 1 }}
                                    value={editValue[cmt.sns_commentNo]}
                                    onChange={(e) =>
                                      setEditValue((prev) => ({ ...prev, [cmt.sns_commentNo]: e.target.value }))
                                    }
                                  />
                                  <Button size="small" variant="contained" onClick={() => fnSave(item.feed_no, cmt)}>
                                    저장
                                  </Button>
                                  <Button size="small" onClick={() => setEditMode(null)}>
                                    취소
                                  </Button>
                                </Box>
                              ) : (
                                <>
                                  {cmt.CONTENTS}
                                  <Typography sx={{ fontSize: 12, mt: 0.5 }} color="text.secondary">
                                    {cmt.CDATETIME}
                                  </Typography>
                                </>
                              )
                            }
                          />
                        </ListItem>
                      ))
                    ) : (
                      <Typography sx={{ px: 2, py: 1 }}>댓글이 없습니다.</Typography>
                    )}
                  </List>

                  {/* 댓글 입력 */}
                  <Box display="flex" alignItems="center" gap={1} padding={2}>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="댓글을 입력하세요"
                      value={newComments[item.feed_no] || ""}
                      onChange={(e) => setNewComments((prev) => ({ ...prev, [item.feed_no]: e.target.value }))}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          fnadd(item.feed_no);
                        }
                      }}
                    />
                    <Button variant="contained" onClick={() => fnadd(item.feed_no)}>
                      추가
                    </Button>
                  </Box>
                </>
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
