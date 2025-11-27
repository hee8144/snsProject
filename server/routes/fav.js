const express = require("express");
const authMiddleware = require("../auth");
const router = express.Router();
const db = require("../db");

//좋아요 부분

router.get("/:userid", async (req, res) => {
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

router.post("/", authMiddleware, async (req, res) => {
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

router.delete("/", authMiddleware, async (req, res) => {
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
module.exports = router;
