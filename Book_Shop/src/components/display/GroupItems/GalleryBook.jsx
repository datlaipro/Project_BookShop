import React from "react";
import { Box, Container, Grid, Typography, Button, IconButton } from "@mui/material";
import Slider from "react-slick";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
// import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Component chính
const GalleryBook = () => {
  // Cấu hình cho React Slick
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  // Dữ liệu slider
  const slides = [
    {
      title: "The Fine Print Book Collection",
      description: "Best Offer Save 30%. Grab it now!",
      buttonText: "Shop Collection",
      image: "/demo/images/banner-image2.png",
    },
    {
      title: "How Innovation Works",
      description: "Discount available. Grab it now!",
      buttonText: "Shop Product",
      image: "/demo/images/banner-image1.png",
    },
    {
      title: "Your Heart is the Sea",
      description: "Limited stocks available. Grab it now!",
      buttonText: "Shop Collection",
      image: "/demo/images/banner-image.png",
    },
  ];

  return (
    <Box
    id="billboard"  // Sử dụng theo ví dụ cũ, bỏ đi cũng được
    sx={{
      position: "relative",
      py: {xs: 15, sm:10, md: 5}, // Padding top và bottom:màn hình nhỏ là 15 màn hình to nhất là 5
      marginBottom: 5,
      backgroundColor: "#f9f9f9",
      backgroundImage: "url('/demo/images/banner-image-bg.jpg')",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      height: "800px",
      display: "flex",
      justifyContent: "center", // Căn giữa theo chiều ngang
      alignItems: "center", // Căn giữa theo chiều dọc
    }}
  >
    <Box sx={{ width: "80%" }}>
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <Box key={index}>
            <Grid
              container
              alignItems="center"
              justifyContent="center"
              spacing={2}
              sx={{
                flexDirection: {
                  xs: "column-reverse",
                  md: "row",
                },
                height: "100%", // Chiều cao 100%
              }}
            >
              {/* Text Content */}
              <Grid
                item
                xs={12}
                md={5}
                sx={{
                  textAlign: {
                    xs: "center",
                    md: "left",
                  },
                }}
              >
                <Box>
                  <Typography variant="h2" sx={{ fontSize: "4rem", mb: 2 }}>
                    {slide.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    {slide.description}
                  </Typography>
                  <Button
                    variant="contained"
                    // color="primary"
                    href="shop.html"
                    size="large"
                    sx={{backgroundColor: '#F86D72', '&:hover': { backgroundColor: 'black' }, borderRadius: '30px', px: 4, py: 2}}
                  >
                    {slide.buttonText}
                  </Button>
                </Box>
              </Grid>

              {/* Image */}
              <Grid item xs={12} md={6}>
                <Box
                  component="img"
                  src={slide.image}
                  alt={slide.title}
                  sx={{
                    maxWidth: "100%",
                    borderRadius: "8px",
                    objectFit: "contain",
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        ))}
      </Slider>
    </Box>
  </Box>
);
};

// Custom Arrow Component
const NextArrow = ({ onClick }) => {
return (
  <IconButton
    onClick={onClick}
    sx={{
      position: "absolute",
      top: "50%",
      right: -40,
      transform: "translateY(-50%)",
      zIndex: 10,
      color: "text.secondary",
      backgroundColor: "transparent", // Trong suốt
      "&:hover": {
        // backgroundColor: "primary.light",
        backgroundColor: "rgba(153, 173, 153, 0.29)", // Màu nền khi hover
      },
    }}
  >
    <ArrowForwardIosIcon />
  </IconButton>
);
};

const PrevArrow = ({ onClick }) => {
return (
  <IconButton
    onClick={onClick}
    sx={{
      position: "absolute",
      top: "50%",
      left: -40,
      transform: "translateY(-50%)",
      zIndex: 10,
      color: "text.secondary",
      backgroundColor: "transparent", // Trong suốt
      "&:hover": {
        // backgroundColor: "primary.light",
        backgroundColor: "rgba(153, 173, 153, 0.29)", // Màu nền khi hover

      },
    }}
  >
    <ArrowBackIosIcon />
  </IconButton>
);
};

export default GalleryBook;
