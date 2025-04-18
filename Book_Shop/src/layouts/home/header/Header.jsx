import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  useMediaQuery,
  Drawer,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import UserItems from "./UserItems";

const Logo = styled("img")({
  height: "50px",
});

const CustomButton = styled(Button)(({ uppercase }) => ({
  textTransform: uppercase ? "uppercase" : "none", // Chuyển đổi chữ hoa chữ thường
  margin: "0 10px",  // Khoảng cách giữa các nút
  fontSize: "18px",
  color: "#272727",
  "&:hover": {
    color: "#F86D72",
  },
}));

const Header = ({ setShowLoginModal, isAuthenticated, setIsAuthenticated }) => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const isMobile = useMediaQuery("(max-width:800px)");
  // Chuyển về chế độ mobile khi kích thước < 800 px
  // Có thể kết hợp useMediaQuery và logic JavaScript để kích hoạt drawer dựa trên không gian.
  // Tuy nhiên ở tình hướng này là chưa cần thiết

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      {/* Header */}
      <AppBar position="static" sx={{ backgroundColor: "#fff", boxShadow: "none", padding: '5px 0', color: "#272727" }}>
        <Toolbar>
          {/* Logo */}
          <Logo src="/demo/images/main-logo.png" alt="Logo" />
          {/* Links for Desktop */}
          {!isMobile && (
            <Box sx={{ flexGrow: 1, textAlign: "center" }}>
              <CustomButton component={Link} to="/" uppercase>Home</CustomButton>
              <CustomButton component={Link} to="/about" uppercase>About</CustomButton>
              <CustomButton component={Link} to="/shop" uppercase>Shop</CustomButton>
              <CustomButton component={Link} to="/blog" uppercase>Blogs</CustomButton>
              {/* <CustomButton component={Link} to="/pages" uppercase>Pages</CustomButton> */}
              <CustomButton component={Link} to="/contact" uppercase>Contact</CustomButton>

            </Box>
          )}
          {!isMobile && (
            <UserItems
              isAuthenticated={isAuthenticated}
              setShowLoginModal={setShowLoginModal}
              setIsAuthenticated={setIsAuthenticated}
            />
          )} {/* UserItems hiển thị ngoài cùng bên phải trên Desktop */}

          {/* PHẢI TRUYỀN isAuthenticated, setShowLoginModal, setIsAuthenticated vào UserItems Ở CẢ MOBILE VÀ DESKTOP */}

          {/* Hamburger Icon for Mobile */}
          {isMobile && (
            <>

              {/* <IconButton edge="end" onClick={toggleDrawer(true)}> */}
              <IconButton onClick={toggleDrawer(true)}>
                <MenuIcon sx={{ marginLeft: '20px' }} />
              </IconButton>

              <Box sx={{ position: 'absolute', right: 30, display: 'flex', alignItems: 'center' }}>
                {/* Căn chỉnh UserItems ở góc phải trên Mobile, cần cho nằm trong 1 Box */}

                {/* User Items */}
                <UserItems
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}
                  setShowLoginModal={setShowLoginModal}
                />

              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile */}
      <Drawer anchor="top" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: '100%', p: 2 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <IconButton sx={{ mb: 2 }}>
            <CloseIcon />
          </IconButton>
          <Box sx={{
            display: 'grid', // Hiển thị theo lưới
            gridTemplateColumns: 'repeat(2, 1fr)', // Chia thành 2 cột
            gap: 2, // Khoảng cách giữa các nút
            justifyItems: 'center', // Căn giữa các nút theo chiều ngang
            alignItems: 'center',
            mt: 2, // Khoảng cách trên cùng
          }}>
            <CustomButton component={Link} to="/" sx={{ backgroundColor: 'blue', borderRadius: '8px', color: 'red', width: '150px', py: 2 }}>Home</CustomButton>
            <CustomButton component={Link} to="/about" sx={{ backgroundColor: 'blue', borderRadius: '8px', color: 'red', width: '150px', py: 2 }}>About</CustomButton>
            <CustomButton component={Link} to="/shop" sx={{ backgroundColor: 'blue', borderRadius: '8px', color: 'red', width: '150px', py: 2 }}>Shop</CustomButton>
            <CustomButton component={Link} to="/blog" sx={{ backgroundColor: 'blue', borderRadius: '8px', color: 'red', width: '150px', py: 2 }}>Blogs</CustomButton>
            {/* <CustomButton component={Link} to="/pages" sx={{ backgroundColor:'blue', borderRadius:'8px', color:'red', width:'150px', py: 2}}>Pages</CustomButton> */}
            <CustomButton component={Link} to="/contact" sx={{ backgroundColor: 'blue', borderRadius: '8px', color: 'red', width: '150px', py: 2 }}>Contact</CustomButton>

            {/* <CustomButton>Extra</CustomButton>  */}
            {/* Nút thứ 7 - khi này sẽ là 1 cột 4, 1 cột 3 */}
          </Box>
        </Box>
      </Drawer>
    </>

  );
};

export default Header;
