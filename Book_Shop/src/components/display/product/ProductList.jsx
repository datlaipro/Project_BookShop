import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography, CircularProgress } from '@mui/material';
import ProductCard from './ProductCard';
import PaginationComponent from '../free/PaginationComponent';

const ProductList = ({ filters }) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(8); // Số sản phẩm mỗi trang
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:6868/api/product')
      .then((res) => {
        if (!res.ok) throw new Error('Không thể tải danh sách sản phẩm');
        return res.json();
      })
      .then((data) => {
        const mappedProducts = data.map((product) => ({
          id: product.id,
          name: product.name,
          author: product.author,
          image: product.images?.[0]?.imagePath || '/demo/images/placeholder.png',
          discount: product.discountPercentage ? `${product.discountPercentage}% OFF` : null,
          price: product.price,
          salePrice: product.salePrice || null,
          rating: 4, // Giả lập, chờ EntityRating
          category: product.category,
          language: product.language,
          description: product.description,
        }));
        setProducts(mappedProducts);
        setLoading(false);
      })
      .catch((err) => {
        setError('Lỗi khi tải sản phẩm');
        setLoading(false);
        console.error('Error:', err);
      });
  }, []);

  // Áp dụng bộ lọc
  const filteredProducts = products
    .filter((product) => {
      // Tìm kiếm
      const search = filters.searchQuery.toLowerCase();
      const matchesSearch = !search || 
        product.name.toLowerCase().includes(search) || 
        product.description.toLowerCase().includes(search);

      // Danh mục
      const matchesCategory = !filters.category || product.category === filters.category;

      // Ngôn ngữ
      const matchesLanguage = !filters.language || product.language === filters.language;

      // Giá (chuyển $ sang VNĐ: $1 ≈ 25000 VNĐ)
      const price = product.salePrice || product.price;
      let matchesPrice = true;
      if (filters.priceRange) {
        const [min, max] = filters.priceRange.split('-').map(Number);
        const minVND = min * 25000;
        const maxVND = max ? max * 25000 : Infinity;
        matchesPrice = price >= minVND && price < maxVND;
      }

      return matchesSearch && matchesCategory && matchesLanguage && matchesPrice;
    })
    // Sắp xếp
    .sort((a, b) => {
      switch (filters.sort) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'price-asc':
          return (a.salePrice || a.price) - (b.salePrice || b.price);
        case 'price-desc':
          return (b.salePrice || b.price) - (a.salePrice || a.price);
        case 'rating-highest':
          return b.rating - a.rating;
        case 'rating-lowest':
          return a.rating - b.rating;
        default:
          return 0;
      }
    });

  // Đặt lại trang khi bộ lọc thay đổi
  useEffect(() => {
    setPage(0);
  }, [filters]);

  const totalPages = Math.ceil(filteredProducts.length / size);
  const displayedProducts = filteredProducts.slice(page * size, (page + 1) * size);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography>Không tìm thấy sản phẩm</Typography>
      </Box>
    );
  }

  return (
    <>
      <Grid container spacing={2}>
        {displayedProducts.map((product) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={product.id}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
      <PaginationComponent
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default ProductList;