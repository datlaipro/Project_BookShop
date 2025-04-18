import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Collapse,
  Rating,
} from '@mui/material';

// Dữ liệu mẫu
const users = [
  { id: 1, name: 'Nguyễn Văn A' },
  { id: 2, name: 'Trần Thị B' },
];

const products = [
  { id: 1, name: 'Áo thun' },
  { id: 2, name: 'Quần jeans' },
  { id: 3, name: 'Giày thể thao' },
];

const orders = [
  {
    id: 1,
    userId: 1,
    products: [
      { productId: 1, quantity: 2 },
      { productId: 2, quantity: 1 },
    ],
  },
  {
    id: 2,
    userId: 2,
    products: [{ productId: 3, quantity: 1 }],
  },
];

const reviews = [
  {
    id: 1,
    comment: 'Sản phẩm rất tốt!',
    dateReview: '2025-03-15',
    rating: 4,
    orderId: 1,
    userId: 1,
  },
  {
    id: 2,
    comment: 'Chất lượng ổn, giao hàng nhanh.',
    dateReview: '2025-03-20',
    rating: 5,
    orderId: 2,
    userId: 2,
  },
];

function ReviewList() {
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState(null); // State để theo dõi dòng đang mở rộng

  const handleEditReview = (reviewId) => {
    navigate(`/admin/edit-review/${reviewId}`);
  };

  const handleDeleteReview = (reviewId) => {
    console.log(`Xóa review với ID: ${reviewId}`);
    // Gọi API để xóa review tại đây
  };

  const handleAddReview = () => {
    navigate('/admin/add-review');
  };

  const handleRowClick = (id) => {
    setExpandedId(expandedId === id ? null : id); // Mở rộng hoặc thu gọn khi nhấp
  };

  // Lấy tên khách hàng từ userId
  const getUserName = (userId) => {
    const user = users.find((u) => u.id === userId);
    return user ? user.name : 'Không xác định';
  };

  // Lấy thông tin sản phẩm từ orderId
  const getOrderProducts = (orderId) => {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return [];
    return order.products.map((item) => ({
      productId: item.productId,
      name: products.find((p) => p.id === item.productId)?.name || 'Không xác định',
    }));
  };

  return (
    <Box sx={{ mt: 8 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5">Danh sách đánh giá</Typography>
        <Button variant="contained" color="primary" onClick={handleAddReview}>
          Thêm Review
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="review table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Order ID</TableCell>
              <TableCell>Tên khách hàng</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reviews.map((review) => (
              <React.Fragment key={review.id}>
                <TableRow
                  onClick={() => handleRowClick(review.id)}
                  sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#f5f5f5' } }}
                >
                  <TableCell>{review.id}</TableCell>
                  <TableCell>{review.orderId}</TableCell>
                  <TableCell>{getUserName(review.userId)}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation(); // Ngăn sự kiện click row
                        handleEditReview(review.id);
                      }}
                      sx={{ mr: 1 }}
                    >
                      Sửa
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation(); // Ngăn sự kiện click row
                        handleDeleteReview(review.id);
                      }}
                    >
                      Xóa
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
                    <Collapse in={expandedId === review.id} timeout="auto" unmountOnExit>
                      <Box sx={{ margin: 1 }}>
                        <Typography variant="subtitle1" gutterBottom>
                          Chi tiết đánh giá
                        </Typography>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>ID sản phẩm</TableCell>
                              <TableCell>Tên sản phẩm</TableCell>
                              <TableCell>Điểm đánh giá</TableCell>
                              <TableCell>Nội dung đánh giá</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {getOrderProducts(review.orderId).map((item) => (
                              <TableRow key={item.productId}>
                                <TableCell>{item.productId}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>
                                  <Rating value={review.rating} readOnly precision={1} />
                                </TableCell>
                                <TableCell>{review.comment}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ReviewList;