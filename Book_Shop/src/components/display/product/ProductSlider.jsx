import React from 'react';
import Slider from 'react-slick';
import ProductCard from './ProductCard';
import { styled } from '@mui/system';
import { ArrowForward, ArrowBack } from '@mui/icons-material';
import { Box } from "@mui/material";


// Đảm bảo slider container có chiều rộng 100% và căn chỉnh hợp lý
const SliderContainer = styled('div')({
  padding: '0 20px', // Cách lề trái phải 20px để tạo không gian cho các nút điều hướng
  position: 'relative', // Để dễ dàng căn chỉnh các nút điều hướng
  maxWidth: '85%', // Chiều rộng tối đa trên thiết bị lớn
  margin: '0 auto', // Căn giữa slider container
  '@media (max-width: 800px)': {
    maxWidth: '80%', // Chiều rộng tối đa trên thiết bị nhỏ
  },
  '& .slick-list': {
    margin: '0 -5px', // Đảm bảo khoảng cách cố định giữa các card
  },
  '& .slick-slide': {
    padding: '0 5px', // Mỗi bên 5px tạo khoảng cách 10px giữa các slide
    height: '450px !important', // Cố định chiều cao cho mỗi slide
    display: 'flex',
    justifyContent: 'center', // Căn giữa nội dung slide theo chiều ngang
    alignItems: 'center', // Căn giữa nội dung slide theo chiều dọc
  },
  '& .slick-track': {
    height: '480px !important', // Cố định chiều cao cho slick-track
    display: 'flex', // Đảm bảo các slide hiển thị theo hàng ngang
    alignItems: 'center', // Căn giữa nội dung nếu cần
  },
  '& .slick-prev, & .slick-next': {
    zIndex: 1, // Hiển thị nút điều hướng trên cùng
    color: 'black', // Màu chữ cho nút điều hướng
    borderRadius: '50%', // Bo tròn nút điều hướng
    width: '40px',
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: '50%', // Đặt nút giữa chiều cao của slider
    transform: 'translateY(-50%)', // Căn giữa theo chiều dọc
    background: 'none', // Không có nền
    border: 'none', // Không có viền
    cursor: 'pointer', // Con trỏ chuột thay đổi khi hover
  },
  '& .slick-prev': {
    left: '-50px', // Khoảng cách 50px từ card bên trái
    '@media (max-width: 600px)': {
        left: '-20px', // Khi dưới 600px thì phím cách card 20
      },
  },
  '& .slick-next': {
    right: '-50px', // Khoảng cách 50px từ card bên phải
    '@media (max-width: 600px)': {
        right: '-20px', // Khi dưới 600px thì phím cách card 20
      },
  },
});
// Đoạn này ko cần thiết hoặc có thể thay bằng Box từ Material UI
const ProductCardWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center', // Căn giữa mỗi card theo chiều ngang
  alignItems: 'center', // Căn giữa mỗi card theo chiều dọc
  flexDirection: 'column', // Đảm bảo các phần tử card sắp xếp theo cột
  // width: '100%', // Đảm bảo card chiếm 100% chiều rộng của slide
  maxWidth: '220px', // Đặt chiều rộng tối đa cho card
  height: 'auto', // Cho phép chiều cao tự động thay đổi theo nội dung
  // maxHeight: '420px', // Đảm bảo chiều cao tối đa cho card
//   '@media (max-width: 1224px)': {
//     maxWidth: '200px', // Giảm chiều rộng card khi màn hình nhỏ hơn 1024px
//   },
//   '@media (max-width: 600px)': {
//     maxWidth: '180px', // Giảm chiều rộng card khi màn hình nhỏ hơn 600px
//   },
//   '@media (max-width: 480px)': {
//     maxWidth: '160px', // Giảm chiều rộng card khi màn hình nhỏ hơn 480px
//   },
});

const ProductSlider = ({ products }) => {
  const settings = {
    maxHeight: 420,
    dots: false, // Ẩn chấm tròn
    infinite: true, // Lặp vô hạn
    speed: 500,
    slidesToShow: 4, // SỐ LƯỢNG CARD ĐƯỢC HIỂN THỊ
    slidesToScroll: 1,
    nextArrow: (
      <button className="slick-next">
        <ArrowForward style={{ fontSize: '30px', color: 'black' }} />
      </button>
    ),
    prevArrow: (
      <button className="slick-prev">
        <ArrowBack style={{ fontSize: '30px', color: 'black' }} />
      </button>
    ),
    responsive: [
      { breakpoint: 1268, settings: { slidesToShow: 3 } },  // SỐ LƯỢNG CARD ĐƯỢC HIỂN THỊ
      { breakpoint: 1024, settings: { slidesToShow: 2 } },  // KHI KÍCH THƯỚC MÀN HÌNH XUỐNG DƯỚI 1024PX
      { breakpoint: 700, settings: { slidesToShow: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <SliderContainer>
      <Slider {...settings}>
        {products.map((product) => (
          <ProductCardWrapper key={product.id}>
            <ProductCard product={product} />
          </ProductCardWrapper>
        ))}
      </Slider>
    </SliderContainer>
  );
};

export default ProductSlider;
