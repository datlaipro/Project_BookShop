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
} from '@mui/material';

// Dữ liệu mẫu
const products = [
  { id: 1, name: 'Sách A' },
  { id: 2, name: 'Sách B' },
];

const suppliers = [
  { id: 1, name: 'Nhà cung cấp A' },
  { id: 2, name: 'Nhà cung cấp B' },
];

const importProducts = [
  {
    id: 1,
    supplierId: 1,
    importDate: '2025-04-01',
    items: [
      { productId: 1, price: 40000, quantity: 50 },
      { productId: 2, price: 60000, quantity: 30 },
    ],
  },
  {
    id: 2,
    supplierId: 2,
    importDate: '2025-04-02',
    items: [
      { productId: 1, price: 45000, quantity: 20 },
    ],
  },
];

function ImportProductList() {
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState(null);

  const handleEditImport = (importId) => {
    navigate(`/admin/edit-import-product/${importId}`);
  };

  const handleDeleteImport = (importId) => {
    console.log(`Xóa phiếu nhập với ID: ${importId}`);
    // Gọi API để xóa tại đây
  };

  const handleAddImport = () => {
    navigate('/admin/create-import-product');
  };

  const handleRowClick = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getProductName = (productId) => {
    const product = products.find((p) => p.id === productId);
    return product ? product.name : 'Không xác định';
  };

  const getSupplierName = (supplierId) => {
    const supplier = suppliers.find((s) => s.id === supplierId);
    return supplier ? supplier.name : 'Không xác định';
  };

  const getTotalQuantity = (items) => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <Box sx={{ mt: 8 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5">Danh sách phiếu nhập hàng</Typography>
        <Button variant="contained" color="primary" onClick={handleAddImport}>
          Thêm phiếu nhập
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="import product table">
          <TableHead>
            <TableRow>
              <TableCell>ID phiếu nhập</TableCell>
              <TableCell>Ngày nhập</TableCell>
              <TableCell>Tổng số lượng</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {importProducts.map((importProduct) => (
              <React.Fragment key={importProduct.id}>
                <TableRow
                  onClick={() => handleRowClick(importProduct.id)}
                  sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#f5f5f5' } }}
                >
                  <TableCell>{importProduct.id}</TableCell>
                  <TableCell>{importProduct.importDate}</TableCell>
                  <TableCell>{getTotalQuantity(importProduct.items)}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditImport(importProduct.id);
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
                        e.stopPropagation();
                        handleDeleteImport(importProduct.id);
                      }}
                    >
                      Xóa
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
                    <Collapse in={expandedId === importProduct.id} timeout="auto" unmountOnExit>
                      <Box sx={{ margin: 1 }}>
                        <Typography variant="subtitle1" gutterBottom>
                          Chi tiết phiếu nhập hàng
                        </Typography>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>ID sản phẩm</TableCell>
                              <TableCell>Tên sản phẩm</TableCell>
                              <TableCell>Giá</TableCell>
                              <TableCell>Số lượng</TableCell>
                              <TableCell>Nhà cung cấp</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {importProduct.items.map((item, index) => (
                              <TableRow key={index}>
                                <TableCell>{item.productId}</TableCell>
                                <TableCell>{getProductName(item.productId)}</TableCell>
                                <TableCell>{item.price.toLocaleString()} VNĐ</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>{getSupplierName(importProduct.supplierId)}</TableCell>
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

export default ImportProductList;