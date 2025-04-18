import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
} from '@mui/material';

function AddSupplier() {
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState({
    name: '',
    address: '',
    phoneNumber: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplier((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Gọi API để thêm supplier tại đây
    console.log('Thêm supplier:', supplier);
    navigate('/admin/supplier'); // Quay lại danh sách sau khi thêm
  };

  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant="h5" gutterBottom>
        Thêm nhà cung cấp mới
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
              Thêm
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

export default AddSupplier;