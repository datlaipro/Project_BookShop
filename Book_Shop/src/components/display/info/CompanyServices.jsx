import React from "react";
import { Container, Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined"; // Free delivery icon
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined"; // Quality guarantee icon
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined"; // Daily offers icon
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined"; // Secure payment icon

const IconBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  paddingBottom: theme.spacing(3),
}));

const IconBoxIcon = styled(Box)(({ theme }) => ({
  paddingRight: theme.spacing(3),
  color: "#F86D72", // Primary color
  fontSize: "48px", // Size for icons
}));

const IconBoxContent = styled(Box)({
  h4: {
    marginBottom: "8px",
    textTransform: "capitalize",
    color: "#272727", // Dark color
    fontWeight: "bold",
  },
  p: {
    color: "#717171", // Secondary text color
  },
});

const CompanyServices = () => {
  const services = [
    {
      icon: <LocalShippingOutlinedIcon fontSize="inherit" />,
      title: "Free delivery",
      description: "Consectetur adipi elit lorem ipsum dolor sit amet.",
    },
    {
      icon: <VerifiedOutlinedIcon fontSize="inherit" />,
      title: "Quality guarantee",
      description: "Dolor sit amet orem ipsu mcons ectetur adipi elit.",
    },
    {
      icon: <LocalOfferOutlinedIcon fontSize="inherit" />,
      title: "Daily offers",
      description: "Amet consectetur adipi elit loreme ipsum dolor sit.",
    },
    {
      icon: <SecurityOutlinedIcon fontSize="inherit" />,
      title: "100% secure payment",
      description: "Rem Lopsum dolor sit amet, consectetur adipi elit.",
    },
  ];

  return (
    <section id="company-services" style={{ padding: "64px 0", paddingBottom: 5 }}>
      <Box display="flex" justifyContent="center">
        <Grid container spacing={4} justifyContent="center">
          {services.map((service, index) => (
            <Grid item xs={12} md={6} lg={3} key={index} maxWidth="350px">
              <IconBox>
                <IconBoxIcon>{service.icon}</IconBoxIcon>
                <IconBoxContent>
                  <Typography variant="h4" component="h4" fontSize="26px">
                    {service.title}
                  </Typography>
                  <Typography variant="body1" fontSize="18px">{service.description}</Typography>
                </IconBoxContent>
              </IconBox>
            </Grid>
          ))}
        </Grid>
      </Box>
    </section>
  );
};

export default CompanyServices;
