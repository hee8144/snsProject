// src/components/FeedImages.js
import React from "react";
import { CardMedia, IconButton, Box } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FeedImages = ({ imgs }) => {
  if (!imgs || !Array.isArray(imgs) || imgs.length === 0) return null;

  if (imgs.length === 1) {
    return <CardMedia component="img" height="200" image={imgs[0].IMG_PATH} alt={imgs[0].IMG_NAME} />;
  }

  const PrevArrow = ({ onClick }) => (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        top: "50%",
        left: 0,
        transform: "translate(0, -50%)",
        zIndex: 1,
        color: "white",
      }}
    >
      <ArrowBackIosIcon />
    </IconButton>
  );

  const NextArrow = ({ onClick }) => (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        top: "50%",
        right: 0,
        transform: "translate(0, -50%)",
        zIndex: 1,
        color: "white",
      }}
    >
      <ArrowForwardIosIcon />
    </IconButton>
  );

  const settings = {
    accessibility: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <Slider {...settings}>
      {imgs.map((img, i) => (
        <Box key={i}>
          <CardMedia component="img" height="200" image={img.IMG_PATH} alt={img.IMG_NAME} />
        </Box>
      ))}
    </Slider>
  );
};

export default FeedImages;
