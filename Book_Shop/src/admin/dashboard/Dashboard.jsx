// Thiết lập Layout cho Grid2 items:
// Sử dụng xs={12}, sm={6}, và md={3} để đảm bảo 4 card nằm trong 1 dòng trên thiết bị lớn và 2 card trên 1 dòng trên thiết bị nhỏ.

// Áp Dụng Array.map để Tạo Nhiều Grid Items: Sử dụng Array.map để tạo ra nhiều card với cấu trúc giống nhau.


import React from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { styled, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid2';
import Header from "../componentsDashboard/Header";
import AppTheme from '../componentsDashboard/Theme';
import MainGrid from '../componentsDashboard/MainGrid';


export default function Dashboard(props) {
  return (
    <AppTheme >
      <CssBaseline enableColorScheme />

        <MainGrid></MainGrid>


    </AppTheme>
  );
}

