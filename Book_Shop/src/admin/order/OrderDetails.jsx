import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";

function OrderDetails() {
  const { orderId } = useParams(); // ✅ lấy orderId từ URL
  const navigate = useNavigate();
  const [order, setOrder] = useState(null); // sẽ chứa { order, details }
  const [error, setError] = useState(null);
  const token =
    "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhYmNAZ21haWwuY29tIiwiaWF0IjoxNzQ0OTYyNjIxLCJyb2xlcyI6IlJPTEVfVVNFUiIsImV4cCI6MTc0NTA0OTAyMX0.dvKkBg8mmhFSy2IMqPqkOBvOKiMmbp-PwC8yar5MBbQe04iHkcJv5QfeZ6F8tvEN";
  useEffect(() => {
    console.log(
      "Gọi API:",
      `http://localhost:6868/api/orders/${orderId}/details`
    );

    axios
      .get(`http://127.0.0.1:6868/api/orders/${orderId}/details`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      .then((res) => {
        console.log("Dữ liệu trả về:", res.data);
        setOrder(res.data);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy chi tiết đơn hàng:", err);
      })
      .catch((err) => {
        setError("Không thể kết nối đến máy chủ!");
        console.error("Chi tiết lỗi:", err);
      });
  }, [orderId]);

  if (!order) {
    return (
      <Box sx={{ mt: 8 }}>
        <Typography variant="h6">Đang tải dữ liệu...</Typography>
      </Box>
    );
  }

  const { order: orderInfo, details } = order;

  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant="h5" gutterBottom>
        Chi tiết đơn hàng #{orderInfo.id}
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6">Thông tin đơn hàng</Typography>
        <Typography>Ngày đặt: {orderInfo.orderDate || "Không rõ"}</Typography>
        <Typography>Trạng thái: {orderInfo.status}</Typography>
        <Typography>
          Tổng tiền:{" "}
          {orderInfo?.total != null
            ? orderInfo.total.toLocaleString() + " VNĐ"
            : "Đang tải..."}
        </Typography>

        <Typography>
          Khách hàng:{" "}
          {orderInfo?.user
            ? `${orderInfo.user.name} (${orderInfo.user.email})`
            : "Đang tải..."}
        </Typography>

        <Typography variant="h6" sx={{ mt: 2 }}>
          Danh sách sản phẩm
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tên sản phẩm</TableCell>
                <TableCell>Số lượng</TableCell>
                <TableCell>Đơn giá (VNĐ)</TableCell>
                <TableCell>Thành tiền (VNĐ)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {details.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.product?.name || "Không rõ"}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.price.toLocaleString()}</TableCell>
                  <TableCell>
                    {(item.quantity * item.price).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Button
          variant="outlined"
          sx={{ mt: 2 }}
          onClick={() => navigate("/admin/order")}
        >
          Quay lại
        </Button>
      </Paper>
    </Box>
  );
}

export default OrderDetails;
