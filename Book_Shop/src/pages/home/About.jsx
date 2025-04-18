import React from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import LatestPosts from "../../components/display/post/LatestPosts";
import InstagramGallery from "../../components/display/GroupItems/InstagramGallery";
import BreadcrumbsComponent from '../../components/display/free/BreadcrumbsComponent';

const About = () => {
  return (
    <>
          <BreadcrumbsComponent
        title="About"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "About" },
        ]}
      />
    <Box id="about-us" sx={{pt: 5, width: "90%", margin: "auto", justifyContent: "center" }}>
      <Grid container spacing={4} justifyContent="center">
        {/* Hình ảnh và nút Play */}
        <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "center" }}>
          <Box sx={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Button
              sx={{
                position: "absolute",
                border: "2px solid black",
                borderRadius: "50%",
                p: 5,
                backgroundColor: "white",
                '&:hover': {
                  backgroundColor: "#f0f0f0",
                }
              }}
              onClick={() => window.open("https://www.youtube.com/embed/l4MOE3hZATA", "_blank")}
            >
              ▶
            </Button>
            <Box
              component="img"
              src="/demo/images/single-image-about.jpg"
              alt="single"
              sx={{ width: "100%", maxWidth: 500, borderRadius: 3 }}
            />
          </Box>
        </Grid>
        
        {/* Nội dung phần giới thiệu */}
        <Grid item xs={12} md={6}>
          <Box sx={{ pl: { md: 5 }, mt: 5 }}>
            <Typography variant="h3" gutterBottom>
              Best Bookstore of all time
            </Typography>
            <Typography paragraph>
              Risus augue curabitur diam senectus congue velit et. Sed vitae metus
              nibh sit era. Nulla adipiscing pharetra pellentesque maecenas odio
              eros at. Et libero vulputate amet duis erat volutpat vitae eget.
            </Typography>
            <Typography paragraph>
              Nulla adipiscing pharetra pellentesque maecenas odio eros at. Et libero
              vulputate amet duis erat volutpat vitae eget. Quam libero etiam et in
              ac at quis. Risus augue curabitur diam senectus congue velit et.
            </Typography>
            <Button variant="contained" href="shop.html" sx={{ mt: 3 }}>
              Go to shop
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
    <LatestPosts />
    <InstagramGallery />
    </>
  );
};

export default About;
