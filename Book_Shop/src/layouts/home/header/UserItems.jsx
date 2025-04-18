import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Menu, MenuItem, IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import WishlistDropdown from "./WishlistDropdown";
import CartDropdown from "./CartDropdown";

const UserItems = ({ isAuthenticated, setShowLoginModal, setIsAuthenticated }) => {

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowLoginModal(false); // Đảm bảo modal bị đóng
    localStorage.removeItem("isAuthenticated"); // Xóa trạng thái đăng nhập
    // localStorage.removeItem("username"); // Xóa thông tin đăng nhập
    // localStorage.removeItem("password");  // Xóa thông tin đăng nhập
    // localStorage.removeItem("rememberMe"); // Xóa trạng thái Remember Me
    handleMenuClose();
    navigate("/"); // Chuyển về trang chủ
  };
  

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 2 }}>
      {/* Search Icon */}
      <SearchIcon style={{ cursor: "pointer" }} />

      {/* User Menu */}
      <IconButton onClick={handleMenuOpen}>
        <AccountCircleIcon style={{ cursor: "pointer" }} />
      </IconButton>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        {!isAuthenticated ? (
          <>
            <MenuItem onClick={() => { setShowLoginModal(true); handleMenuClose(); }}>Login</MenuItem>
            <MenuItem onClick={handleMenuClose}>Register</MenuItem>
          </>
        ) : (
          <>
            {/* <MenuItem onClick={handleMenuClose}>My Account</MenuItem> */}
            {/* component={Link} to="/customerprofile" */}
            <MenuItem onClick={() => { navigate("/customerprofile"); handleMenuClose(); }}>My Account</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </>
        )}
      </Menu>

      {/* Wishlist & Cart */}
      <WishlistDropdown />
      <CartDropdown />
    </Box>
  );
};

export default UserItems;
