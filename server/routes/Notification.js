const express = require("express");
const router = express.Router();
const db = require("../db"); // MySQL 연결 모듈

// 특정 사용자 알림 조회
router.get("/:userId", async (req, res) => {
  let { userId } = req.params;

  try {
    let sql = `
      SELECT 
        NOTIF_ID AS NOTIF_ID,
        user_id AS USER_ID,
        from_user AS FROM_USER,
        type AS TYPE,
        feed_no AS FEED_NO,
        content AS CONTENT,
        is_read AS IS_READ,
        created_at AS CREATED_AT
      FROM SNS_NOTIFICATION
      WHERE user_id = ? AND is_read = 0
      ORDER BY created_at DESC
    `;
    const [notifications] = await db.query(sql, [userId]);
    res.json({ notifications });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "알림 조회 중 서버 오류" });
  }
});

// 알림 읽음 처리
router.put("/read/:notifId", async (req, res) => {
  const { notifId } = req.params;

  try {
    const sql = `UPDATE SNS_NOTIFICATION SET IS_READ = 1 WHERE NOTIF_ID = ?`;
    await db.query(sql, [notifId]);
    res.json({ result: "success", msg: "알림이 읽음 처리되었습니다." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "알림 읽음 처리 중 서버 오류" });
  }
});

module.exports = router;
