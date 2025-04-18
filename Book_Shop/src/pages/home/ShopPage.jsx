import React from "react";
import { Grid, Container } from "@mui/material";
import ProductList from "../../components/display/product/ProductList";
import Sidebar from "../../components/display/free/Sidebar";
import PaginationComponent from '../../components/display/free/PaginationComponent'; // Component phân trang
import ProductFilter from '../../components/display/free/ProductFilter'; // Component lọc sản phẩm
import BreadcrumbsComponent from '../../components/display/free/BreadcrumbsComponent'; // Component Breadcrumbs

import CustomerReviewsSlider from "../../components/action/CustomerReviewsSlider";
import InstagramGallery from "../../components/display/GroupItems/InstagramGallery";
import LatestPosts from "../../components/display/post/LatestPosts";


const ShopPage = () => {
  return (
    <>
    <BreadcrumbsComponent         
        title="Shop"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Shop" },
          { label: "Shop" } // Không có href → là trang hiện tại
        ]}/>
    {/* // <Container sx={{ paddingY: 4 }}> */}
    <Container
    maxWidth="90%" // Định giới hạn chiều rộng tối đa
    sx={{
      paddingY: 4,
      width: { xs: "95%", md: "90%" }, // 95% khi màn hình nhỏ, 100% khi màn hình lớn
      marginX: "auto", // Căn giữa trang
    }}
  >
      <Grid container spacing={4}>
        {/* Sidebar */}
        <Grid item xs={12} md={2}>
          <Sidebar />
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={10}>
          {/* Product Filter */}
          <ProductFilter />

          {/* Product List */}
          <ProductList />

          {/* Pagination */}
          <PaginationComponent />
        </Grid>
      </Grid>
    </Container>
    <CustomerReviewsSlider />
    <InstagramGallery />
    <LatestPosts />
    </>
  );
};

export default ShopPage;
