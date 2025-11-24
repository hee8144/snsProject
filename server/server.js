const express = require("express");
const cors = require("cors");
const path = require("path");

// const stuRouter = require("./routes/student");
const feedRouter = require("./routes/feed");
const userRouter = require("./routes/user");

const app = express();
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// router 영역
app.use("/feed", feedRouter);
// app.use("/product", productRouter);
app.use("/user", userRouter);

app.listen(3010, () => {
  console.log("server start!");
});
