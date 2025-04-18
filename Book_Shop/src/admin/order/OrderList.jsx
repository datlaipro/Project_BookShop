import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
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
} from "@mui/material";

// Dữ liệu mẫu (thay bằng API thực tế)
// const orders = [
//   { id: 1, userId: 1, date: '2025-03-31', total: 150000, status: 'Completed' },
//   { id: 2, userId: 1, date: '2025-03-31', total: 200000, status: 'Pending' },
//   { id: 3, userId: 1, date: '2025-03-30', total: 300000, status: 'Shipped' },
// ];

function OrderList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Thực hiện yêu cầu GET để lấy dữ liệu
    axios
      .get("http://localhost:6868/api/orders") // gọi tất cả đơn hàng
      .then((response) => {
        setData(response.data); // response.data lúc này là 1 array
      })
      .catch((err) => {
        console.log("lỗi", err);
      });
  }, []); // [] là dependency array, giúp chỉ gọi useEffect 1 lần khi component mount

  const { userId } = useParams(); // Lấy userId từ URL nếu có
  const navigate = useNavigate();

  const handleViewDetails = (orderId) => {
    navigate(`/admin/order/${orderId}`);
  };
  //   Điều hướng: Khi nhấp vào "Xem chi tiết",
  // useNavigate sẽ chuyển hướng đến trang chi tiết đơn hàng với URL /admin/order/:orderId.

  // Lọc đơn hàng theo userId nếu có, nếu không thì hiển thị tất cả
  const filteredOrders = userId
    ? data.filter((order) => order.userId === parseInt(userId))
    : data;

  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant="h5" gutterBottom>
        {userId ? `Đơn hàng của người dùng #${userId}` : "Danh sách đơn hàng"}
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="order table">
          <TableHead>
            <TableRow>
              <TableCell>Mã đơn hàng</TableCell>
              <TableCell>Ngày đặt</TableCell>
              <TableCell>Tổng tiền (VNĐ)</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  {/* <TableCell>{order.total.toLocaleString()}</TableCell> */}
                  <TableCell>{order.status}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleViewDetails(order.id)}
                    >
                      Xem chi tiết
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  Không có đơn hàng nào
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default OrderList;
