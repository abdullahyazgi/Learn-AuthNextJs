"use client";
import { Box, Button, ButtonGroup, IconButton, TextField } from "@mui/material";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";
import { LoginSchema } from "@/utils/validaitionSchemas";
import Alert from "@/components/Alert";
import { loginAction } from "@/actions/auth.action";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [clientError, setClientError] = useState("");
  const [serverError, setserverError] = useState("");
  const [serverSuccess, setserverSuccess] = useState("");
  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = LoginSchema.safeParse({ email, password });
    if (!validation.success)
      return setClientError(validation.error.errors[0].message);
    loginAction({ email, password }).then((result) => {
      if(result?.error) setserverError(result.error);
      if(result?.success) setserverSuccess(result.success);
    });
    setEmail("");
    setPassword("");
    setClientError("");
  };

  return (
    <Box
      component="form"
      onSubmit={formSubmitHandler}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "250px",
      }}
    >
      <TextField
        id="email"
        label="Email"
        type="email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        id="password"
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {clientError || serverError && <Alert type="error" message={clientError || serverError} />}
      {serverSuccess && <Alert type="success" message={serverSuccess} />}
      <Button variant="contained" type="submit">
        <Link href="#">Sign in</Link>
      </Button>
      <ButtonGroup>
        <IconButton>
          <FcGoogle />
        </IconButton>
        <IconButton>
          <FaGithub />
        </IconButton>
      </ButtonGroup>
    </Box>
  );
};

export default LoginForm;
