// TODO
// Kiểm tra giá khuyến mại: Thêm logic để salePrice không vượt quá originalPrice.
// API: Fetch dữ liệu discount từ /api/discounts/:id và gửi dữ liệu cập nhật qua PUT.

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

// Dữ liệu mẫu cho Product
const products = [
  { id: 1, name: 'Áo thun', stock: 100, originalPrice: 50000 },
  { id: 2, name: 'Quần jeans', stock: 50, originalPrice: 120000 },
  { id: 3, name: 'Giày thể thao', stock: 20, originalPrice: 200000 },
];

// Dữ liệu mẫu cho Discount
const discountData = {
  1: {
    id: 1,
    dateStart: '2025-03-10',
    dateEnd: '2025-03-20',
    products: [
      { productId: 1, salePrice: 20000, quantity: 10 },
      { productId: 2, salePrice: 50000, quantity: 5 },
    ],
  },
  2: {
    id: 2,
    dateStart: '2025-03-15',
    dateEnd: '2025-03-25',
    products: [
      { productId: 3, salePrice: 150000, quantity: 8 },
    ],
  },
};

function EditDiscount() {
  const { discountId } = useParams();
  const navigate = useNavigate();
  const initialDiscount = discountData[discountId] || {};

  // State cho ngày bắt đầu và kết thúc
  const [dateStart, setDateStart] = useState(initialDiscount.dateStart || '');
  const [dateEnd, setDateEnd] = useState(initialDiscount.dateEnd || '');
  const [error, setError] = useState('');

  // State cho danh sách sản phẩm đã chọn
  const [selectedProducts, setSelectedProducts] = useState(
    initialDiscount.products?.map((p) => ({
      ...products.find((prod) => prod.id === p.productId),
      salePrice: p.salePrice.toString(),
      quantity: p.quantity.toString(),
    })) || []
  );

  // Xử lý thay đổi ngày
  const handleDateChange = (e) => {
    const { name, value } = e.target;
    if (name === 'dateStart') setDateStart(value);
    if (name === 'dateEnd') setDateEnd(value);
    setError('');
  };

  // Xử lý khi chọn sản phẩm từ Autocomplete
  const handleProductChange = (event, newValue) => {
    if (newValue && !selectedProducts.some((p) => p.id === newValue.id)) {
      setSelectedProducts((prev) => [
        ...prev,
        { ...newValue, salePrice: '', quantity: '' },
      ]);
    }
  };

  // Xử lý thay đổi giá và số lượng cho từng sản phẩm
  const handleProductDetailChange = (id, field, value) => {
    setSelectedProducts((prev) =>
      prev.map((product) => {
        if (product.id === id) {
          if (field === 'quantity') {
            const quantity = parseInt(value) || 0;
            if (quantity > product.stock) {
              return { ...product, quantity: product.stock };
            }
          }
          return { ...product, [field]: value };
        }
        return product;
      })
    );
  };

  // Xử lý xóa sản phẩm khỏi danh sách
  const handleRemoveProduct = (id) => {
    setSelectedProducts((prev) => prev.filter((product) => product.id !== id));
  };

  // Kiểm tra ngày hợp lệ
  const isDateValid = () => {
    if (!dateStart || !dateEnd) return false;
    const start = new Date(dateStart);
    const end = new Date(dateEnd);
    const diffInDays = (end - start) / (1000 * 60 * 60 * 24);
    return diffInDays >= 1;
  };

  // Kiểm tra dữ liệu sản phẩm hợp lệ
  const isProductsValid = () => {
    return selectedProducts.every(
      (p) => p.salePrice !== '' && p.quantity !== '' && parseInt(p.quantity) > 0
    );
  };

  // Xử lý submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isDateValid()) {
      setError('Ngày kết thúc phải lớn hơn ngày bắt đầu ít nhất 1 ngày');
      return;
    }

    if (!isProductsValid()) {
      setError('Vui lòng điền đầy đủ giá và số lượng khuyến mại cho tất cả sản phẩm');
      return;
    }

    const discountData = {
      dateStart,
      dateEnd,
      products: selectedProducts.map(({ id, salePrice, quantity }) => ({
        productId: id,
        salePrice: parseFloat(salePrice) || 0,
        quantity: parseInt(quantity) || 0,
      })),
    };
    console.log('Cập nhật discount:', discountData);
    navigate('/admin/discount');
  };

  if (!initialDiscount.id) {
    return (
      <Box sx={{ mt: 8 }}>
        <Typography variant="h6">Không tìm thấy mã giảm giá</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant="h5" gutterBottom>
        Chỉnh sửa chương trình khuyến mại #{discountId}
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Box component="form" onSubmit={handleSubmit}>
          {/* Khu vực chọn ngày */}
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <TextField
              label="Ngày bắt đầu"
              name="dateStart"
              type="date"
              value={dateStart}
              onChange={handleDateChange}
              InputLabelProps={{ shrink: true }}
              required
              fullWidth
            />
            <TextField
              label="Ngày kết thúc"
              name="dateEnd"
              type="date"
              value={dateEnd}
              onChange={handleDateChange}
              InputLabelProps={{ shrink: true }}
              required
              fullWidth
            />
          </Box>

          {/* Hiển thị lỗi nếu có */}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {/* Ô chọn sản phẩm */}
          <Autocomplete
            options={products.filter(
              (p) => !selectedProducts.some((sp) => sp.id === p.id)
            )}
            getOptionLabel={(option) => `${option.id} - ${option.name}`}
            filterOptions={(options, { inputValue }) => {
              const input = inputValue.toLowerCase();
              return options.filter(
                (option) =>
                  option.name.toLowerCase().includes(input) ||
                  option.id.toString().includes(input)
              );
            }}
            renderOption={(props, option) => (
              <li {...props}>
                {option.id} - {option.name} (Tồn kho: {option.stock}, Giá gốc: {option.originalPrice.toLocaleString()} VNĐ)
              </li>
            )}
            onChange={handleProductChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Thêm sản phẩm"
                placeholder="Gõ ID hoặc tên sản phẩm"
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
                    <TableCell>ID</TableCell>
                    <TableCell>Tên sản phẩm</TableCell>
                    <TableCell>Tồn kho</TableCell>
                    <TableCell>Giá gốc (VNĐ)</TableCell>
                    <TableCell>Giá khuyến mại (VNĐ)</TableCell>
                    <TableCell>Số lượng khuyến mại</TableCell>
                    <TableCell>Hành động</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.id}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>{product.originalPrice.toLocaleString()}</TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          value={product.salePrice}
                          onChange={(e) =>
                            handleProductDetailChange(product.id, 'salePrice', e.target.value)
                          }
                          size="small"
                          required
                          inputProps={{ min: 0 }}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          value={product.quantity}
                          onChange={(e) =>
                            handleProductDetailChange(product.id, 'quantity', e.target.value)
                          }
                          size="small"
                          required
                          inputProps={{ min: 0, max: product.stock }}
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() => handleRemoveProduct(product.id)}
                        >
                          Xóa
                        </Button>
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
              disabled={selectedProducts.length === 0}
            >
              Lưu
            </Button>
            <Button variant="outlined" onClick={() => navigate('/admin/discount')}>
              Hủy
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default EditDiscount;