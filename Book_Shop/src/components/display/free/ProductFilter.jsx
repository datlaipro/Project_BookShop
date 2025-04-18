import React from "react";
import { Box, Typography, Select, MenuItem } from "@mui/material";

const ProductFilter = () => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{ marginBottom: "2rem" }}
    >
      <Typography>Showing 1–9 of 55 results</Typography>
      <Select defaultValue="" displayEmpty>
        <MenuItem value="">Default sorting</MenuItem>
        <MenuItem value="name-asc">Name (A - Z)</MenuItem>
        <MenuItem value="name-desc">Name (Z - A)</MenuItem>
        <MenuItem value="price-asc">Price (Low-High)</MenuItem>
        <MenuItem value="price-desc">Price (High-Low)</MenuItem>
        <MenuItem value="rating-highest">Rating (Highest)</MenuItem>
        <MenuItem value="rating-lowest">Rating (Lowest)</MenuItem>
      </Select>
    </Box>
  );
};

export default ProductFilter;
