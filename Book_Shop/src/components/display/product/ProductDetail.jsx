// import React from "react";
// import GalleryProduct from './GalleryProduct'; // Component ảnh sp
// import { Box, Typography, Button, Stack } from "@mui/material";
// import BreadcrumbsComponent from '../free/BreadcrumbsComponent';
// import LatestPosts from "../post/LatestPosts";
// import InstagramGallery from "../GroupItems/InstagramGallery";
// import InfoProduct from "./InfoProduct";
// import StarIcon from '@mui/icons-material/Star';

// const ProductDetail = () => {
//   const product = {
//     title: "The Emerald Crown ABCDEFGHYJKMLOLKJHGRTYI",
//     price: 200,
//     oldPrice: 260,
//     description: "Justo, cum feugiat imperdiet nulla molestie, Ông Trump và ông Zelensky bắt đầu cuộc trò chuyện bằng những lời chào hỏi xã giao thông thường, trong không khí được đánh giá là cởi mở và thân thiện. Tổng thống Mỹ trước đó nói rằng thỏa thuận khoáng sản sắp ký sẽ là điều tuyệt vời cho Ukraine",
//     stock: 2,
//     rating: 4,
//     images: [
//       "/demo/images/product-large-1.png",
//       "/demo/images/product-large-2.png",
//       "/demo/images/product-large-3.png",
//       "/demo/images/product-large-3.png",
//       "/demo/images/product-large-3.png",
//       "/demo/images/product-thumbnail-1.png",
//       "/demo/images/product-thumbnail-2.png",
//       "/demo/images/product-thumbnail-3.png",
//       "/demo/images/product-thumbnail-3.png",
//       "/demo/images/product-thumbnail-3.png",
//     ],
//   };

//   const truncateTitle = (title, maxLength) => {
//     return title.length > maxLength ? title.substring(0, maxLength) + "..." : title;
//   };
//   const truncateDescription = (description, maxLength2) => {
//     return description.length > maxLength2 ? description.substring(0, maxLength2) + "..." : description;
//   };
//   // Hàm này ràng buộc tên sản phẩm hiển thị không quá số lượng ký tự maxLength
//   // Nếu quá sẽ thay bằng dấu ... (tránh hiện tượng tràn bố cục)

//   return (
//     <>
//       <BreadcrumbsComponent
//         title="Detail"
//         breadcrumbs={[
//           { label: "Home", href: "/" },
//           { label: "ProductDetail" },
//           { label: "ProductDetail" } // Không có href → là trang hiện tại
//         ]}
//       />
//       <Box sx={{ display: "flex", justifyContent: "center", gap: 4, padding: 6 }}>
//         {/* Gallery bên trái */}
//         <Box sx={{ width: "60%", maxWidth: "50%" }}>
//           <GalleryProduct images={product.images} />
//         </Box>

//         {/* Thông tin sản phẩm bên phải */}
//         <Box sx={{ width: "40%" }}>
//           <Typography variant="h1" gutterBottom>{truncateTitle(product.title, 20)}</Typography>
//           <Typography variant="h4" color="#F86D72">
//             ${product.price} <del style={{ color: "gray" }}>${product.oldPrice}</del>
//           </Typography>
//           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//             {Array.from({ length: product.rating }, (_, index) => (
//               <StarIcon key={index} sx={{ color: 'gold', fontSize: 26, fontWeight: 'bold' }} />
//             ))}
//           </Box>
//           <Typography variant="h5" sx={{ mt: 2 }}>{truncateDescription(product.description, 200)}</Typography>
//           <Typography variant="h6" sx={{ mt: 1 }}>Stock: {product.stock}</Typography>

//           {/* Nút thao tác */}
//           <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
//             <Button 
//               variant="contained" 
//               sx={{ 
//                 width: 250, 
//                 height: 80, 
//                 backgroundColor: '#F86D72', 
//                 fontWeight: 'bold',
//                 color: 'white', 
//                 fontSize: '20px', 
//                 borderRadius: 20, 
//                 '&:hover': {
//                   backgroundColor: '#183e3e',
//                 }
//               }}
//             >
//               Order Now
//             </Button>
//             <Button 
//               variant="contained" 
//               sx={{ 
//                 width: 250, 
//                 height: 80, 
//                 backgroundColor: '#183e3e', 
//                 fontWeight: 'bold',
//                 color: 'white', 
//                 fontSize: '20px', 
//                 borderRadius: 20, 
//                 '&:hover': {
//                   backgroundColor: '#F86D72',
//                 }
//               }}  
//             >
//               Add To Cart
//             </Button> 
//           </Stack>
//         </Box>
//       </Box>
//       <InfoProduct />
//       <LatestPosts />
//       <InstagramGallery />
//     </>
//   );
// };

// export default ProductDetail;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Stack, CircularProgress } from '@mui/material';
import BreadcrumbsComponent from '../free/BreadcrumbsComponent';
import LatestPosts from '../post/LatestPosts';
import InstagramGallery from '../GroupItems/InstagramGallery';
import InfoProduct from './InfoProduct';
import GalleryProduct from './GalleryProduct';
import StarIcon from '@mui/icons-material/Star';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`http://localhost:6868/api/product/${id}/detail`)
      .then((res) => {
        if (!res.ok) throw new Error('Không tìm thấy sản phẩm');
        return res.json();
      })
      .then((data) => {
        setProduct({
          id: data.id,
          title: data.name,
          price: data.salePrice || data.price,
          oldPrice: data.salePrice ? data.price : null,
          description: data.description,
          stock: data.quantity,
          rating: Math.round(data.rating), // Chuyển Float thành số nguyên cho sao
          images: data.images.length > 0 ? data.images : ['/demo/images/placeholder.png'],
          discountPercentage: data.discountPercentage,
        });
        setLoading(false);
      })
      .catch((err) => {
        setError('Lỗi khi tải sản phẩm');
        setLoading(false);
        console.error('Error:', err);
      });
  }, [id]);

  const truncateTitle = (title, maxLength) => {
    return title && title.length > maxLength ? title.substring(0, maxLength) + '...' : title;
  };

  const truncateDescription = (description, maxLength) => {
    return description && description.length > maxLength
      ? description.substring(0, maxLength) + '...'
      : description;
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !product) {
    return (
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography color="error">{error || 'Không tìm thấy sản phẩm'}</Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/')}
          sx={{ mt: 2, borderRadius: '8px', textTransform: 'none' }}
        >
          Về trang chủ
        </Button>
      </Box>
    );
  }

  return (
    <>
      <BreadcrumbsComponent
        title="Detail"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'ProductDetail' },
          { label: truncateTitle(product.title, 20) },
        ]}
      />
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, padding: 6 }}>
        {/* Gallery bên trái */}
        <Box sx={{ width: '60%', maxWidth: '50%' }}>
          <GalleryProduct images={product.images} />
        </Box>

        {/* Thông tin sản phẩm bên phải */}
        <Box sx={{ width: '40%' }}>
          <Typography variant="h1" gutterBottom>
            {truncateTitle(product.title, 20)}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h4" color="#F86D72">
              {product.price.toLocaleString('vi-VN')} VNĐ
            </Typography>
            {product.oldPrice && (
              <Typography variant="h4" component="del" sx={{ color: 'gray' }}>
                {product.oldPrice.toLocaleString('vi-VN')} VNĐ
              </Typography>
            )}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            {Array.from({ length: product.rating }, (_, index) => (
              <StarIcon
                key={index}
                sx={{ color: 'gold', fontSize: 26, fontWeight: 'bold' }}
              />
            ))}
          </Box>
          <Typography variant="h5" sx={{ mt: 2 }}>
            {truncateDescription(product.description, 200)}
          </Typography>
          <Typography variant="h6" sx={{ mt: 1 }}>
            Stock: {product.stock}
          </Typography>

          {/* Nút thao tác */}
          <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
            <Button
              variant="contained"
              sx={{
                width: 250,
                height: 80,
                backgroundColor: '#F86D72',
                fontWeight: 'bold',
                color: 'white',
                fontSize: '20px',
                borderRadius: 20,
                '&:hover': {
                  backgroundColor: '#183e3e',
                },
              }}
            >
              Order Now
            </Button>
            <Button
              variant="contained"
              sx={{
                width: 250,
                height: 80,
                backgroundColor: '#183e3e',
                fontWeight: 'bold',
                color: 'white',
                fontSize: '20px',
                borderRadius: 20,
                '&:hover': {
                  backgroundColor: '#F86D72',
                },
              }}
            >
              Add To Cart
            </Button>
          </Stack>
        </Box>
      </Box>
      <InfoProduct />
      <LatestPosts />
      <InstagramGallery />
    </>
  );
};

export default ProductDetail;