const express = require("express");
const authMiddleware = require("../auth");
const router = express.Router();
const db = require("../db");

// 팔로우
router.post("/", authMiddleware, async (req, res) => {
  const { follower, following } = req.body;

  try {
    // 1. 팔로우 등록
    const sqlFollow = "INSERT INTO FOLLOWING (USERID, FOLLOWEDID, FOLLOW_DATE) VALUES (?, ?, NOW())";
    await db.query(sqlFollow, [follower, following]);

    // 2. 알림 생성 (자기 자신에게는 안 보내기)
    if (follower !== following) {
      const sqlNotif = `
        INSERT INTO SNS_NOTIFICATION
        (user_id, type, from_user, feed_no, content, is_read, created_at)
        VALUES (?, 'follow', ?, NULL, NULL, 0, NOW())
      `;
      await db.query(sqlNotif, [following, follower]);
    }

    res.json({ result: "success", msg: "팔로우되었습니다." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "팔로우 처리 중 오류" });
  }
});

// 언팔
router.delete("/", authMiddleware, async (req, res) => {
  const { follower, following } = req.body;

  try {
    const sql = "DELETE FROM FOLLOWING WHERE USERID = ? AND FOLLOWEDID = ?";
    await db.query(sql, [follower, following]);

    res.json({ result: "success", msg: "언팔되었습니다." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "언팔 처리 중 오류" });
  }
});

module.exports = router;
