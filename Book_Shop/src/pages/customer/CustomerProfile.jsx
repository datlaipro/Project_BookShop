import React from "react";
import {
  Avatar,
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
} from "@mui/material";
import PaginationComponent from '../../components/display/free/PaginationComponent'; // Component phân trang
import InstagramGallery from "../../components/display/GroupItems/InstagramGallery";
// import LatestPosts from "../../components/display/post/LatestPosts";
import BreadcrumbsComponent from '../../components/display/free/BreadcrumbsComponent';



const customer = {
  name: "Nguyen Van A",
  age: 30,
  phone: "0123-456-789",
  email: "nguyenvana@example.com",
  address: "123 Đường ABC, Quận 1, TP.HCM",
  avatar: "https://via.placeholder.com/150",
};

const orders = [
  {
    id: "#12345",
    date: "2025-02-10",
    total: 2400,
    products: [
      {
        name: "The Emerald Crown",
        image: "/demo/images/product-item3.png",
        price: 2000,
        quantity: 1,
      },
      {
        name: "The Last Enchantment",
        image: "/demo/images/product-item1.png",
        price: 400,
        quantity: 1,
      },
    ],
  },
  {
    id: "#67890",
    date: "2025-02-05",
    total: 1500,
    products: [
      {
        name: "The Ruby Ring",
        image: "/demo/images/product-item3.png",
        price: 1500,
        quantity: 1,
      },
    ],
  },
];

const CustomerProfile = () => {
  return (
    <>
                <BreadcrumbsComponent
                title="Customer Profile"
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "Customer", href: "/customerprofile" },
                    { label: "Customer" },
                ]}
            />
    <Container maxWidth="lg">
      {/* Thông tin customer */}
      <Box display="flex" alignItems="center" gap={3} mt={5}>
        <Avatar src={customer.avatar} sx={{ width: 100, height: 100 }} />
        <Box>
          <Typography variant="h4">{customer.name}</Typography>
          <Typography variant="body1">Tuổi: {customer.age}</Typography>
          <Typography variant="body1">SĐT: {customer.phone}</Typography>
          <Typography variant="body1">Email: {customer.email}</Typography>
          <Typography variant="body1">Địa chỉ: {customer.address}</Typography>
        </Box>
      </Box>

      {/* Danh sách đơn hàng */}
      <Typography variant="h5" mt={5} mb={2}>
        Đơn hàng đã mua
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã đơn</TableCell>
              <TableCell>Ngày mua</TableCell>
              <TableCell>Sản phẩm</TableCell>
              <TableCell>Tổng tiền</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>
                  {order.products.map((product, index) => (
                    <Stack direction="row" spacing={2} key={index} alignItems="center" mt={1}>
                      <img
                        src={product.image}
                        alt={product.name}
                        width={50}
                        style={{ borderRadius: 8 }}
                      />
                      <Box>
                        <Typography variant="body1">{product.name}</Typography>
                        <Typography variant="body2">
                          {product.quantity} x ${product.price}
                        </Typography>
                      </Box>
                    </Stack>
                  ))}
                </TableCell>
                <TableCell>${order.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
    <PaginationComponent />
    {/* <LatestPosts /> */}
    <InstagramGallery />

    </>
  );
};

export default CustomerProfile;
