import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

export default function BackButton({ tooltip = "뒤로가기", onClick }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(-1);
    }
  };

  return (
    <Tooltip title={tooltip}>
      <IconButton onClick={handleClick} sx={{ mr: 1 }}>
        <ArrowBackIcon />
      </IconButton>
    </Tooltip>
  );
}
