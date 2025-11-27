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
  console.log(id);

  try {
    let sql =
      "select f.feed_no , f.userId ,f.NICKNAME,f.CONTENTS,f.CODEPENURL, m1.*,i.profile_name,i.profile_Path, date_format(f.CDATETIME , '%Y-%m-%d %H:%i') CDATE from sns_feed f left join (select * from media where order_index = 1) m1 on f.feed_no = m1.feed_no  left join sns_user_img i on f.userId = i.userId order by f.cdatetime desc ";
    let sql2 =
      "select  f.feed_no , count(*) cnt  from sns_feed f inner join sns_comment c on f.feed_no = c.feed_no group by f.feed_no";
    let sql3 = "SELECT * FROM MEDIA";
    let sql4 = "SELECT * FROM FOLLOWING WHERE USERID = ?";
    let [list] = await db.query(sql);
    let [cnt] = await db.query(sql2);
    let [img] = await db.query(sql3);
    let [follow] = await db.query(sql4, [id]);
    res.json({
      list: list,
      cnt: cnt,
      img: img,
      follow: follow,
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
router.delete("/:feedNo", authMiddleware, async (req, res) => {
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

router.put("/:feedNo", authMiddleware, async (req, res) => {
  let { feedNo } = req.params;
  let { content, codepen } = req.body;
  try {
    let sql = "UPDATE SNS_FEED SET CONTENTS = ? , CODEPENURL = ? WHERE FEED_NO = ?";
    let result = await db.query(sql, [content, codepen, feedNo]);
    res.json({
      result: result,
      msg: "수정되었습니다.",
    });
  } catch (error) {
    console.log(error);
  }
});
router.post("/upload", upload.array("file"), async (req, res) => {
  let { feedId } = req.body;
  const files = req.files;
  console.log(files.file);

  // const filename = req.file.filename;
  // const destination = req.file.destination;
  try {
    let results = [];
    let host = `${req.protocol}://${req.get("host")}/`;
    let i = 0;
    for (let file of files) {
      i++;
      let filename = file.filename;
      let destination = file.destination;
      console.log(destination);

      let query = "INSERT INTO MEDIA VALUES(NULL, ?, ?, ?,now(), ?)";
      let result = await db.query(query, [filename, host + destination + filename, feedId, i]);

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

module.exports = router;
