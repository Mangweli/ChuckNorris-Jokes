import React from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

const Logo = () => {
  return (
    <Box>
      <Link to="/">
        <Box component="img" sx={{height: '100px'}} src="https://avatars.githubusercontent.com/u/17794049?s=280&v=4" alt="logo" />
      </Link>
    </Box>
  );
};

export default Logo;
