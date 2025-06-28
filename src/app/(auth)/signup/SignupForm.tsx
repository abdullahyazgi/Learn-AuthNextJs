"use client";
import { Box, Button, Stack, TextField } from "@mui/material";
import Link from "next/link";

const SignupFom = () => {
  return (
    <form>
      <Box>
        <Stack spacing={1} width="250px" sx={{ marginLeft: "35rem" }}>
          <TextField
            id="Username"
            label="Username"
            type="text"
            variant="outlined"
            required
          />
          <TextField
            id="email"
            label="Email"
            type="email"
            variant="outlined"
            required
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            required
          />
          <Button variant="contained">
            <Link href="#">Sign in</Link>
          </Button>
        </Stack>
      </Box>
    </form>
  );
};

export default SignupFom;
