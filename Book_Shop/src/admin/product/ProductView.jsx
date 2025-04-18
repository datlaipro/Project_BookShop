import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const ProductView = () => {
  const product = {
    title: "The Emerald Crown ABCDEFGHYJKMLOLKJHGRTYI",
    price: 200,
    oldPrice: 260,
    description:
      "Justo, cum feugiat imperdiet nulla molestie, Ông Trump và ông Zelensky bắt đầu cuộc trò chuyện bằng những lời chào hỏi xã giao thông thường, trong không khí được đánh giá là cởi mở và thân thiện. Tổng thống Mỹ trước đó nói rằng thỏa thuận khoáng sản sắp ký sẽ là điều tuyệt vời cho Ukraine",
    stock: 2,
    rating: 4,
    images: [
      "/demo/images/product-large-1.png",
      "/demo/images/product-large-2.png",
      "/demo/images/product-large-3.png",
      "/demo/images/product-large-3.png",
      "/demo/images/product-large-3.png",
      "/demo/images/product-thumbnail-1.png",
      "/demo/images/product-thumbnail-2.png",
      "/demo/images/product-thumbnail-3.png",
      "/demo/images/product-thumbnail-3.png",
      "/demo/images/product-thumbnail-3.png",
    ],
  };

  const truncateTitle = (title, maxLength) => {
    return title.length > maxLength ? title.substring(0, maxLength) + "..." : title;
  };
  const truncateDescription = (description, maxLength2) => {
    return description.length > maxLength2 ? description.substring(0, maxLength2) + "..." : description;
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 4, padding: 2 }}>
        {/* Gallery bên trái */}
        <Box sx={{ width: "30%", maxWidth: "100%" }}>
          <ImageList variant="masonry" cols={1} gap={1}> 
          {/* // Hiển thị 1 cột ảnh sản phẩm */}
            {product.images.slice(0, 1).map((image, index) => (
              // Dùng slice hiển thị tối đa 1 ảnh đầu tiên
              // Dùng product.images.map() để lặp qua mảng images thay vì object product.map((product)
              <ImageListItem key={index}>
                <img
                  srcSet={`${image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  // Các thông số loằng ngoằng là của component ImageListItem mẫu
                  src={`${image}?w=248&fit=crop&auto=format`}
                  alt={`Product image ${index + 1}`}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>

        {/* Thông tin sản phẩm bên phải */}
        <Box sx={{ width: "70%" }}>
          <Typography variant="h1" gutterBottom>
            {truncateTitle(product.title, 20)}
          </Typography>
          <Typography variant="h4" color="#F86D72">
            ${product.price} <del style={{ color: "gray" }}>${product.oldPrice}</del>
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {Array.from({ length: product.rating }, (_, index) => (
              <StarIcon key={index} sx={{ color: "gold", fontSize: 26, fontWeight: "bold" }} />
            ))}
          </Box>
          <Typography variant="h5" sx={{ mt: 2 }}>
            {truncateDescription(product.description, 200)}
          </Typography>
          <Typography variant="h6" sx={{ mt: 1 }}>Stock: {product.stock}</Typography>

          {/* Nút thao tác */}
          <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
            <Button
              variant="contained"
              sx={{
                width: 250,
                height: 80,
                backgroundColor: "#F86D72",
                fontWeight: "bold",
                color: "white",
                fontSize: "20px",
                borderRadius: 20,
                "&:hover": {
                  backgroundColor: "#183e3e",
                },
              }}
            >
              SỬA
            </Button>
            <Button
              variant="contained"
              sx={{
                width: 250,
                height: 80,
                backgroundColor: "#183e3e",
                fontWeight: "bold",
                color: "white",
                fontSize: "20px",
                borderRadius: 20,
                "&:hover": {
                  backgroundColor: "#F86D72",
                },
              }}
            >
              XÓA ...
            </Button>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default ProductView;