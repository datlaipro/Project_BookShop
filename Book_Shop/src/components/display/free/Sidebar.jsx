// COMPONENT NÀY LÀ BỘ LỌC TÌM KIẾM CHO TRANG SHOP

import React, { useState } from "react";
import { 
  Box, Typography, List, ListItem, ListItemText, 
  TextField, IconButton, Drawer, Divider, InputAdornment 
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search"; // Biểu tượng tìm kiếm

const Sidebar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleDrawer = (open) => () => {
    setOpenDrawer(open);
  };

  const handleSearch = () => {
    console.log("Tìm kiếm:", searchQuery);
    // Thêm logic tìm kiếm tại đây (ví dụ: gọi API, lọc dữ liệu, v.v.)
  };

  // Danh mục và bộ lọc
  const filterContent = (
    <>
      {/* Categories */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Categories
        </Typography>
        <List>
          {["All", "Romance", "Recipe", "Sci-Fi", "Lifestyle"].map((category) => (
            <ListItem button key={category}>
              <ListItemText primary={category} />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Tags */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Tags
        </Typography>
        <List>
          {["Sci-Fi", "Revenge", "Zombie", "Vampire"].map((tag) => (
            <ListItem button key={tag}>
              <ListItemText primary={tag} />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Filter by Price */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Filter by Price
        </Typography>
        <List>
          {["Less than $10", "$10- $20", "$20- $30", "$30- $40", "$40- $50"].map((price) => (
            <ListItem button key={price}>
              <ListItemText primary={price} />
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );

  return (
    <Box sx={{ width: "100%" }}>
      {/* Thanh tìm kiếm + Nút menu */}
      <Box 
        sx={{ 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "space-between",
          mb: 2 
        }}
      >
        {/* TextField với nút tìm kiếm bên phải */}
        <TextField 
          fullWidth 
          placeholder="Search" 
          variant="outlined" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        
        {/* Nút mở Drawer (chỉ hiển thị khi màn hình nhỏ) */}
        <IconButton onClick={toggleDrawer(true)} sx={{ display: { md: "none" } }}>
          <MenuIcon />
        </IconButton>
      </Box>

      {/* Sidebar cố định khi màn hình lớn */}
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        {filterContent}
      </Box>

      {/* Drawer - Hiển thị menu khi bấm vào nút Menu (chỉ khi màn hình nhỏ) */}
      <Drawer 
        anchor="left" 
        open={openDrawer} 
        onClose={toggleDrawer(false)}
      >
        <Box sx={{ width: 250, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Menu
          </Typography>
          <Divider />
          {filterContent}
        </Box>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
