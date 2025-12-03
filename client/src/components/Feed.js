import React, { useCallback, useRef, useState, useEffect } from "react";
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
  CardMedia,
  Modal,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function Feed() {
  let navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  // 피드 & 사용자
  const [feed, setFeed] = useState([]);
  const [userid, setUserId] = useState("");
  const [nickname, setNickname] = useState("");
  const [favList, setFavList] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFeedNo, setSelectedFeedNo] = useState(null);
  const [images, setImages] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [followList, setFollowList] = useState([]);
  let content = useRef();
  let codepen = useRef();

  // 댓글
  const [commentsVisible, setCommentsVisible] = useState({});
  const [comments, setComments] = useState({}); // feedNo별
  const [newComments, setNewComments] = useState({});
  const [editMode, setEditMode] = useState(null);
  const [editValue, setEditValue] = useState({});
  const [commentCount, setCommentCount] = useState({}); // feedNo별
  const token = localStorage.getItem("token");

  // --- 초기 데이터 로드 ---
  const fnFavList = useCallback(() => {
    if (!userid) return;
    fetch("http://localhost:3010/fav/" + userid, {
      method: "GET",
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
      .then((res) => res.json())
      .then((data) => setFavList(data.fav));
  }, [userid]);

  const getFeedList = useCallback(() => {
    if (!token) {
      alert("로그인하세요");
      window.location.href = "/";
      return;
    }
    const decoded = jwtDecode(token);
    setUserId(decoded.userId);
    setNickname(decoded.NICKNAME);

    fetch(`http://localhost:3010/feed/${decoded.userId}?page=${page}&limit=5`)
      .then((res) => res.json())
      .then((data) => {
        if (data.list.length === 0) {
          setHasMore(false); // 더 이상 불러올 데이터 없음
          return;
        }

        setFeed((prev) => [...prev, ...data.list]); // 기존 데이터에 추가
        const counts = {};
        data.cnt.forEach((c) => {
          counts[c.feed_no] = c.cnt;
        });
        setCommentCount((prev) => ({ ...prev, ...counts }));
        setImages((prev) => [...prev, ...data.img]);
        setFollowList(data.follow); // 팔로우는 마지막 한 번만 업데이트
        fnFavList();
      });
  }, [page, fnFavList, token]);
  useEffect(() => {
    const handleScroll = () => {
      if (!hasMore) return;
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        setPage((prev) => prev + 1); // 페이지 증가
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore]);
  useEffect(() => {
    getFeedList();
  }, [getFeedList, page]);

  // --- 댓글 관련 ---
  const fnCommentList = useCallback((feedNo) => {
    fetch("http://localhost:3010/comment/list/" + feedNo)
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

    fetch("http://localhost:3010/comment/", {
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

    fetch("http://localhost:3010/comment/" + cmtNo, {
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
    fetch("http://localhost:3010/comment/" + cmt.sns_commentNo, {
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
    fetch("http://localhost:3010/fav/", {
      method: "POST",
      headers: { "Content-type": "application/json", Authorization: "Bearer " + localStorage.getItem("token") },
      body: JSON.stringify({ feedNo, userid }),
    }).then((res) => res.json());

  const fnDeleteFav = (feedNo) =>
    fetch("http://localhost:3010/fav/", {
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

  const fnDeleteFeed = (feedNo) => {
    if (!window.confirm("게시글을 삭제하시겠습니까?")) return;

    fetch("http://localhost:3010/feed/" + feedNo, {
      method: "DELETE",
      headers: { "Content-type": "application/json", Authorization: "Bearer " + localStorage.getItem("token") },
      body: JSON.stringify({ feedNo }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.msg);
        getFeedList();
      });
  };
  const fnEditFeed = (feedNo) => {
    fetch("http://localhost:3010/feed/" + feedNo, {
      method: "PUT",
      headers: { "Content-type": "application/json", Authorization: "Bearer " + localStorage.getItem("token") },
      body: JSON.stringify({ feedNo, content: content.current.value, codepen: codepen.current.value }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.msg);
        handleClose();
        getFeedList();
      });
  };
  const FeedImages = ({ imgs }) => {
    if (!imgs || !Array.isArray(imgs) || imgs.length === 0) return null; // 이미지 없으면 아무것도 안 보여줌

    if (imgs.length === 1) {
      return <CardMedia component="img" height="200" image={imgs[0].IMG_PATH} alt={imgs[0].IMG_NAME} />;
    }

    const PrevArrow = ({ onClick }) => (
      <IconButton
        onClick={onClick}
        sx={{
          position: "absolute",
          top: "50%",
          left: 0,
          transform: "translate(0, -50%)",
          zIndex: 1,
          color: "white",
        }}
      >
        <ArrowBackIosIcon />
      </IconButton>
    );

    const NextArrow = ({ onClick }) => (
      <IconButton
        onClick={onClick}
        sx={{
          position: "absolute",
          top: "50%",
          right: 0,
          transform: "translate(0, -50%)",
          zIndex: 1,
          color: "white",
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    );

    const settings = {
      accessibility: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      prevArrow: <PrevArrow />,
      nextArrow: <NextArrow />,
    };

    return (
      <Slider {...settings}>
        {imgs.map((img, i) => (
          <Box key={i}>
            <CardMedia component="img" height="200" image={img.IMG_PATH} alt={img.IMG_NAME} />
          </Box>
        ))}
      </Slider>
    );
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //팔로우
  const fnFollow = (targetUserId) => {
    const currentlyFollowing = followList.some((f) => f.followedId === targetUserId);

    fetch("http://localhost:3010/follow/", {
      method: currentlyFollowing ? "DELETE" : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({ follower: userid, following: targetUserId }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.msg);

        if (currentlyFollowing) {
          setFollowList((prev) => prev.filter((f) => f.followedId !== targetUserId));
        } else {
          setFollowList((prev) => [...prev, { userId: userid, followedId: targetUserId, follow_date: new Date() }]);
        }
      });
  };
  return (
    <Container maxWidth="md">
      {feed.length > 0 ? (
        feed.map((item) => {
          const embedUrl = getEmbedUrl(item.CODEPENURL);

          return (
            <Card key={item.feed_no} sx={{ width: "70%", margin: "16px auto 0px" }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start" width={"100%"}>
                    <Box display="flex" alignItems="flex-start" gap={0.5}>
                      <Avatar
                        alt="프로필 이미지"
                        src={item.NICKNAME === "익명의사용자" ? "" : item.profile_Path}
                        onClick={(e) => {
                          if (item.NICKNAME === "익명의사용자") {
                            e.preventDefault();
                            return;
                          }
                          navigate("/user/" + item.userId);
                        }}
                        sx={{
                          width: 50,
                          height: 50,
                          border: "2px solid #1976d2",
                          borderRadius: "50%",
                          objectFit: "cover",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                          mr: 1,
                        }}
                      />

                      <Box>
                        <Typography variant="subtitle1" color="textPrimary" fontWeight="bold">
                          {item.NICKNAME}
                        </Typography>
                        {item.NICKNAME == "익명의사용자" ? (
                          <Typography variant="caption" color="textSecondary" display="block"></Typography>
                        ) : (
                          <Typography variant="caption" color="textSecondary" display="block">
                            @{item.userId}
                          </Typography>
                        )}
                      </Box>

                      {item.userId !== userid && item.NICKNAME != "익명의사용자" && (
                        <Button
                          size="small"
                          variant={followList.some((f) => f.followedId === item.userId) ? "outlined" : "contained"}
                          color="primary"
                          sx={{
                            ml: 0.5,
                            height: 24,
                            minWidth: 60,
                            fontSize: 10,
                            textTransform: "none",
                            borderRadius: 1,
                          }}
                          onClick={() => fnFollow(item.userId)}
                        >
                          {followList.some((f) => f.followedId === item.userId) ? "언팔 " : "팔로우"}
                        </Button>
                      )}
                    </Box>
                    <Typography variant="caption" color="textSecondary">
                      {item.CDATE}
                    </Typography>
                  </Box>
                  <Box>
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
                          <MenuItem onClick={() => handleOpen()}>수정</MenuItem>
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
                              <Typography textAlign={"center"} variant="h4" gutterBottom>
                                수정
                              </Typography>
                              <TextField
                                inputRef={content}
                                defaultValue={item.CONTENTS}
                                label="내용"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                multiline
                                rows={4}
                              />
                              <TextField
                                label="CodePen Embed URL (선택사항)"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                defaultValue={item.codepenUrl}
                                placeholder="https://codepen.io/username/pen/abcd1234"
                                inputRef={codepen} // useRef로 선언
                                helperText="💡 CodePen에서 Embed URL을 복사하세요 (Share → Embed → Copy Embed URL)"
                              />
                              <Button
                                onClick={() => {
                                  fnEditFeed(item.feed_no);
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
                </Box>

                <Typography variant="body1">{item.CONTENTS}</Typography>
                <FeedImages imgs={images.filter((f) => f.FEED_NO == item.feed_no)} />
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
                            <Avatar src={cmt.profile_PATH || ""}>{cmt.NICKNAME.charAt(0).toUpperCase()}</Avatar>
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
                                  <Typography component="span">{cmt.CONTENTS}</Typography>
                                  <br />
                                  <Typography component="span" sx={{ fontSize: 12, mt: 0.5 }} color="text.secondary">
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
      {!hasMore && feed.length > 0 && (
        <Typography sx={{ textAlign: "center", my: 4, color: "text.secondary" }}>더 이상 글은 없습니다.</Typography>
      )}
    </Container>
  );
}
export default Feed;
