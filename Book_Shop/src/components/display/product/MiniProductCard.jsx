// components/MiniProductCard.jsx
import React from "react";
import { Card, CardMedia, CardContent, Typography, Box, Rating } from "@mui/material";
import CardActions from '../../action/CardActions';

const MiniProductCard = ({ image, title, author, rating, price, originalPrice }) => {
  return (
    <Card
      sx={{
        position: "relative", // PHẢI CÓ CÁI NÀY MỚI HIỂN THỊ ĐC CARD ACTIONS
        display: "flex",
        mb: 2,
        boxShadow: "none", // Tắt bóng đổ
        // border: "1px solid #ddd", // (Tuỳ chọn) Thêm viền nhạt để phân biệt
        // borderRadius: "8px", // (Tuỳ chọn) Tạo bo góc nếu cần 
        width: 350,  // Kích thước chiều rộng của card
        height: 150, // Kích thước chiều cao của card
        // Hiển thị CardActions khi hover
        overflow: 'hidden',
        '&:hover .card-actions': {
          opacity: '1 !important', // Hiển thị CardActions khi hover
        },
      }}>

      {/* Các nút hành động CardActions */}
      <CardActions
        className="card-actions" // Đặt tên class để truyền vào CSS selectors
        sx={{
          position: 'absolute',
          top: '85%',
          left: '85%',
          transform: 'translate(-50%, -50%)', // Căn giữa
          opacity: 0, // Ẩn mặc định
          transition: 'opacity 0.3s ease', // Hiệu ứng mượt mà
          zIndex: 1,
        }}
      />

      <CardMedia
        component="img"
        sx={{
          width: 100, // Đặt kích thước chiều rộng
          height: "auto", // Đặt kích thước chiều cao
          margin: "5px", // Tạo khoảng cách lề giữa ảnh và card
          objectFit: "contain", // Đảm bảo ảnh nằm gọn trong khung mà không bị cắt
          borderRadius: "4px", // Thêm đường bo góc (tùy chọn nếu thấy đẹp)
        }}
        image={image}
        alt={title}

      />
      <CardContent sx={{ flex: "1" }}>
        <Typography variant="h6" component="div"
          //  component="div" thực tế ko cần sử dụng ???
          sx={{
            fontWeight: 'bold',
            whiteSpace: 'nowrap', // Không xuống dòng
            overflow: 'hidden',  // Ẩn phần chữ tràn
            textOverflow: 'ellipsis', // Hiển thị dấu "..."
            maxWidth: "220px", // Chiều rộng tối đa của tiêu đề (Bắt buộc)
            flex: 1, // Chiếm toàn bộ không gian còn lại trong bố cục
          }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {author}
        </Typography>
        <Box display="flex" alignItems="center" gap={1} mt={1}>
          <Rating value={rating} precision={0.5} readOnly size="small" />
          <Typography variant="body2" color="text.secondary">
            ({rating})
          </Typography>
        </Box>

        {/* <Box mt={1} > // 2 giá chia 2 dòng khác nhau */}
        <Box mt={1} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          {originalPrice && (
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ textDecoration: "line-through", mr: 1 }}
            >
              ${originalPrice}
            </Typography>
          )}
          {/* <Typography variant="body1" color="primary" fontWeight="bold"> */}
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#F86D72', }}>

            ${price}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MiniProductCard;
