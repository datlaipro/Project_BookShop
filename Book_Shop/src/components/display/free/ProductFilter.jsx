import React from 'react';
import { Box, Typography, Select, MenuItem } from '@mui/material';

const ProductFilter = ({ filters, onFilterChange, productCount }) => {
  const handleSortChange = (event) => {
    onFilterChange({ sort: event.target.value });
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{ marginBottom: '2rem' }}
    >
      <Typography>
        Showing {productCount} {productCount === 1 ? 'result' : 'results'}
      </Typography>
      <Select
        value={filters.sort}
        onChange={handleSortChange}
        displayEmpty
        sx={{ minWidth: 200 }}
      >
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
// CÁC TRẠNG THÁI LỌC
// 1 name-asc: Sắp xếp theo name (A-Z).
// 2  name-desc: Sắp xếp theo name (Z-A).
// 3  price-asc: Sắp xếp theo salePrice (hoặc price) từ thấp đến cao.
// 4  price-desc: Sắp xếp theo salePrice (hoặc price) từ cao đến thấp.
// 5  rating-highest: Sắp xếp theo rating từ cao đến thấp.
// 6  rating-lowest: Sắp xếp theo rating từ thấp đến cao.
// 7  Mặc định: Không sắp xếp (giữ thứ tự từ API) 