import React, { useRef } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  let idRef = useRef();
  let pwdRef = useRef();
  let navigate = useNavigate();
  function login() {
    fetch("http://localhost:3010/user/", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        Id: idRef.current.value,
        Pwd: pwdRef.current.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result === "success") {
          localStorage.setItem("token", data.token);

          navigate("/feed");
          alert(data.msg);
        } else {
          alert(data.msg);
        }
      });
  }
  return (
    <Container maxWidth="xs">
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
        <Typography variant="h4" gutterBottom>
          로그인
        </Typography>
        <TextField inputRef={idRef} label="ID" variant="outlined" margin="normal" fullWidth />
        <TextField inputRef={pwdRef} label="Password" variant="outlined" margin="normal" fullWidth type="password" />
        <Button
          onClick={() => {
            login();
          }}
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "20px" }}
        >
          로그인
        </Button>
        <Typography variant="body2" style={{ marginTop: "10px" }}>
          회원이아니신가요? <Link to="/join">회원가입</Link>
        </Typography>
      </Box>
    </Container>
  );
}

export default Login;
