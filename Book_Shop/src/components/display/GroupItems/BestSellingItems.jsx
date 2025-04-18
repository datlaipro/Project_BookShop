import React from 'react';
import ProductSlider from '../product/ProductSlider';
import { Box, Container, Typography, Link, Button } from '@mui/material';

const products = [
  {
    id: 1,
    name: 'House of Sky Breath',
    author: 'Lauren Asher',
    price: 870,
    rating: 5,
    discount: '10% off',
    image: '/demo/images/product-item1.png',
  },
  {
    id: 2,
    name: 'Heartland Stars',
    author: 'Lauren Asher',
    price: 870,
    rating: 5,
    discount: '35% off',
    image: '/demo/images/product-item2.png',
  },
  {
    id: 3,
    name: 'Heavenly Bodies',
    author: 'Lauren Asher',
    price: 870,
    rating: 5,
    discount: '40% off',
    image: '/demo/images/product-item3.png',
  },
  {
    id: 4,
    name: 'AAAAAAAAAAAAAAA AAAAAAAAA',
    author: 'Lauren Asher',
    price: 870,
    rating: 5,
    discount: '50% off',
    image: '/demo/images/product-item3.png',
  },
  // Add more products here
];

const BestSellingItems = () => {
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
            // maxWidth: '80%',
            paddingLeft: { xs: '100px', sm: '100px', lg: '150px' }, // Điều chỉnh khoảng cách tùy theo màn hình
            paddingRight: { xs: '100px', sm: '100px', lg: '150px' },
          }}
        >
          <Typography 
            variant="h5" 
            component="h3" 
            sx={{ fontSize: '2.5rem' }}
            // sx={{ fontWeight: 'bold' }}
          >
            Best selling items
          </Typography>
          <Button 
            href="/shop" 
            variant="contained" 
            sx={{ 
              backgroundColor: '#F86D72', 
              color: '#FFFFFF', 
              fontSize: '0.875rem', 
              borderRadius: "30px", /* Bo tròn 4 góc */
              fontWeight: '500', 
              textTransform: 'none', 
              textAlign: 'center', /* Căn giữa chữ */
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

