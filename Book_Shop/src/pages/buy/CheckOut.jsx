import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  TextField,
  Stack,
  Divider,
  colors,
} from "@mui/material";
import BreadcrumbsComponent from "../../components/display/free/BreadcrumbsComponent";
import InstagramGallery from "../../components/display/GroupItems/InstagramGallery";
import { useNavigate } from "react-router-dom";
import BuyDone from "./BuyDone";
import axios from "axios"; // import axios để gửi yêu cầu HTTP
import { useState } from "react"; // import useState để quản lý trạng thái của component

const cartItems = [
  {
    id: 1,
    name: "The Emerald Crown",
    price: 2000,
    quantity: 1,
    image: "/demo/images/cart-item1.png",
  },
  {
    id: 2,
    name: "The Last Enchantment",
    price: 400,
    quantity: 1,
    image: "/demo/images/cart-item2.png",
  },
];

const CheckOut = () => {
  const [formData, setFormData] = useState({// chứa dũ liệu của đơn hàng để gửi lên server
    "status": "truyện doremon",
    "phoneNumber": "0123456789"
  });

  const navigate = useNavigate();

  const handleToCart = () => {
    navigate("/cart");
  };
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <BreadcrumbsComponent
        title="Checkout"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Cart", href: "/cart" },
          { label: "Checkout" },
        ]}
      />

      <Box
        sx={{ p: 6, width: "80%", margin: "auto", justifyContent: "center" }}
      >
        <Typography variant="h3" gutterBottom textAlign="center">
          Checkout
        </Typography>

        {/* Bảng sản phẩm */}
        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell colSpan={3} align="center">
                  <Typography variant="h6">
                    <Box component="span" className="order-label">
                      Thanh toán cho đơn hàng số:
                    </Box>{" "}
                    <Box
                      component="span"
                      className="order-number"
                      sx={{ color: "red" }}
                    >
                      #KKK67890
                    </Box>
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="h5" sx={{ ml: 3 }}>
                    Product
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h5">Quantity</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h5">Subtotal</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <img
                        src={item.image}
                        alt={item.name}
                        width={80}
                        style={{ borderRadius: 8 }}
                      />
                      <Typography variant="h5">{item.name}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h5">{item.quantity}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h5">
                      ${item.price * item.quantity}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Tổng tiền */}
        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Typography variant="h5" sx={{ ml: 5 }}>
                    Subtotal :
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6" color="red" sx={{ mr: 5 }}>
                    $2400.00
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="h5" sx={{ ml: 5 }}>
                    Total :
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6" color="red" sx={{ mr: 5 }}>
                    $2400.00
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Thông tin khách hàng và QR Code thanh toán */}
        <Stack direction="row" spacing={4} sx={{ mb: 4 }}>
          <Paper sx={{ p: 4, flex: 1 }}>
            <Typography variant="h4" gutterBottom marginBottom={5}>
              Customer Information
            </Typography>
            <Stack spacing={2}>
              <Typography variant="h5">
                <strong>Full Name:</strong> John Doe
              </Typography>
              <Typography variant="h5">
                <strong>Address:</strong> 123 Main St, Springfield
              </Typography>
              <Typography variant="h5">
                <strong>Phone Number:</strong> (123) 456-7890
              </Typography>
            </Stack>
          </Paper>
          <Paper sx={{ p: 4, flex: 1, textAlign: "center" }}>
            <Typography variant="h4" gutterBottom>
              Payment QR Code
            </Typography>
            <img
              src="/demo/images/qrcode.jpg"
              alt="QR Code"
              width={200}
              style={{ borderRadius: 8 }}
            />
            <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
              Scan the QR code to complete your payment.
            </Typography>
          </Paper>
        </Stack>

        {/* Thông tin thanh toán */}
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#183e3e",
              fontWeight: "bold",
              p: 2,
              fontSize: "20px",
              borderRadius: 20,
              color: "white",
              "&:hover": { backgroundColor: "#F86D72" },
            }}
            onClick={handleToCart}
          >
            Back to Cart
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#F86D72",
              fontWeight: "bold",
              p: 2,
              fontSize: "20px",
              borderRadius: 20,
              color: "white",
              "&:hover": { backgroundColor: "#183e3e" },
            }}
            onClick={() => {
                handleOpen();
                axios.post('http://localhost:6868/api/orders', formData)// đẩy đơn hàng lên server 
                .then(response => {
                  console.log('Post created:', response.data);
                })
                .catch(err => {
                  console.error('Error creating post:', err);
                });
            }
                
              }
          >
            Place Order
          </Button>
        </Stack>
      </Box>
      <InstagramGallery />
      <BuyDone open={open} handleClose={handleClose} />
    </>
  );
};

export default CheckOut;
