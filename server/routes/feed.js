const express = require("express");
const authMiddleware = require("../auth");
const multer = require("multer");

const router = express.Router();
const db = require("../db");
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

router.get("/", async (req, res) => {
  try {
  } catch (error) {
    console.log("에러 발생!");
  }
});

router.get("/:id", async (req, res) => {
  let { id } = req.params;

  try {
    let sql = "SELECT * FROM SNS_FEED ";
    let sql2 =
      "select  f.feed_no , count(*) cnt  from sns_feed f inner join sns_comment c on f.feed_no = c.feed_no group by f.feed_no";
    let [list] = await db.query(sql);
    let [cnt] = await db.query(sql2);
    res.json({
      list: list,
      cnt: cnt,
      result: "success",
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/", authMiddleware, async (req, res) => {
  let { content, userId, nickname, codepenUrl } = req.body;

  try {
    let sql =
      "INSERT INTO SNS_FEED(USERID , NICKNAME , CONTENTS,CDATETIME,UDATETIME,CODEPENURL) VALUES(?, ?,? ,NOW(),NOW(),?)";
    let result = await db.query(sql, [userId, nickname, content, codepenUrl]);
    res.json({
      result: result,
      msg: "추가되었습니다.",
    });
  } catch (error) {
    console.log(error);
  }
});
router.delete(":feedNo", authMiddleware, async (req, res) => {
  let { feedNo } = req.params;
  try {
    let sql = "DELETE FROM SNS_FEED WHERE FEED_NO = ?";
    let result = await db.query(sql, [feedNo]);
    res.json({
      result: result,
      msg: "삭제되었습니다.",
    });
  } catch (error) {
    console.log(error);
  }
});

//comment 부분
router.get("/comment/:feedNo", async (req, res) => {
  let { feedNo } = req.params;

  try {
    let sql = "SELECT * FROM SNS_COMMENT WHERE FEED_NO = ? ";
    let [comment] = await db.query(sql, [feedNo]);
    res.json({
      comment: comment,
      result: "success",
    });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/comment/:cmtNo", authMiddleware, async (req, res) => {
  let { cmtNo } = req.params;
  console.log(cmtNo);

  try {
    let sql = "DELETE FROM SNS_COMMENT WHERE SNS_COMMENTNO = ?";
    let result = await db.query(sql, [cmtNo]);
    res.json({
      result: result,
      msg: "삭제되었습니다.",
    });
  } catch (error) {
    console.log(error);
  }
});

router.put("/comment/:cmtNo", authMiddleware, async (req, res) => {
  let { cmtNo } = req.params;
  let { contents } = req.body;

  try {
    let sql = "UPDATE SNS_COMMENT SET CONTENTS = ? WHERE SNS_COMMENTNO = ?";
    let [comment] = await db.query(sql, [contents, cmtNo]);
    res.json({
      comment: comment,
      msg: "수정되었습니다",
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/comment/", authMiddleware, async (req, res) => {
  let { feedNo, userid, contents, nickname } = req.body;

  try {
    let sql =
      "INSERT INTO SNS_COMMENT(FEED_NO , USERID , CONTENTS,NICKNAME,CDATETIME,UDATETIME) VALUES(?, ?,?,? ,NOW(),NOW())";
    let result = await db.query(sql, [feedNo, userid, contents, nickname]);
    res.json({
      result: result,
      msg: "추가되었습니다.",
    });
  } catch (error) {
    console.log(error);
  }
});
//좋아요 부분

router.get("/fav/:userid", async (req, res) => {
  let { userid } = req.params;

  try {
    let sql = "SELECT * FROM SNS_FAV WHERE USERID = ? ";
    let [fav] = await db.query(sql, [userid]);
    res.json({
      fav: fav,
      result: "success",
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/fav/", authMiddleware, async (req, res) => {
  let { feedNo, userid } = req.body;

  try {
    let sql = "INSERT INTO SNS_FAV(FEED_NO , USERID ) VALUES(?, ?)";
    let result = await db.query(sql, [feedNo, userid]);
    res.json({
      result: result,
      msg: "추가되었습니다.",
    });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/fav/", authMiddleware, async (req, res) => {
  let { feedNo, userid } = req.body;
  console.log(req.body);

  try {
    let sql = "DELETE FROM SNS_FAV WHERE  FEED_NO = ? AND USERID = ? ";
    let result = await db.query(sql, [feedNo, userid]);
    res.json({
      result: result,
      msg: "삭제되었습니다.",
    });
  } catch (error) {
    console.log(error);
  }
});

// router.post("/upload", upload.array("file"), async (req, res) => {
//   let { feedId } = req.body;
//   const files = req.files;
//   // const filename = req.file.filename;
//   // const destination = req.file.destination;
//   try {
//     let results = [];
//     let host = `${req.protocol}://${req.get("host")}/`;
//     for (let file of files) {
//       let filename = file.filename;
//       let destination = file.destination;
//       let query = "INSERT INTO TBL_FEED_IMG VALUES(NULL, ?, ?, ?)";
//       let result = await db.query(query, [feedId, filename, host + destination + filename]);
//       results.push(result);
//     }
//     res.json({
//       message: "result",
//       result: results,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Server Error");
//   }
// });

module.exports = router;
