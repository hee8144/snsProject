import React, { useEffect, useState, useRef } from "react";
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
  IconButton,
  Avatar,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Link, useNavigate } from "react-router-dom";

function Join() {
  const [phone1, setPhone1] = useState("010");
  const [phone2, setPhone2] = useState("");
  const [phone3, setPhone3] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwdCheck, setPwdCheck] = useState("");
  const [gender, setGender] = useState("m");
  const [birth, setBirth] = useState();
  const [pwdError, setPwdError] = useState(false);
  let [files, setFile] = React.useState([]);
  const [idFlg, setIdFlg] = useState(false);

  let idRef = useRef();
  let nameRef = useRef();
  let nickRef = useRef();
  let navigate = useNavigate();

  const phone = `${phone1}-${phone2}-${phone3}`;

  useEffect(() => {
    if (pwdCheck === "") {
      setPwdError(false);
    } else {
      setPwdError(pwd !== pwdCheck);
    }
  }, [pwd, pwdCheck]);

  function IdCheck() {
    const id = idRef.current.value.trim();
    if (id.length < 4) {
      alert("아이디는 4글자 이상이어야 합니다.");
      return;
    }

    fetch("http://localhost:3010/user/Idcheck/" + id)
      .then((res) => res.json())
      .then((data) => {
        setIdFlg(data.result);
        alert(data.msg);
      });
  }

  function join() {
    const id = idRef.current.value.trim();
    const name = nameRef.current.value.trim();
    const nick = nickRef.current.value.trim();

    if (id.length < 4) {
      return alert("아이디는 4글자 이상 입력하세요.");
    }
    if (!idFlg) {
      return alert("아이디 중복확인을 해주세요.");
    }
    if (pwd.length < 6) {
      return alert("비밀번호는 6자리 이상이어야 합니다.");
    }
    if (pwdError) {
      return alert("비밀번호가 일치하지 않습니다.");
    }
    if (name === "") {
      return alert("이름을 입력해주세요.");
    }
    if (nick === "") {
      return alert("닉네임을 입력해주세요.");
    }
    if (phone2.length < 3 || phone3.length < 4) {
      return alert("전화번호를 올바르게 입력해주세요.");
    }
    if (!birth) {
      return alert("생년월일을 선택해주세요.");
    }

    fetch("http://localhost:3010/user/join", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        Id: id,
        Pwd: pwd,
        Name: name,
        Nickname: nick,
        phone: phone,
        gender: gender,
        birth: birth.format("YYYY-MM-DD"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        fnUploadFile(data.userId);
        alert("가입되었습니다.");

        navigate("/");
      });
  }

  //업로드
  const fnUploadFile = (userid) => {
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("userId", userid);
    fetch("http://localhost:3010/user/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Container maxWidth="xs">
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
        <Typography variant="h4" gutterBottom>
          회원가입
        </Typography>
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ mb: 3 }}>
          <Avatar
            src={files.length > 0 ? URL.createObjectURL(files[0]) : ""}
            sx={{
              width: 100,
              height: 100,
              bgcolor: "#e0e0e0",
              border: "2px solid #ccc",
            }}
          />

          <input
            accept="image/*"
            type="file"
            id="profile-upload"
            style={{ display: "none" }}
            onChange={(e) => setFile(Array.from(e.target.files))}
          />

          <label htmlFor="profile-upload">
            <IconButton component="span" color="primary" sx={{ mt: 1 }} aria-label="upload picture">
              <PhotoCamera />
            </IconButton>
          </label>

          <Typography variant="body2" sx={{ mt: 1 }}>
            {"프로필 사진 선택"}
          </Typography>
        </Box>
        {/* ID */}
        <Box display="flex" gap={2} width="100%" alignItems="center">
          <TextField inputRef={idRef} label="ID" variant="outlined" margin="normal" fullWidth />
          <Button variant="contained" sx={{ height: "56px", minWidth: "100px" }} onClick={IdCheck}>
            중복확인
          </Button>
        </Box>

        {/* 이름 */}
        <TextField inputRef={nameRef} label="Username" variant="outlined" margin="normal" fullWidth />

        {/* 비밀번호 */}
        <TextField
          onChange={(e) => setPwd(e.target.value)}
          label="Password"
          variant="outlined"
          margin="normal"
          fullWidth
          type="password"
        />

        {/* 비밀번호 확인 */}
        <TextField
          onChange={(e) => setPwdCheck(e.target.value)}
          label="PasswordChecks"
          variant="outlined"
          margin="normal"
          fullWidth
          type="password"
          error={pwdError}
          helperText={pwdError ? "비밀번호가 일치하지 않습니다." : "비밀번호가 일치합니다"}
        />

        {/* 닉네임 */}
        <TextField inputRef={nickRef} label="Nickname" variant="outlined" margin="normal" fullWidth />

        {/* 전화번호 */}
        <Box width="100%" marginTop="16px" display="flex" alignItems="center" gap={1}>
          <InputLabel sx={{ marginLeft: "14px", whiteSpace: "nowrap" }}>phone</InputLabel>

          <Select value={phone1} onChange={(e) => setPhone1(e.target.value)} size="small" sx={{ width: 80 }}>
            <MenuItem value={"010"}>010</MenuItem>
            <MenuItem value={"011"}>011</MenuItem>
            <MenuItem value={"012"}>012</MenuItem>
          </Select>

          <Box>-</Box>

          <TextField
            value={phone2}
            onChange={(e) => setPhone2(e.target.value.replace(/[^0-9]/g, ""))}
            inputProps={{ maxLength: 4 }}
            size="small"
            sx={{ width: 80 }}
          />

          <Box>-</Box>

          <TextField
            value={phone3}
            onChange={(e) => setPhone3(e.target.value.replace(/[^0-9]/g, ""))}
            inputProps={{ maxLength: 4 }}
            size="small"
            sx={{ width: 80 }}
          />
        </Box>

        {/* 생년월일 */}
        <Box width="100%" marginTop="16px" display="flex" alignItems="center" gap={1}>
          <InputLabel sx={{ marginLeft: "14px", marginRight: "12px" }}>birth</InputLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker value={birth} onChange={setBirth} />
          </LocalizationProvider>
        </Box>

        {/* 성별 */}
        <FormControl
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            marginTop: "16px",
          }}
        >
          <FormLabel style={{ marginLeft: "14px" }}>Gender</FormLabel>
          <RadioGroup
            row
            name="row-radio-buttons-group"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            style={{ width: "100%", justifyContent: "space-evenly" }}
          >
            <FormControlLabel value="f" control={<Radio />} label="Female" />
            <FormControlLabel value="m" control={<Radio />} label="Male" />
          </RadioGroup>
        </FormControl>

        {/* 회원가입 버튼 */}
        <Button onClick={join} variant="contained" color="primary" fullWidth style={{ marginTop: "20px" }}>
          회원가입
        </Button>

        <Typography variant="body2" style={{ marginTop: "10px" }}>
          이미 회원이라면? <Link to="/">로그인</Link>
        </Typography>
      </Box>
    </Container>
  );
}

export default Join;
