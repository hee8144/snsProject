const express = require("express");
const authMiddleware = require("../auth");

const router = express.Router();
const db = require("../db");

router.post("/", authMiddleware, async (req, res) => {
  let { follower, following } = req.body;

  try {
    let sql = "INSERT following VALUES(?, ?,now())";
    let result = await db.query(sql, [follower, following]);
    res.json({
      result: result,
      msg: "팔로우되었습니다.",
    });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/", authMiddleware, async (req, res) => {
  let { follower, following } = req.body;

  try {
    let sql = "DELETE FROM following WHERE USERID = ? AND FOLLOWEDID= ? ";
    let result = await db.query(sql, [follower, following]);
    res.json({
      result: result,
      msg: "언팔되었습니다.",
    });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
