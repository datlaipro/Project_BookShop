import React from "react";
import { Pagination, Box } from "@mui/material";

const PaginationComponent = () => {
  return (
    <Box display="flex" justifyContent="center" sx={{ padding: "2rem 0" }}>
      <Pagination count={5} color="standard" />
    </Box>
  );
};

export default PaginationComponent;
