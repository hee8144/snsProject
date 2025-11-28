const express = require("express");
const authMiddleware = require("../auth");
const router = express.Router();
const db = require("../db");

// 특정 유저 좋아요 리스트 조회
router.get("/:userid", async (req, res) => {
  const { userid } = req.params;
  try {
    const [fav] = await db.query("SELECT * FROM SNS_FAV WHERE USERID = ?", [userid]);
    res.json({ fav, result: "success" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "좋아요 조회 중 오류" });
  }
});

// 좋아요 추가 + 알림 생성
router.post("/", authMiddleware, async (req, res) => {
  const { feedNo, userid } = req.body;
  try {
    // 1. 좋아요 등록
    await db.query("INSERT INTO SNS_FAV(FEED_NO , USERID) VALUES(?, ?)", [feedNo, userid]);

    // 2. 피드 작성자 조회
    const [feed] = await db.query("SELECT USERID FROM SNS_FEED WHERE FEED_NO = ?", [feedNo]);
    const toUser = feed[0].USERID;

    // 3. 알림 생성 (자기 자신이면 생략)
    if (toUser !== userid) {
      await db.query(
        `INSERT INTO SNS_NOTIFICATION
         (user_id, type, from_user, feed_no, content, is_read, created_at)
         VALUES (?, 'like', ?, ?, NULL, 0, NOW())`,
        [toUser, userid, feedNo]
      );
    }

    res.json({ result: "success", msg: "좋아요가 추가되었습니다." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "좋아요 처리 중 오류" });
  }
});

// 좋아요 삭제
router.delete("/", authMiddleware, async (req, res) => {
  const { feedNo, userid } = req.body;
  try {
    await db.query("DELETE FROM SNS_FAV WHERE FEED_NO = ? AND USERID = ?", [feedNo, userid]);
    res.json({ result: "success", msg: "좋아요가 삭제되었습니다." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "좋아요 삭제 중 오류" });
  }
});

module.exports = router;
