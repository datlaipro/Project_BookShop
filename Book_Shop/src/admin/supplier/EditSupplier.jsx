import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
} from '@mui/material';

// Dữ liệu mẫu (thay bằng API thực tế)
const supplierData = {
  1: { id: 1, name: 'Supplier A', address: '123 Đường A, TP.HCM', phoneNumber: '0901234567', email: 'supa@gmail.com' },
  2: { id: 2, name: 'Supplier B', address: '456 Đường B, Hà Nội', phoneNumber: '0909876543', email: 'supb@gmail.com' },
};

function EditSupplier() {
  const { supplierId } = useParams();
  const navigate = useNavigate();
  const initialSupplier = supplierData[supplierId] || {};

  const [supplier, setSupplier] = useState({
    name: initialSupplier.name || '',
    address: initialSupplier.address || '',
    phoneNumber: initialSupplier.phoneNumber || '',
    email: initialSupplier.email || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplier((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Gọi API để cập nhật supplier tại đây
    console.log('Cập nhật supplier:', supplier);
    navigate('/admin/supplier'); // Quay lại danh sách sau khi sửa
  };

  if (!initialSupplier.id) {
    return (
      <Box sx={{ mt: 8 }}>
        <Typography variant="h6">Không tìm thấy nhà cung cấp</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant="h5" gutterBottom>
        Chỉnh sửa nhà cung cấp #{supplierId}
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Tên"
            name="name"
            value={supplier.name}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Địa chỉ"
            name="address"
            value={supplier.address}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Số điện thoại"
            name="phoneNumber"
            value={supplier.phoneNumber}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={supplier.email}
            onChange={handleChange}
            margin="normal"
            required
          />
          <Box sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" color="primary" sx={{ mr: 2 }}>
              Lưu
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/admin/supplier')}
            >
              Hủy
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default EditSupplier;