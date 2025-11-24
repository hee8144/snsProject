import React from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  InputLabel,
  Select,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";

import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";

function Join() {
  const [phone1, setPhone1] = React.useState("010");

  let idRef = useRef();
  let pwdRef = useRef();
  let nameRef = useRef();
  let navigate = useNavigate();

  const handleChange = (event) => {
    setPhone1(event.target.value);
  };

  function join() {
    fetch("http://localhost:3010/user/join", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        Id: idRef.current.value,
        Pwd: pwdRef.current.value,
        Name: nameRef.current.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("가입되엇습니다.");
        navigate("/");
      });
  }

  return (
    <Container maxWidth="xs">
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
        <Typography variant="h4" gutterBottom>
          회원가입
        </Typography>
        <TextField inputRef={idRef} label="ID" variant="outlined" margin="normal" fullWidth />
        <TextField inputRef={nameRef} label="Username" variant="outlined" margin="normal" fullWidth />
        <TextField inputRef={pwdRef} label="Password" variant="outlined" margin="normal" fullWidth type="password" />
        <TextField inputRef={nameRef} label="Nickname" variant="outlined" margin="normal" fullWidth />
        <TextField inputRef={nameRef} label="Addr" variant="outlined" margin="normal" fullWidth />
        <Box width={"100%"} display="flex" flexDirection="rows" alignItems="center" justifyContent="space-between">
          <InputLabel id="demo-simple-select-label" style={{ marginLeft: "14px" }}>
            phone
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={phone1}
            label="phone1"
            sx={{ maxWidth: 100, mr: 4 }}
            onChange={handleChange}
          >
            <MenuItem value={"010"}>010</MenuItem>
            <MenuItem value={"011"}>011</MenuItem>
            <MenuItem value={"012"}>012</MenuItem>
          </Select>
          <TextField inputRef={nameRef} label="Phone" sx={{ maxWidth: 80, mr: 4 }} variant="outlined" fullWidth />
          <TextField inputRef={nameRef} sx={{ maxWidth: 80 }} label="Phone" variant="outlined" fullWidth />
        </Box>

        <FormControl
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <FormLabel style={{ marginLeft: "14px" }} id="demo-row-radio-buttons-group-label">
            Gender
          </FormLabel>
          <RadioGroup
            style={{ width: "100%", justifyContent: "space-evenly" }}
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
          </RadioGroup>
        </FormControl>

        <Button
          onClick={() => {
            join();
          }}
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "20px" }}
        >
          회원가입
        </Button>
        <Typography variant="body2" style={{ marginTop: "10px" }}>
          이미 회원이라면? <Link to="/login">로그인</Link>
        </Typography>
      </Box>
    </Container>
  );
}

export default Join;
