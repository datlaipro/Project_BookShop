import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Menu, MenuItem, IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import WishlistDropdown from "./WishlistDropdown";
import CartDropdown from "./CartDropdown";
import { useAuth } from "../../protected/AuthContext";

const UserItems = () => {
  const { isAuthenticated, setShowLoginModal, handleLogout, showError } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogoutClick = () => {
    handleLogout();
    handleMenuClose();
    showError("Đăng xuất thành công!", "success");
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 2 }}>
      <SearchIcon style={{ cursor: "pointer" }} />
      <IconButton onClick={handleMenuOpen}>
        <AccountCircleIcon style={{ cursor: "pointer" }} />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        {!isAuthenticated ? (
          <>
            <MenuItem onClick={() => { setShowLoginModal(true); handleMenuClose(); }}>Login</MenuItem>
            <MenuItem onClick={() => { setShowLoginModal(true); handleMenuClose(); }}>Register</MenuItem>
          </>
        ) : (
          <>
            <MenuItem onClick={() => { navigate("/customerprofile"); handleMenuClose(); }}>My Account</MenuItem>
            <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
          </>
        )}
      </Menu>
      <WishlistDropdown />
      <CartDropdown />
    </Box>
  );
};

export default UserItems;