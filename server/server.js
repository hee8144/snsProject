const express = require("express");
const cors = require("cors");
const path = require("path");

// const stuRouter = require("./routes/student");
const feedRouter = require("./routes/feed");
const userRouter = require("./routes/user");
const commentRouter = require("./routes/comment");
const favRouter = require("./routes/fav");
const followRouter = require("./routes/follow");

const app = express();
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/userImg", express.static(path.join(__dirname, "userImg")));
// router 영역
app.use("/feed", feedRouter);
app.use("/comment", commentRouter);
app.use("/fav", favRouter);
app.use("/user", userRouter);
app.use("/follow", followRouter);

app.listen(3010, () => {
  console.log("server start!");
});
