import React from 'react';
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
} from '@mui/material';

// Dữ liệu mẫu (thay bằng API thực tế)
const suppliers = [
  { id: 1, name: 'Supplier A', address: '123 Đường A, TP.HCM', phoneNumber: '0901234567', email: 'supa@gmail.com' },
  { id: 2, name: 'Supplier B', address: '456 Đường B, Hà Nội', phoneNumber: '0909876543', email: 'supb@gmail.com' },
];

function SupplierList() {
  const navigate = useNavigate();

  const handleEditSupplier = (supplierId) => {
    navigate(`/admin/edit-supplier/${supplierId}`);
  };

  const handleDeleteSupplier = (supplierId) => {
    // Gọi API để xóa supplier tại đây
    console.log(`Xóa supplier với ID: ${supplierId}`);
    // Sau khi xóa thành công, có thể cập nhật lại danh sách (reload hoặc filter)
  };

  const handleAddSupplier = () => {
    navigate('/admin/add-supplier');
  };

  return (
    <Box sx={{ mt: 8 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5">Danh sách nhà cung cấp</Typography>
        <Button variant="contained" color="primary" onClick={handleAddSupplier}>
          Thêm nhà cung cấp
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="supplier table">
          <TableHead>
            <TableRow>
              <TableCell>Tên</TableCell>
              <TableCell>Địa chỉ</TableCell>
              <TableCell>Số điện thoại</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {suppliers.map((supplier) => (
              <TableRow key={supplier.id}>
                <TableCell>{supplier.name}</TableCell>
                <TableCell>{supplier.address}</TableCell>
                <TableCell>{supplier.phoneNumber}</TableCell>
                <TableCell>{supplier.email}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleEditSupplier(supplier.id)}
                    sx={{ mr: 1 }}
                  >
                    Sửa
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleDeleteSupplier(supplier.id)}
                  >
                    Xóa
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default SupplierList;