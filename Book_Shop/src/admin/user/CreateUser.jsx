import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';

// Danh sách vai trò có thể chọn
const roleOptions = ['Admin', 'User', 'Moderator'];

function CreateUser() {
  const navigate = useNavigate();

  // State cho thông tin người dùng
  const [user, setUser] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    birthDay: '',
    gender: '',
    avata: '',
    roles: [],
  });
  const [error, setError] = useState('');

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  // Xử lý thay đổi roles
  const handleRolesChange = (e) => {
    setUser((prev) => ({ ...prev, roles: e.target.value }));
    setError('');
  };

  // Kiểm tra dữ liệu hợp lệ
  const isValid = () => {
    return (
      user.name.trim() !== '' &&
      user.email.trim() !== '' &&
      user.phoneNumber.trim() !== '' &&
      user.address.trim() !== '' &&
      user.birthDay !== '' &&
      user.gender !== '' &&
      user.roles.length > 0
    );
  };

  // Xử lý submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValid()) {
      setError('Vui lòng điền đầy đủ thông tin');
      return;
    }

    const userData = {
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      address: user.address,
      birthDay: user.birthDay,
      gender: user.gender,
      avata: user.avata || 'https://via.placeholder.com/40', // Giá trị mặc định nếu không nhập
      roles: user.roles,
    };
    console.log('Thêm user:', userData);
    navigate('/admin/users');
  };

  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant="h5" gutterBottom>
        Thêm người dùng mới
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Box component="form" onSubmit={handleSubmit}>
          {/* Hiển thị lỗi nếu có */}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {/* Các trường nhập liệu */}
          <TextField
            fullWidth
            label="Tên"
            name="name"
            value={user.name}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={user.email}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Số điện thoại"
            name="phoneNumber"
            value={user.phoneNumber}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Địa chỉ"
            name="address"
            value={user.address}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Ngày sinh"
            name="birthDay"
            type="date"
            value={user.birthDay}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            margin="normal"
            required
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Giới tính</InputLabel>
            <Select
              name="gender"
              value={user.gender}
              onChange={handleChange}
              label="Giới tính"
            >
              <MenuItem value="Male">Nam</MenuItem>
              <MenuItem value="Female">Nữ</MenuItem>
              <MenuItem value="Other">Khác</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="URL Avatar"
            name="avata"
            value={user.avata}
            onChange={handleChange}
            margin="normal"
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Vai trò</InputLabel>
            <Select
              multiple
              name="roles"
              value={user.roles}
              onChange={handleRolesChange}
              label="Vai trò"
            >
              {roleOptions.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Nút submit */}
          <Box sx={{ mt: 3 }}>
            <Button type="submit" variant="contained" color="primary" sx={{ mr: 2 }}>
              Thêm
            </Button>
            <Button variant="outlined" onClick={() => navigate('/admin/users')}>
              Hủy
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default CreateUser;