const express = require("express");
const authMiddleware = require("../auth");
const router = express.Router();
const db = require("../db");

//comment 부분
router.get("/:feedNo", async (req, res) => {
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

router.delete("/:cmtNo", authMiddleware, async (req, res) => {
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

router.put("/:cmtNo", authMiddleware, async (req, res) => {
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

router.post("/", authMiddleware, async (req, res) => {
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
module.exports = router;
