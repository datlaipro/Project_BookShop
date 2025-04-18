// components/ProductGroup.jsx
import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import MiniProductCard from "./MiniProductCard";

const ProductGroup = ({ title, products }) => {
  return (
    <Box 
    sx={{ 
        mb: 4,
        border: "1px solid #ddd", // (Tuỳ chọn) Thêm viền nhạt để phân biệt
        borderRadius: 3, // (Tuỳ chọn) Tạo bo góc nếu cần
        p: 1, // Padding 1
        }}>
      <Typography variant="h4"
      sx={{
        mb: 2, 
        marginBottom: 5, 
        marginTop: 2,
        marginLeft: 2,

      }}>
        {title}
      </Typography>
      {products.map((product, index) => (
        // <MiniProductCard key={index} {...product} />
        <React.Fragment key={index}> <MiniProductCard {...product} /> 
        {index < products.length - 1 && <Divider sx={{ my: 2 }} />} {/* Thêm 1 dòng kẻ giữa 2 card */} 
        </React.Fragment>
      ))}
    </Box>
  );
};

export default ProductGroup;
