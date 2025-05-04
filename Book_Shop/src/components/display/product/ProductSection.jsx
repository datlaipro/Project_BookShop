import React, { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import axios from "axios";
import ProductGroup from "./ProductGroup";

const ProductSection = () => {
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:6868/api/product");
        const products = response.data;

        // Chuyển đổi ProductDTO thành định dạng MiniProductCard
        const mappedProducts = products.map((product) => ({
          id: product.id,
          image: product.images?.[0]?.imagePath || "/demo/images/placeholder.png",
          title: product.name,
          author: product.author,
          rating: 5, // Giả lập rating 4-5
          price: product.salePrice || product.price,
          originalPrice: product.salePrice ? product.price : null,
          language: product.language, // Để lọc Featured
          dateAdded: product.dateAdded, // Để sắp xếp Latest items
        }));

        // Tạo các nhóm
        const newGroups = [
          {
            title: "Featured",
            products: mappedProducts
              .filter((product) => product.language === "Tiếng Việt")
              .slice(0, 3), // Lấy 3 sản phẩm
          },
          {
            title: "Latest items",
            products: mappedProducts
              .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
              .slice(0, 3), // Lấy 3 sản phẩm mới nhất
          },
          {
            title: "Best reviewed",
            products: mappedProducts
              .sort((a, b) => b.rating - a.rating)
              .slice(0, 3), // Lấy 3 sản phẩm rating cao (giả lập)
          },
          {
            title: "On sale",
            products: mappedProducts
              .filter((product) => product.originalPrice)
              .slice(0, 3), // Lấy 3 sản phẩm có salePrice
          },
        ];

        setGroups(newGroups);
      } catch (err) {
        setError("Failed to load products. Please try again later.");
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  if (error) {
    return (
      <Box sx={{ py: 4, textAlign: "center" }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (groups.length === 0) {
    return (
      <Box sx={{ py: 4, textAlign: "center" }}>
        <Typography>No products available.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{
      width: "90%",
      // mx: "auto",
    overflow: "hidden",
    py: 4,
    px: 3, // Padding ngang (cách lề trong)
    mx: "auto", // Margin ngang (cách lề ngoài)
    display: "flex", // Sử dụng flexbox
    justifyContent: "center", // Căn giữa theo chiều ngang
    alignItems: "center", // Căn giữa theo chiều dọc
    }}>
      <Grid
        container
        spacing={2}
        sx={{
          maxWidth: "100%",
          mx: "auto",
          display: "flex",
          justifyContent: "center",
          "& .MuiGrid-item": {
            flexBasis: "calc(25% - 16px)",
          },
          "@media (max-width: 1200px)": {
            "& .MuiGrid-item": {
              flexBasis: "calc(33.33% - 16px)",
            },
          },
          "@media (max-width: 900px)": {
            "& .MuiGrid-item": {
              flexBasis: "calc(50% - 16px)",
            },
          },
          "@media (max-width: 600px)": {
            "& .MuiGrid-item": {
              flexBasis: "100%",
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

// // Component gọi đến các group product chứa các card miniproduct
// import React from "react";
// import { Box, Container } from "@mui/material";
// import ProductGroup from "./ProductGroup";
// import Grid from "@mui/material/Grid2";

// const ProductSection = () => {
//   // Dữ liệu các nhóm sản phẩm
//   const groups = [
//     {
//       title: "Featured",
//       products: [
//         { id: "product-1", image: "/demo/images/product-item2.png", title: "Echoes AAAAAAAAAAAAA of the Ancients", author: "Lauren Asher", rating: 5, price: 870, originalPrice: 1200 },
//         { id: "product-2", image: "/demo/images/product-item1.png", title: "The Midnight Garden", author: "Lauren Asher", rating: 4.5, price: 750 },
//         { id: "product-3", image: "/demo/images/product-item3.png", title: "Shadow of the Serpent", author: "Lauren Asher", rating: 4, price: 800 },
//       ],
//     },
//     {
//       title: "Latest items",
//       products: [
//         { id: "product-4", image: "/demo/images/product-item4.png", title: "Whispering Winds", author: "Lauren Asher", rating: 5, price: 870 },
//         { id: "product-5", image: "/demo/images/product-item5.png", title: "The Celestial Tapestry", author: "Lauren Asher", rating: 4.5, price: 780 },
//         { id: "product-6", image: "/demo/images/product-item6.png", title: "Legends of the Lost", author: "Lauren Asher", rating: 4, price: 720 },
//       ],
//     },
//     {
//       title: "Best reviewed",
//       products: [
//         { id: "product-7", image: "/demo/images/product-item7.png", title: "The Timeless Voyage", author: "Lauren Asher", rating: 5, price: 950 },
//         { id: "product-8", image: "/demo/images/product-item8.png", title: "Whispers of Eternity", author: "Lauren Asher", rating: 4.8, price: 820 },
//         { id: "product-9", image: "/demo/images/product-item9.png", title: "Echoes of Tomorrow", author: "Lauren Asher", rating: 4.7, price: 890 },
//       ],
//     },
//     {
//       title: "On sale",
//       products: [
//         { id: "product-10", image: "/demo/images/product-item10.png", title: "Chronicles of the Lost City", author: "Lauren Asher", rating: 4.5, price: 690 },
//         { id: "product-11", image: "/demo/images/product-item11.png", title: "The Starlit Path", author: "Lauren Asher", rating: 4.3, price: 670 },
//         { id: "product-12", image: "/demo/images/product-item12.png", title: "Rays of the Dawn", author: "Lauren Asher", rating: 4.2, price: 640 },
//       ],
//     },
//   ];

//   return (
//     <Box sx={{ width: "100%", overflow: "hidden", py: 4 }}>
//       <Grid
//         container
//         spacing={2}
//         sx={{
//           maxWidth: "100%",
//           mx: "auto",
//           display: 'flex',
//           justifyContent: 'center', // Căn giữa nội dung theo chiều ngang
//           "& .MuiGrid-item": {
//             flexBasis: "calc(25% - 16px)", // Mỗi group chiếm 25% (trừ khoảng cách)
//           },
//           "@media (max-width: 1200px)": {
//             "& .MuiGrid-item": {
//               flexBasis: "calc(33.33% - 16px)", // 3 group trên hàng tại màn hình trung bình
//             },
//           },
//           "@media (max-width: 900px)": {
//             "& .MuiGrid-item": {
//               flexBasis: "calc(50% - 16px)", // 2 group trên hàng tại màn hình nhỏ
//             },
//           },
//           "@media (max-width: 600px)": {
//             "& .MuiGrid-item": {
//               flexBasis: "100%", // 1 group trên hàng tại màn hình rất nhỏ
//             },
//           },
//         }}
//       >
//         {groups.map((group, index) => (
//           <Grid item key={index}>
//             <ProductGroup title={group.title} products={group.products} />
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default ProductSection;