import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { useTheme, styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InsightsOutlinedIcon from '@mui/icons-material/InsightsOutlined';
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';

const drawerWidth = 240;

function LayoutAdmin() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(true);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const icons = [
    <InsightsOutlinedIcon />,
    <ShoppingCartCheckoutOutlinedIcon />,
    <ShoppingBagOutlinedIcon />,
    <SupportAgentOutlinedIcon />,
    <SupportAgentOutlinedIcon />,

  ];

  const icons2 = [
    <InboxIcon />,
    <PeopleOutlineOutlinedIcon />,
    <NoteAltOutlinedIcon />,
  ];

  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const drawer = (
    // <div style={{ backgroundColor: '#09262b', height: '100vh', overflow: 'auto' }}>
    <div style={{ backgroundColor: '#99b7bb', height: '100vh', overflow: 'auto' }}>

      <Toolbar>
        <IconButton
          color="inherit"
          aria-label={drawerOpen ? 'close drawer' : 'open drawer'}
          edge="start"
          onClick={drawerOpen ? handleDrawerClose : handleDrawerOpen}
          sx={{ display: { xs: 'none', sm: 'block' } }}
        >
          {drawerOpen ? (
            <img src="/demo/images/main-logo.png" alt="SHOP" style={{ width: '120px', height: 'auto' }} />
          ) : (
            <MenuIcon sx={{ color: '#d5d6d6' }} />
          )}
        </IconButton>
        <Typography sx={{ display: { xs: 'block', sm: drawerOpen ? 'none' : 'none' } }}>
          BOOK SHOP
        </Typography>
      </Toolbar>

      <Divider />

      <List>
        {['Dashboard', 'Products', 'Ware House', 'Order', 'User'].map((text, index) => {
          const paths = ['/admin', '/admin/product', '/admin/import-products', '/admin/order', '/admin/user'];
          return (
            <ListItem key={text} disablePadding>
              <ListItemButton
                component={Link}
                to={paths[index]}
                sx={{
                  justifyContent: drawerOpen ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: drawerOpen ? 3 : 'auto',
                    justifyContent: 'center',
                    color: '#d5d6d6',
                  }}
                >
                  {icons[index % icons.length]}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={{ opacity: drawerOpen ? 1 : 0, color: '#d5d6d6' }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider />

      <List>
        {['Supplier', 'Maketing', 'Review'].map((text, index) => {
          const paths2 = ['/admin/supplier', '/admin/discount', '/admin/review'];
          return (
            <ListItem key={text} disablePadding>
              <ListItemButton
                component={Link}
                to={paths2[index]}
                sx={{
                  justifyContent: drawerOpen ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: drawerOpen ? 3 : 'auto',
                    justifyContent: 'center',
                    color: '#d5d6d6',
                  }}
                >
                  {icons2[index % icons2.length]}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={{ opacity: drawerOpen ? 1 : 0, color: '#d5d6d6' }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );

  return (
    // <AppTheme>
      // <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            zIndex: { xs: theme.zIndex.drawer - 1, sm: theme.zIndex.drawer - 1 },
            width: { sm: `calc(100% - ${drawerOpen ? drawerWidth : 0}px)` },
            ml: { sm: drawerOpen ? `${drawerWidth}px` : 0 },
            transition: 'width 0.3s ease, margin 0.3s ease',
            backgroundColor: '#3c7980',
            color: '#fffde7',
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              variant="h8"
              noWrap
              component="div"
              sx={{
                flexGrow: 1,
                ml: '60px',
                display: { xs: 'none', sm: 'block' },
                transition: 'width 0.3s ease, margin 0.3s ease',
              }}
            >
              ADMIN
            </Typography>

          </Toolbar>
        </AppBar>

        <Box
          component="nav"
          sx={{
            width: { sm: drawerOpen ? drawerWidth : `calc(${theme.spacing(7)} + 1px)` },
            flexShrink: { sm: 0 },
            transition: 'width 0.3s ease',
          }}
          aria-label="mailbox folders"
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            open={drawerOpen}
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerOpen ? drawerWidth : `calc(${theme.spacing(7)} + 1px)`,
              },
              transition: 'width 0.3s ease',
            }}
          >
            {drawer}
          </Drawer>
        </Box>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerOpen ? drawerWidth : `calc(${theme.spacing(7)} + 1px)`})` },
            transition: 'width 0.3s ease',
          }}
        >
          {/* <Toolbar /> */}
          <Outlet />
        </Box>
      </Box>
    // </AppTheme>
  );
}

export default LayoutAdmin;
