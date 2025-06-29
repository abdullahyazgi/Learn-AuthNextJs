import React from "react";
import LoginForm from "@/app/(auth)/login/LoginForm";
import { Box, Typography, Link } from "@mui/material";

const loginPage = () => {
  return (
    <Box component="section" className="mt-7">
      <Box component="div">
        <Typography component="h1">Sign in</Typography>
      </Box>
      <LoginForm />
      <Typography component="p">
        Do not have an account?
        <Link href="/signup"> Sign up</Link>
      </Typography>
    </Box>
  );
};

export default loginPage;
