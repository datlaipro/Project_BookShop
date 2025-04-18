// TODO
// API: Fetch dữ liệu từ /api/orders, /api/users, /api/products và gửi dữ liệu qua POST/PUT.
// Rating riêng lẻ: Nếu muốn mỗi sản phẩm có rating và comment riêng trong cơ sở dữ liệu, cần điều chỉnh cấu trúc dữ liệu reviews.
// rating riêng cho từng sản phẩm (CÁI NÀY QUAN TRỌN, CẦN THAY ĐỔI CẢ CSDL, NẾU KO PHẢI LOGIC CHON ĐÁNH GIÁ Ở 1 Ô THÌ TẤT CẢ CÁC Ô KHÁC ĂN THEO)
// Xác nhận: Thêm dialog xác nhận trước khi submit.
// xử lý COMMENT ĐÁNH GIÁ CHUNG TƯƠNG TỰ RATING

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  Rating,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

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

function AddReview() {
  const navigate = useNavigate();

  // State cho ngày đánh giá
  const [dateReview, setDateReview] = useState('');
  const [error, setError] = useState('');

  // State cho đơn hàng và sản phẩm đã chọn
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [sharedRating, setSharedRating] = useState(0); // Rating chung cho tất cả sản phẩm

  // Xử lý thay đổi ngày
  const handleDateChange = (e) => {
    setDateReview(e.target.value);
    setError('');
  };

  // Xử lý khi chọn đơn hàng từ Autocomplete
  const handleOrderChange = (event, newValue) => {
    setSelectedOrder(newValue);
    if (newValue) {
      const orderProducts = orders
        .find((o) => o.id === newValue.id)
        .products.map((item) => ({
          productId: item.productId,
          name: products.find((p) => p.id === item.productId)?.name || 'Không xác định',
          rating: sharedRating, // Sử dụng rating chung
          comment: '',
        }));
      setSelectedProducts(orderProducts);
    } else {
      setSelectedProducts([]);
      setSharedRating(0); // Reset rating khi không có đơn hàng
    }
  };

// Xử lý thay đổi rating (chung cho tất cả sản phẩm)
const handleRatingChange = (newValue) => {
    setSharedRating(newValue);
    setSelectedProducts((prev) =>
      prev.map((product) => ({ ...product, rating: newValue }))
    );
  };

  // Xử lý thay đổi comment cho từng sản phẩm
  const handleCommentChange = (productId, value) => {
    setSelectedProducts((prev) =>
      prev.map((product) =>
        product.productId === productId ? { ...product, comment: value } : product
      )
    );
  };

  // Kiểm tra dữ liệu hợp lệ
  const isValid = () => {
    if (!dateReview || !selectedOrder || sharedRating === 0) return false;
    return selectedProducts.every((p) => p.comment.trim() !== '');
  };

  // Xử lý submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValid()) {
      setError('Vui lòng điền đầy đủ ngày, đơn hàng, điểm đánh giá và bình luận');
      return;
    }

    const reviewData = {
      dateReview,
      orderId: selectedOrder.id,
      userId: orders.find((o) => o.id === selectedOrder.id).userId,
      rating: sharedRating, // Rating chung
      products: selectedProducts.map(({ productId, comment }) => ({
        productId,
        comment,
      })),
    };
    console.log('Thêm review:', reviewData);
    navigate('/admin/reviews');
  };

  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant="h5" gutterBottom>
        Thêm đánh giá mới
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Box component="form" onSubmit={handleSubmit}>
          {/* Khu vực chọn ngày */}
          {/* <Box sx={{ mb: 3 }}>
            <TextField
              label="Ngày đánh giá"
              name="dateReview"
              type="date"
              value={dateReview}
              onChange={handleDateChange}
              InputLabelProps={{ shrink: true }}
              required
              fullWidth
            />
          </Box> */}
          <Box>
            <TextField
              label="ĐỔI CHỖ NÀY THÀNH GHI CHÚ GÌ ĐÓ NHÉ, BỎ TEXTFIELD ĐI"
              fullWidth

              />
          </Box>

          {/* Hiển thị lỗi nếu có */}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

       {/* Ô chọn đơn hàng */}
       <Autocomplete
            options={orders}
            getOptionLabel={(option) => {
              const user = users.find((u) => u.id === option.userId);
              return `${option.id} - Khách hàng: ${user ? user.name : 'Không xác định'}`;
            }}
            onChange={handleOrderChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Chọn đơn hàng"
                placeholder="Gõ ID đơn hàng"
                margin="normal"
              />
            )}
            fullWidth
          />

          {/* Bảng sản phẩm đã chọn */}
          {selectedProducts.length > 0 && (
            <TableContainer sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID sản phẩm</TableCell>
                    <TableCell>Tên sản phẩm</TableCell>
                    <TableCell>Điểm đánh giá</TableCell>
                    <TableCell>Bình luận</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedProducts.map((product) => (
                    <TableRow key={product.productId}>
                      <TableCell>{product.productId}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>
                        <Rating
                          value={sharedRating}
                          onChange={(e, newValue) => handleRatingChange(newValue)}
                          precision={1}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          value={product.comment}
                          onChange={(e) =>
                            handleCommentChange(product.productId, e.target.value)
                          }
                          size="small"
                          fullWidth
                          required
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {/* Nút submit */}
          <Box sx={{ mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mr: 2 }}
              disabled={!selectedOrder}
            >
              Thêm
            </Button>
            <Button variant="outlined" onClick={() => navigate('/admin/reviews')}>
              Hủy
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default AddReview;