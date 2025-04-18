import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";

const LimitedOffer = () => {
  // Set thời gian kết thúc (30 ngày từ hiện tại)
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 4); // Cộng thêm 4 ngày

  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = endDate - now;

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // Reset mỗi khi tải lại trang
  }, []);

  return (
    <Box
      id="limited-offer"
      sx={{
        backgroundImage: "url(/demo/images/banner-image-bg-1.jpg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "800px",
        display: "flex",
        alignItems: "center",
        padding: "32px",
      }}
    >
      <Grid container spacing={4} alignItems="center">
        {/* Image Section */}
        <Grid item xs={12} md={6} textAlign="center">
          <Box
            component="img"
            src="/demo/images/banner-image3.png"
            alt="banner"
            sx={{ maxWidth: "100%", height: "auto" }}
          />
        </Grid>

        {/* Text Section */}
        <Grid item xs={12} md={5}>
          <Typography
            variant="h2"
            textAlign={{ xs: "center", md: "left" }}
            sx={{ fontSize: "2rem", fontWeight: "bold" }}
          >
            30% Discount on all items. Hurry Up !!!
          </Typography>
          <Box
            id="countdown-clock"
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
              marginTop: "16px",
              color: "text.primary",
            }}
          >
            {/* Countdown Timer */}
            <Box sx={{ display: "grid", textAlign: "center", paddingX: "8px" }}>
              <Typography variant="h4" sx={{ fontSize: "2rem" }}>
                {timeLeft.days}
              </Typography>
              <Typography variant="body2">Days</Typography>
            </Box>
            <Typography
              variant="h4"
              color="primary"
              sx={{ fontSize: "2rem", paddingX: "4px" }}
            >
              :
            </Typography>
            <Box sx={{ display: "grid", textAlign: "center", paddingX: "8px" }}>
              <Typography variant="h4" sx={{ fontSize: "2rem" }}>
                {timeLeft.hours}
              </Typography>
              <Typography variant="body2">Hrs</Typography>
            </Box>
            <Typography
              variant="h4"
              color="primary"
              sx={{ fontSize: "2rem", paddingX: "4px" }}
            >
              :
            </Typography>
            <Box sx={{ display: "grid", textAlign: "center", paddingX: "8px" }}>
              <Typography variant="h4" sx={{ fontSize: "2rem" }}>
                {timeLeft.minutes}
              </Typography>
              <Typography variant="body2">Min</Typography>
            </Box>
            <Typography
              variant="h4"
              color="primary"
              sx={{ fontSize: "2rem", paddingX: "4px" }}
            >
              :
            </Typography>
            <Box sx={{ display: "grid", textAlign: "center", paddingX: "8px" }}>
              <Typography variant="h4" sx={{ fontSize: "2rem" }}>
                {timeLeft.seconds}
              </Typography>
              <Typography variant="body2">Sec</Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            //   marginTop: "16px",
            //   color: "text.primary",
            //   flexDirection: "row",
            }}
          >
          <Button
            href="shop.html"
            variant="contained"
            color="secondary"
            size="large"
            sx={{ marginTop: "16px",
            borderRadius: "30px", /* Bo tròn 4 góc */
            backgroundColor: "#F86D72",
            padding: "16px",
             }}
          >
            Shop Collection
          </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LimitedOffer;
