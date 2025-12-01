const express = require("express");
const router = express.Router();
const db = require("../db");

// 최근 메시지 가져오기 (공용 / 1:1 통합)
router.get("/messages", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit || "100", 10);
    const room = req.query.room || "public"; // 쿼리 파라미터로 room 지정
    const currentUserId = req.query.userId; // 클라이언트에서 현재 유저 전달 필요

    let sql, params;

    if (room === "public") {
      // 공용 채팅
      sql = `
        SELECT c.*, u.NICKNAME, u.userName
        FROM sns_public_chat c
        INNER JOIN sns_user u ON c.userId = u.userId
        WHERE c.room_id = 'public'
        ORDER BY c.created_at DESC
        LIMIT ?
      `;
      params = [limit];
    } else {
      // 1:1 채팅 (room 이름으로 sender/receiver 구분)
      const [userA, userB] = room.split("_");

      // ✅ 안읽은 메시지 읽음 처리 (receiver가 현재 유저)
      if (currentUserId) {
        await db.query(
          `UPDATE sns_private_chat
           SET read_status = 1
           WHERE receiver_id = ? AND sender_id IN (?, ?) AND read_status = 0`,
          [currentUserId, userA, userB]
        );
      }

      // 1:1 메시지 가져오기
      sql = `
        SELECT c.*, u.NICKNAME, u.userName
        FROM sns_private_chat c
        INNER JOIN sns_user u ON c.sender_id = u.userId
        WHERE (c.sender_id = ? AND c.receiver_id = ?) 
           OR (c.sender_id = ? AND c.receiver_id = ?)
        ORDER BY c.created_at ASC
        LIMIT ?
      `;
      params = [userA, userB, userB, userA, limit];
    }

    const [rows] = await db.query(sql, params);

    res.json({
      result: "success",
      messages: rows,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ result: "error" });
  }
});

router.get("/unread/:otherUserId/:currentUserId", async (req, res) => {
  try {
    const { otherUserId, currentUserId } = req.params;

    const [rows] = await db.query(
      `SELECT COUNT(*) AS unreadCount
       FROM sns_private_chat
       WHERE sender_id = ? AND receiver_id = ? AND read_status = 0`,
      [otherUserId, currentUserId]
    );

    res.json({ result: "success", count: rows[0].unreadCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ result: "error" });
  }
});
// 채팅방 리스트 조회 (1:1 + 공용)
router.get("/rooms/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    // 1️⃣ 1:1 채팅
    const [privateRooms] = await db.query(
      `SELECT
          CASE
              WHEN sender_id = ? THEN receiver_id
              ELSE sender_id
          END AS other_user_id,
          MAX(created_at) AS last_time,
          SUBSTRING_INDEX(GROUP_CONCAT(content ORDER BY created_at DESC), ',', 1) AS last_message,
          SUM(CASE WHEN receiver_id = ? AND read_status = 0 THEN 1 ELSE 0 END) AS unread_count,
          'private' AS type
       FROM sns_private_chat
       WHERE sender_id = ? OR receiver_id = ?
       GROUP BY other_user_id`,
      [userId, userId, userId, userId]
    );

    // 2️⃣ 공용 채팅
    const [publicRows] = await db.query(
      `SELECT
      'public' AS other_user_id,
      MAX(created_at) AS last_time,
      SUBSTRING_INDEX(GROUP_CONCAT(content ORDER BY created_at DESC), ',', 1) AS last_message,
      0 AS unread_count, 
      'public' AS type
   FROM sns_public_chat`
    );

    // 3️⃣ 합치기
    const rooms = [...privateRooms, ...publicRows];

    // 시간순 정렬
    rooms.sort((a, b) => new Date(b.last_time) - new Date(a.last_time));

    res.json({ rooms });
  } catch (err) {
    console.error("채팅방 리스트 조회 오류:", err);
    res.status(500).json({ error: "채팅방 리스트 조회 오류" });
  }
});
module.exports = router;
