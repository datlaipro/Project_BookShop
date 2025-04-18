// components/ProductSection.js
import React from "react";
import { Box, Container } from "@mui/material";
import ProductGroup from "./ProductGroup";
import Grid from "@mui/material/Grid2";

const ProductSection = () => {
  // Dữ liệu các nhóm sản phẩm
  const groups = [
    {
      title: "Featured",
      products: [
        { image: "/demo/images/product-item2.png", title: "Echoes AAAAAAAAAAAAA of the Ancients", author: "Lauren Asher", rating: 5, price: 870, originalPrice:1200 },
        { image: "/demo/images/product-item1.png", title: "The Midnight Garden", author: "Lauren Asher", rating: 4.5, price: 750 },
        { image: "/demo/images/product-item3.png", title: "Shadow of the Serpent", author: "Lauren Asher", rating: 4, price: 800 },
      ],
    },
    {
      title: "Latest items",
      products: [
        { image: "/demo/images/product-item4.png", title: "Whispering Winds", author: "Lauren Asher", rating: 5, price: 870 },
        { image: "/demo/images/product-item5.png", title: "The Celestial Tapestry", author: "Lauren Asher", rating: 4.5, price: 780 },
        { image: "/demo/images/product-item6.png", title: "Legends of the Lost", author: "Lauren Asher", rating: 4, price: 720 },
      ],
    },
    {
      title: "Best reviewed",
      products: [
        { image: "/demo/images/product-item7.png", title: "The Timeless Voyage", author: "Lauren Asher", rating: 5, price: 950 },
        { image: "/demo/images/product-item8.png", title: "Whispers of Eternity", author: "Lauren Asher", rating: 4.8, price: 820 },
        { image: "/demo/images/product-item9.png", title: "Echoes of Tomorrow", author: "Lauren Asher", rating: 4.7, price: 890 },
      ],
    },
    {
      title: "On sale",
      products: [
        { image: "/demo/images/product-item10.png", title: "Chronicles of the Lost City", author: "Lauren Asher", rating: 4.5, price: 690 },
        { image: "/demo/images/product-item11.png", title: "The Starlit Path", author: "Lauren Asher", rating: 4.3, price: 670 },
        { image: "/demo/images/product-item12.png", title: "Rays of the Dawn", author: "Lauren Asher", rating: 4.2, price: 640 },
      ],
    },
  ];

  return (

 <Box sx={{ width: "100%", overflow: "hidden", py: 4 }}>
      <Grid
        container
        spacing={2}
        sx={{
          maxWidth: "100%",
          mx: "auto",
          display: 'flex',
          justifyContent: 'center', // Căn giữa nội dung theo chiều ngang
          "& .MuiGrid-item": {
            flexBasis: "calc(25% - 16px)", // Mỗi group chiếm 25% (trừ khoảng cách)
          },
          "@media (max-width: 1200px)": {
            "& .MuiGrid-item": {
              flexBasis: "calc(33.33% - 16px)", // 3 group trên hàng tại màn hình trung bình
            },
          },
          "@media (max-width: 900px)": {
            "& .MuiGrid-item": {
              flexBasis: "calc(50% - 16px)", // 2 group trên hàng tại màn hình nhỏ
            },
          },
          "@media (max-width: 600px)": {
            "& .MuiGrid-item": {
              flexBasis: "100%", // 1 group trên hàng tại màn hình rất nhỏ
            },
          },
        }}
      >
        {groups.map((group, index) => (
          <Grid item key={index}>
            <ProductGroup title={group.title} products={group.products} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductSection;
