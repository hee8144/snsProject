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
    let sql = "SELECT * FROM TBL_FEED F1 INNER JOIN TBL_FEED_IMG F2 ON F1.ID = F2.FEEDID WHERE F1.USERID = ?";
    let [list] = await db.query(sql, [id]);
    res.json({
      list: list,
      result: "success",
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

router.delete("/:feedNo", authMiddleware, async (req, res) => {
  let { feedNo } = req.params;
  console.log(feedNo);

  try {
    let sql = "DELETE FROM TBL_FEED WHERE ID = ?";
    let result = await db.query(sql, [feedNo]);
    res.json({
      result: result,
      msg: "삭제되었습니다.",
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/", authMiddleware, async (req, res) => {
  let { content, userId } = req.body;

  try {
    let sql = "INSERT INTO TBL_FEED(USERID , CONTENT , CDATETIME) VALUES(?, ? ,NOW())";
    let result = await db.query(sql, [userId, content]);
    res.json({
      result: result,
      msg: "추가되었습니다.",
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/upload", upload.array("file"), async (req, res) => {
  let { feedId } = req.body;
  const files = req.files;
  // const filename = req.file.filename;
  // const destination = req.file.destination;
  try {
    let results = [];
    let host = `${req.protocol}://${req.get("host")}/`;
    for (let file of files) {
      let filename = file.filename;
      let destination = file.destination;
      let query = "INSERT INTO TBL_FEED_IMG VALUES(NULL, ?, ?, ?)";
      let result = await db.query(query, [feedId, filename, host + destination + filename]);
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
