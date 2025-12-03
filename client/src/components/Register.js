import React from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  Avatar,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { useRef, useState } from "react";
import { jwtDecode } from "jwt-decode";

function Register() {
  let [files, setFile] = React.useState([]);
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
          fnUploadFile(data.result[0].insertId);
        });
    } else {
      alert("로그인하세요");
      window.location.href = "/";
    }
  }
  //업로드
  const handleFileChange = (event) => {
    setFile(Array.from(event.target.files));
  };
  const fnUploadFile = (feedId) => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i]);
    }
    formData.append("feedId", feedId);
    fetch("http://localhost:3010/feed/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        window.navigate("/feed"); // 원하는 경로
      })
      .catch((err) => {
        console.error(err);
      });
  };

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
          inputRef={codepenRef}
          helperText="💡 CodePen에서 Embed URL을 복사하세요 (Share → Embed → Copy Embed URL)"
        />

        <Box display="flex" alignItems="center" margin="normal" fullWidth>
          <input
            multiple
            accept="image/*"
            style={{ display: "none" }}
            id="file-upload"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="file-upload">
            <IconButton color="primary" component="span">
              <PhotoCamera />
            </IconButton>
          </label>
          {files.length > 0 &&
            files.map((file) => (
              <Avatar
                alt="첨부된 이미지"
                src={URL.createObjectURL(file)}
                sx={{ width: 56, height: 56, marginLeft: 2 }}
              />
            ))}
          <Typography variant="body1" sx={{ marginLeft: 2 }}>
            {files.length > 0 ? files[0].name : "첨부할 파일 선택"}
          </Typography>
        </Box>

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
