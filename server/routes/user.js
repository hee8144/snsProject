const express = require("express");
const bcrypt = require("bcrypt");
const multer = require("multer");
const authMiddleware = require("../auth");

const router = express.Router();
const db = require("../db");

const jwt = require("jsonwebtoken");
const JWT_KEY = "server_secret_key";
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "userImg/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

router.post("/join", async (req, res) => {
  let { Id, Pwd, Name, Nickname, gender, phone, birth } = req.body;
  try {
    const hashPwd = await bcrypt.hash(Pwd, 10);
    let sql = "INSERT INTO SNS_USER VALUES(?,?,?,?,?,null,?,null,NOW(),NOW(),?)";
    console.log(hashPwd);
    let result = await db.query(sql, [Id, hashPwd, Name, Nickname, gender, phone, birth]);
    res.json({
      result: result,
      userId: Id,
      msg: "success",
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/Idcheck/:id", async (req, res) => {
  let { id } = req.params;
  let msg = "";
  let result = false;
  try {
    let sql = "SELECT * FROM SNS_USER WHERE USERID = ? ";
    let [list] = await db.query(sql, [id]);

    if (list.length > 0) {
      result = false;
      msg = "사용중인 아이디입니다.";
    } else {
      result = true;
      msg = "사용가능한 아이디입니다.";
    }
    res.json({
      result: result,
      msg: msg,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  let { Id, Pwd } = req.body;

  try {
    let msg = "";
    let result = "fail";
    let token = null;

    let sql = "SELECT * FROM SNS_USER WHERE USERID = ?";
    let [list] = await db.query(sql, [Id]);
    if (list.length > 0) {
      const match = await bcrypt.compare(Pwd, list[0].pwd);
      if (match) {
        msg = list[0].userId + "님 환영합니다!";
        result = "success";
        token = jwt.sign(list[0], JWT_KEY, { expiresIn: "10h" });
      } else {
        result = "fail";
        msg = "비밀번호확인하세요";
      }
    } else {
      result = "fail";
      msg = "아이디를확인하세요";
    }
    res.json({
      msg: msg,
      result: result,
      token: token,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/:userId", async (req, res) => {
  let { userId } = req.params;
  console.log(userId);

  try {
    let sql = "SELECT * FROM SNS_USER u left join sns_user_img i on u.userid = i.userid WHERE u.USERID = ?";

    let sql2 = "SELECT COUNT(*) CNT FROM SNS_FEED WHERE USERID = ?";
    let sql3 =
      "SELECT(SELECT COUNT(*) FROM following WHERE userId = ?) AS followingCnt,(SELECT COUNT(*) FROM following WHERE followedId = ?) AS followerCnt ;";
    let sql4 = "select * from sns_feed where userid = ?";
    let sql5 = "select * from sns_fav f inner join sns_feed f1 on f.feed_no = f1.feed_NO where f.userid = ?";
    let sql6 = "SELECT * FROM MEDIA";
    let [list] = await db.query(sql, [userId]);
    let [cnt] = await db.query(sql2, [userId]);
    let [follow] = await db.query(sql3, [userId, userId]);
    let [myfeed] = await db.query(sql4, [userId]);
    let [favfeed] = await db.query(sql5, [userId]);
    let [img] = await db.query(sql6);

    res.json({
      info: list[0],
      cnt: cnt[0],
      follow: follow[0],
      myfeed: myfeed,
      favfeed: favfeed,
      img: img,

      result: "success",
    });
  } catch (error) {
    console.log(error);
  }
});

router.put("/:userid", authMiddleware, async (req, res) => {
  let { userid } = req.params;
  let { nickname, intro } = req.body;
  try {
    let sql = "UPDATE SNS_USER SET  NICKNAME = ? ,  INTRO = ? WHERE USERID = ?";
    let result = await db.query(sql, [nickname, intro, userid]);
    res.json({
      result: result,
      msg: "수정되었습니다.",
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/upload", upload.array("file"), async (req, res) => {
  let { userId } = req.body;
  const files = req.files;
  console.log(files);

  // const filename = req.file.filename;
  // const destination = req.file.destination;
  try {
    let results = [];
    let host = `${req.protocol}://${req.get("host")}/`;
    for (let file of files) {
      let filename = file.filename;
      let destination = file.destination;
      let query = "INSERT INTO SNS_USER_IMG VALUES(NULL, ?, ?,now(),now(), ?)";
      let result = await db.query(query, [filename, host + destination + filename, userId]);

      results.push(result);
    }
    res.json({
      message: "result",
      result: results,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

router.post("/checkPw", async (req, res) => {
  const { userId, password } = req.body;

  try {
    const [rows] = await db.query("SELECT pwd FROM SNS_USER WHERE userid = ?", [userId]);
    console.log(rows);

    if (rows.length === 0) return res.json({ valid: false });

    const hash = rows[0].pwd; // DB에 저장된 해쉬
    console.log(hash);

    const isMatch = await bcrypt.compare(password, hash);

    res.json({ valid: isMatch });
  } catch (error) {
    console.log(error);
    res.status(500).json({ valid: false });
  }
});

router.get("/isFollowing/:targetId", authMiddleware, async (req, res) => {
  const userId = req.user.userId; // 로그인한 내 ID
  const { targetId } = req.params; // 확인하고 싶은 상대 ID

  try {
    const sql = `
      SELECT COUNT(*) AS cnt
      FROM following
      WHERE userId = ? AND followedId = ?
    `;
    const [[result]] = await db.query(sql, [userId, targetId]);

    res.json({
      isFollowing: result.cnt > 0,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "서버 오류" });
  }
});
module.exports = router;
