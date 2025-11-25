import React from "react";
import { TextField, Button, Container, Typography, Box, Checkbox, FormControlLabel } from "@mui/material";
import { useRef, useState } from "react";
import { jwtDecode } from "jwt-decode";

function Register() {
  const [isAnonymous, setIsAnonymous] = useState(false);
  let content = useRef();
  let codepenRef = useRef();

  function fnAdd() {
    let token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      let params = {
        content: content.current.value,
        userId: decoded.userId,
        nickname: decoded.NICKNAME,
        codepenUrl: codepenRef.current.value,
      };
      if (isAnonymous) {
        params.nickname = "익명의사용자";
      }
      fetch("http://localhost:3010/feed/", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(params),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.msg);
        });
    } else {
      alert("로그인하세요");
      window.location.href = "/";
    }
  }

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start" // 상단 정렬
        minHeight="100vh"
        sx={{ padding: "20px" }} // 배경색 없음
      >
        <Typography variant="h4" gutterBottom>
          등록
        </Typography>
        <FormControlLabel
          control={<Checkbox checked={isAnonymous} onChange={(e) => setIsAnonymous(e.target.checked)} />}
          label="익명으로 등록"
          sx={{ alignSelf: "flex-start", mt: 1 }}
        />
        <TextField inputRef={content} label="내용" variant="outlined" margin="normal" fullWidth multiline rows={4} />
        <TextField
          label="CodePen Embed URL (선택사항)"
          variant="outlined"
          margin="normal"
          fullWidth
          placeholder="https://codepen.io/username/pen/abcd1234"
          inputRef={codepenRef} // useRef로 선언
          helperText="💡 CodePen에서 Embed URL을 복사하세요 (Share → Embed → Copy Embed URL)"
        />

        <Button
          onClick={() => {
            fnAdd();
          }}
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "20px" }}
        >
          등록하기
        </Button>
      </Box>
    </Container>
  );
}

export default Register;
