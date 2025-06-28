"use client";
import { Box, Button, ButtonGroup, IconButton, Stack, TextField } from "@mui/material";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const LoginForm = () => {
  return (
    <form>
      <Box>
        <Stack spacing={1} width="250px" sx={{ marginLeft: "35rem" }}>
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
      <ButtonGroup>
        <IconButton>
          <FcGoogle />
        </IconButton>
        <IconButton>
          <FaGithub />
        </IconButton>
      </ButtonGroup>
    </form>
  );
};

export default LoginForm;
