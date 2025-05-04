import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, Button, IconButton } from "@mui/material";
import Slider from "react-slick";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

// Hàm giới hạn số ký tự
const truncateText = (text, maxLength) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

// Hàm xáo trộn mảng
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Component chính
const GalleryBook = () => {
  const [slides, setSlides] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:6868/api/product");
        const products = response.data;

        // Kiểm tra dữ liệu API
        if (!Array.isArray(products)) {
          throw new Error("API did not return an array of products");
        }

        // Ánh xạ ProductDTO thành slides
        const mappedSlides = products
          .filter((product) => product.id && typeof product.id === "number") // Đảm bảo id hợp lệ
          .map((product) => {
            console.log("Product:", product); // Debug dữ liệu
            return {
              id: product.id,
              title: product.name || "Unknown Product",
              description: product.salePrice
                ? `Save ${product.discountPercentage || 0}%! Only ${product.salePrice} VNĐ`
                : product.description || "Discover now!",
              buttonText: "Shop Now",
              image: product.images?.[0]?.imagePath || "/demo/images/placeholder.png",
            };
          });

        // Lấy 5 sản phẩm ngẫu nhiên
        const randomSlides = shuffleArray(mappedSlides).slice(0, 5);
        setSlides(randomSlides);
      } catch (err) {
        setError("Failed to load slides. Please try again later.");
        console.error("Fetch error:", err);
      }
    };

    fetchProducts();
  }, []);

  // Cấu hình cho React Slick
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  if (error) {
    return (
      <Box sx={{ py: 4, textAlign: "center" }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (slides.length === 0) {
    return (
      <Box sx={{ py: 4, textAlign: "center" }}>
        <Typography>No slides available.</Typography>
      </Box>
    );
  }

  return (
    <Box
      id="billboard"
      sx={{
        position: "relative",
        py: { xs: 15, sm: 10, md: 5 },
        marginBottom: 5,
        backgroundColor: "#f9f9f9",
        backgroundImage: "url('/demo/images/banner-image-bg.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "800px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
                  // ml: 2,
                  flexDirection: {
                    xs: "column-reverse",
                    md: "row",
                  },
                  height: "100%",
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
                      {truncateText(slide.title, 30)}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                      {truncateText(slide.description, 50)}
                    </Typography>
                    <Button
                      variant="contained"
                      component={Link}
                      to={`/productdetail/${slide.id}`} // Link đến trang chi tiết sản phẩm
                      size="large"
                      sx={{
                        backgroundColor: "#F86D72",
                        "&:hover": { backgroundColor: "black" },
                        borderRadius: "30px",
                        px: 4,
                        py: 2,
                      }}
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
                      maxWidth: "65%",
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
        backgroundColor: "transparent",
        "&:hover": {
          backgroundColor: "rgba(153, 173, 153, 0.29)",
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
        backgroundColor: "transparent",
        "&:hover": {
          backgroundColor: "rgba(153, 173, 153, 0.29)",
        },
      }}
    >
      <ArrowBackIosIcon />
    </IconButton>
  );
};

export default GalleryBook;


// import React from "react";
// import { Box, Container, Grid, Typography, Button, IconButton } from "@mui/material";
// import Slider from "react-slick";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
// // import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";

// // Hàm giới hạn số ký tự
// const truncateText = (text, maxLength) => {
//   if (!text || text.length <= maxLength) return text;
//   return text.substring(0, maxLength) + '...';
// };

// // Component chính
// const GalleryBook = () => {
//   // Cấu hình cho React Slick
//   const settings = {
//     dots: false,
//     infinite: true,
//     autoplay: true,
//     speed: 200,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     nextArrow: <NextArrow />,
//     prevArrow: <PrevArrow />,
//   };

//   // Dữ liệu slider
//   const slides = [
//     {
//       title: "The Fine Print Book Collection",
//       description: "Best Offer Save 30%. Grab it now!",
//       buttonText: "Shop Collection",
//       image: "/demo/images/banner-image2.png",
//     },
//     {
//       title: "How Innovation Works",
//       description: "Discount available. Grab it now!",
//       buttonText: "Shop Product",
//       image: "/demo/images/banner-image1.png",
//     },
//     {
//       title: "Your Heart is the Sea",
//       description: "Limited stocks available. Grab it now!",
//       buttonText: "Shop Collection",
//       image: "/demo/images/banner-image.png",
//     },
//   ];

//   return (
//     <Box
//     id="billboard"  // Sử dụng theo ví dụ cũ, bỏ đi cũng được
//     sx={{
//       position: "relative",
//       py: {xs: 15, sm:10, md: 5}, // Padding top và bottom:màn hình nhỏ là 15 màn hình to nhất là 5
//       marginBottom: 5,
//       backgroundColor: "#f9f9f9",
//       backgroundImage: "url('/demo/images/banner-image-bg.jpg')",
//       backgroundSize: "cover",
//       backgroundRepeat: "no-repeat",
//       backgroundPosition: "center",
//       height: "800px",
//       display: "flex",
//       justifyContent: "center", // Căn giữa theo chiều ngang
//       alignItems: "center", // Căn giữa theo chiều dọc
//     }}
//   >
//     <Box sx={{ width: "80%" }}>
//       <Slider {...settings}>
//         {slides.map((slide, index) => (
//           <Box key={index}>
//             <Grid
//               container
//               alignItems="center"
//               justifyContent="center"
//               spacing={2}
//               sx={{
//                 flexDirection: {
//                   xs: "column-reverse",
//                   md: "row",
//                 },
//                 height: "100%", // Chiều cao 100%
//               }}
//             >
//               {/* Text Content */}
//               <Grid
//                 item
//                 xs={12}
//                 md={5}
//                 sx={{
//                   textAlign: {
//                     xs: "center",
//                     md: "left",
//                   },
//                 }}
//               >
//                 <Box>
//                   <Typography variant="h2" sx={{ fontSize: "4rem", mb: 2 }}>
//                   {truncateText(slide.title, 30)} {/* Giới hạn 20 ký tự */}
//                   </Typography>
//                   <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
//                   {truncateText(slide.description, 50)} {/* Giới hạn 50 ký tự */}
//                   </Typography>
//                   <Button
//                     variant="contained"
//                     // color="primary"
//                     href="/shop"
//                     size="large"
//                     sx={{backgroundColor: '#F86D72', '&:hover': { backgroundColor: 'black' }, borderRadius: '30px', px: 4, py: 2}}
//                   >
//                     {slide.buttonText}
//                   </Button>
//                 </Box>
//               </Grid>

//               {/* Image */}
//               <Grid item xs={12} md={6}>
//                 <Box
//                   component="img"
//                   src={slide.image}
//                   alt={slide.title}
//                   sx={{
//                     maxWidth: "100%",
//                     borderRadius: "8px",
//                     objectFit: "contain",
//                   }}
//                 />
//               </Grid>
//             </Grid>
//           </Box>
//         ))}
//       </Slider>
//     </Box>
//   </Box>
// );
// };

// // Custom Arrow Component
// const NextArrow = ({ onClick }) => {
// return (
//   <IconButton
//     onClick={onClick}
//     sx={{
//       position: "absolute",
//       top: "50%",
//       right: -40,
//       transform: "translateY(-50%)",
//       zIndex: 10,
//       color: "text.secondary",
//       backgroundColor: "transparent", // Trong suốt
//       "&:hover": {
//         // backgroundColor: "primary.light",
//         backgroundColor: "rgba(153, 173, 153, 0.29)", // Màu nền khi hover
//       },
//     }}
//   >
//     <ArrowForwardIosIcon />
//   </IconButton>
// );
// };

// const PrevArrow = ({ onClick }) => {
// return (
//   <IconButton
//     onClick={onClick}
//     sx={{
//       position: "absolute",
//       top: "50%",
//       left: -40,
//       transform: "translateY(-50%)",
//       zIndex: 10,
//       color: "text.secondary",
//       backgroundColor: "transparent", // Trong suốt
//       "&:hover": {
//         // backgroundColor: "primary.light",
//         backgroundColor: "rgba(153, 173, 153, 0.29)", // Màu nền khi hover

//       },
//     }}
//   >
//     <ArrowBackIosIcon />
//   </IconButton>
// );
// };

// export default GalleryBook;




// <Box
//   id="billboard"
//   sx={{
//     position: "relative",
//     py: { xs: 15, sm: 10, md: 5 },
//     marginBottom: 5,
//     backgroundColor: "#f9f9f9",
//     backgroundImage: "url('/demo/images/banner-image-bg.jpg')",
//     backgroundSize: "contain",
//     backgroundRepeat: "no-repeat",
//     backgroundPosition: "top center",
//     minHeight: "800px",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//   }}
// >
//   <Box sx={{ width: "80%", mx: "auto" }}>
//     <Slider
//       {...settings}
//       sx={{
//         "& .slick-slide": {
//           padding: 0,
//           margin: 0,
//         },
//       }}
//     >
//       {slides.map((slide, index) => (
//         <Box key={index}>
//           <Grid
//             container
//             alignItems="center"
//             justifyContent="center"
//             spacing={2}
//             sx={{
//               flexDirection: { xs: "column-reverse", md: "row" },
//               height: "100%",
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             {/* Text Content */}
//             <Grid
//               item
//               xs={12}
//               md={5}
//               sx={{
//                 textAlign: { xs: "center", md: "left" },
//               }}
//             >
//               <Box>
//                 <Typography variant="h2" sx={{ fontSize: "4rem", mb: 2 }}>
//                   {truncateText(slide.title, 30)}
//                 </Typography>
//                 <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
//                   {truncateText(slide.description, 50)}
//                 </Typography>
//                 <Button
//                   variant="contained"
//                   component={Link}
//                   to={`/productdetail/${slide.id}`}
//                   size="large"
//                   sx={{
//                     backgroundColor: "#F86D72",
//                     "&:hover": { backgroundColor: "black" },
//                     borderRadius: "30px",
//                     px: 4,
//                     py: 2,
//                   }}
//                 >
//                   {slide.buttonText}
//                 </Button>
//               </Box>
//             </Grid>

//             {/* Image */}
//             <Grid
//               item
//               xs={12}
//               md={6}
//               sx={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 maxHeight: "500px",
//                 overflow: "hidden",
//               }}
//             >
//               <Box
//                 component="img"
//                 src={slide.image}
//                 alt={slide.title}
//                 sx={{
//                   maxWidth: { xs: "90%", md: "65%" },
//                   maxHeight: "100%",
//                   borderRadius: "8px",
//                   objectFit: "contain",
//                 }}
//               />
//             </Grid>
//           </Grid>
//         </Box>
//       ))}
//     </Slider>
//   </Box>
// </Box>

