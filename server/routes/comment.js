const express = require("express");
const authMiddleware = require("../auth");
const router = express.Router();
const db = require("../db");

// 댓글 리스트
router.get("/list/:feedNo", async (req, res) => {
  const { feedNo } = req.params;
  try {
    const [comment] = await db.query(
      "select * from sns_comment c left join sns_user_img i on c.userid = i.userid where c.feed_no = ?",
      [feedNo]
    );
    res.json({ comment, result: "success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "댓글 조회 중 오류" });
  }
});

// 댓글 삭제
router.delete("/:cmtNo", authMiddleware, async (req, res) => {
  const { cmtNo } = req.params;
  try {
    const result = await db.query("DELETE FROM SNS_COMMENT WHERE SNS_COMMENTNO = ?", [cmtNo]);
    res.json({ result, msg: "삭제되었습니다." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "댓글 삭제 중 오류" });
  }
});

// 댓글 수정
router.put("/:cmtNo", authMiddleware, async (req, res) => {
  const { cmtNo } = req.params;
  const { contents } = req.body;
  try {
    const [comment] = await db.query("UPDATE SNS_COMMENT SET CONTENTS = ? WHERE SNS_COMMENTNO = ?", [contents, cmtNo]);
    res.json({ comment, msg: "수정되었습니다." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "댓글 수정 중 오류" });
  }
});

// 댓글 등록 + 알림 생성
router.post("/", authMiddleware, async (req, res) => {
  const { feedNo, userid, contents, nickname } = req.body;

  try {
    // 2. 댓글 등록 (닉네임 포함)
    await db.query(
      `INSERT INTO SNS_COMMENT (FEED_NO, USERID,CONTENTS , NICKNAME, CDATETIME, UDATETIME) 
       VALUES (?, ?, ?, ?, NOW(), NOW())`,
      [feedNo, userid, contents, nickname]
    );

    // 3. 피드 작성자 조회
    const [feed] = await db.query("SELECT USERID FROM SNS_FEED WHERE FEED_NO = ?", [feedNo]);
    const toUser = feed[0].USERID;

    // 4. 알림 생성 (자기 자신이면 생략)
    if (toUser !== userid) {
      await db.query(
        `INSERT INTO SNS_NOTIFICATION
   (USER_ID, TYPE, FROM_USER, FEED_NO, CONTENT, IS_READ, CREATED_AT)
   VALUES (?, 'comment', ?, ?, ?, 0, NOW())`,
        [toUser, userid, feedNo, contents]
      );
    }

    res.json({ result: "success", msg: "댓글이 등록되었습니다." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "댓글 등록 중 오류" });
  }
});

// 댓글 개수 조회
router.get("/cnt/:feedNo", async (req, res) => {
  const { feedNo } = req.params;
  try {
    const [result] = await db.query("SELECT COUNT(*) AS cnt FROM SNS_COMMENT WHERE FEED_NO = ?", [feedNo]);
    res.json({ cnt: result[0].cnt });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "서버 오류" });
  }
});

module.exports = router;
