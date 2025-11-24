const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const db = require("../db");

const jwt = require("jsonwebtoken");
const JWT_KEY = "server_secret_key";

router.get("/", async (req, res) => {
  try {
  } catch (error) {
    console.log("에러 발생!");
  }
});

router.post("/join", async (req, res) => {
  let { Id, Pwd, Name } = req.body;
  try {
    const hashPwd = await bcrypt.hash(Pwd, 10);
    console.log(hashPwd);
    let sql = "INSERT INTO TBL_USER(USERID,PWD,USERNAME,CDATETIME,UDATETIME) VALUES(?,?,?,NOW(),NOW())";
    let result = await db.query(sql, [Id, hashPwd, Name]);
    res.json({
      result: result,
      msg: "success",
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  let { Id, Pwd } = req.body;

  try {
    let msg = "";
    let result = "fail";
    let token = null;

    let sql = "SELECT * FROM TBL_USER WHERE USERID = ?";
    let [list] = await db.query(sql, [Id]);
    if (list.length > 0) {
      const match = await bcrypt.compare(Pwd, list[0].pwd);
      if (match) {
        msg = list[0].userId + "님 환영합니다!";
        result = "success";
        token = jwt.sign(list[0], JWT_KEY, { expiresIn: "1h" });
      } else {
        result = "fail";
        msg: "비밀번호확인하세요";
      }
    } else {
      result = "fail";
      msg: "아이디를확인하세요";
    }
    res.json({
      msg: msg,
      result: "success",
      token: token,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/:userId", async (req, res) => {
  let { userId } = req.params;
  try {
    let sql = "SELECT * FROM TBL_USER U INNER JOIN TBL_FEED F ON U.USERID = F.USERID WHERE U.USERID = ?";
    let sql2 = "SELECT COUNT(*) CNT FROM TBL_FEED WHERE USERID = ?";
    let [list] = await db.query(sql, [userId]);
    let cnt = await db.query(sql2, [userId]);
    res.json({
      list: list[0],
      result: "success",
      cnt: cnt[0],
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
