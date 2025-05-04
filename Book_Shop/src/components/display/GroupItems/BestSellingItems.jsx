import React, { useState, useEffect } from 'react';
import ProductSlider from '../product/ProductSlider';
import { Box, Container, Typography, Button } from '@mui/material';
import axios from 'axios';

const BestSellingItems = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:6868/api/product');
        const data = response.data;

        // Chuyển đổi ProductDTO thành định dạng ProductSlider
        const mappedProducts = data.map((product) => ({
          id: product.id,
          name: product.name,
          author: product.author,
          price: product.price,
          salePrice: product.salePrice || product.price, // VNĐ
          rating: 5, // Dữ liệu mẫu
          discount: product.discountPercentage ? `${product.discountPercentage}% off` : null,
          image: product.images?.[0]?.imagePath || '/demo/images/placeholder.png',
          // salePrice: product.salePrice || null, // Lưu salePrice để dùng trong Cart
        }));

        // Lấy tối đa 8 sản phẩm
        setProducts(mappedProducts.slice(0, 8));
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  if (error) {
    return (
      <Box sx={{ py: 4, textAlign: 'center' }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (products.length === 0) {
    return (
      <Box sx={{ py: 4, textAlign: 'center' }}>
        <Typography>No products available.</Typography>
      </Box>
    );
  }

  return (
    <Box 
      component="section" 
      id="best-selling-items" 
      sx={{ padding: '2rem 0', maxWidth: '100%' }}
    >
      <Container maxWidth="100%">
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '1rem',
            paddingLeft: { xs: '100px', sm: '100px', lg: '150px' },
            paddingRight: { xs: '100px', sm: '100px', lg: '150px' },
          }}
        >
          <Typography 
            variant="h5" 
            component="h3" 
            sx={{ fontSize: '2.5rem' }}
          >
            Featured Products
          </Typography>
          <Button 
            href="/shop" 
            variant="contained" 
            sx={{ 
              backgroundColor: '#F86D72', 
              color: '#FFFFFF', 
              fontSize: '0.875rem', 
              borderRadius: '30px',
              fontWeight: '500', 
              textTransform: 'none', 
              textAlign: 'center',
              '&:hover': { backgroundColor: '#D85A60' } 
            }}
          >
            View All
          </Button>
        </Box>
        <ProductSlider products={products} />
      </Container>
    </Box>
  );
};

export default BestSellingItems;