// import React from 'react';
// import { Grid } from '@mui/material';
// import ProductCard from './ProductCard'; // Đường dẫn tới ProductCard

// const ProductList = () => {
//   // Dữ liệu mẫu (Bạn có thể thay thế bằng dữ liệu từ API hoặc props)
//   const products = [
//     {
//       id: 1,
//       name: 'Product 1',
//       author: 'Author 1',
//       image: '/demo/images/product-item1.png',
//       discount: '10% OFF',
//       price: 20.99,
//       rating: 4,
//     },
//     {
//       id: 2,
//       name: 'Product 2',
//       author: 'Author 2',
//       image: '/demo/images/product-item1.png',
//       discount: '15% OFF',
//       price: 15.49,
//       rating: 5,
//     },
//     {
//       id: 3,
//       name: 'Product 3',
//       author: 'Author 3',
//       image: '/demo/images/product-item1.png',
//       discount: null, // Không có giảm giá
//       price: 30.0,
//       rating: 3,
//     },
//     {
//       id: 4,
//       name: 'Product 3',
//       author: 'Author 3',
//       image: '/demo/images/product-item1.png',
//       discount: null, // Không có giảm giá
//       price: 30.0,
//       rating: 3,
//     },
//     {
//       id: 5,
//       name: 'Product 3',
//       author: 'Author 3',
//       image: '/demo/images/product-item1.png',
//       discount: null, // Không có giảm giá
//       price: 30.0,
//       rating: 3,
//     },
//   ];

//   return (
//     <Grid container spacing={2}>
//       {products.map((product) => (
//         <Grid item xs={12} sm={6} md={3} key={product.id}>
//           <ProductCard product={product} />
//         </Grid>
//       ))}
//     </Grid>
//   );
// };

// export default ProductList;

import React from 'react';
import { Grid, Box } from '@mui/material';
import ProductCard from './ProductCard'; 
import { Height } from '@mui/icons-material';


const ProductList = () => {
// Dữ liệu mẫu (Có thể thay thế bằng dữ liệu từ API hoặc props)
  const products = [
    { id: 1, name: 'Product 1', author: 'Author 1', image: '/demo/images/product-item1.png', discount: '10% OFF', price: 20.99, rating: 4 },
    { id: 2, name: 'Product 2', author: 'Author 2', image: '/demo/images/product-item1.png', discount: '15% OFF', price: 15.49, rating: 5 },
    { id: 3, name: 'Product 3', author: 'Author 3', image: '/demo/images/product-item1.png', discount: null, price: 30.0, rating: 3 },
    { id: 4, name: 'Product 4', author: 'Author 4', image: '/demo/images/product-item1.png', discount: '20% OFF', price: 25.99, rating: 4 },
    { id: 5, name: 'Product 5', author: 'Author 5', image: '/demo/images/product-item1.png', discount: null, price: 18.99, rating: 3 },
    { id: 1, name: 'Product 1', author: 'Author 1', image: '/demo/images/product-item1.png', discount: '10% OFF', price: 20.99, rating: 4 },
    { id: 2, name: 'Product 2', author: 'Author 2', image: '/demo/images/product-item1.png', discount: '15% OFF', price: 15.49, rating: 5 },
    { id: 3, name: 'Product 3', author: 'Author 3', image: '/demo/images/product-item1.png', discount: null, price: 30.0, rating: 3 },
  ];

  return (
    <Grid container spacing={2}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id} sx={{ display: "flex", justifyContent: "center" }}> {/* Thêm sx để canh chỉnh card */}
            <ProductCard product={product}/>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;

