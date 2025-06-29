"use client";
import { Box, Button, ButtonGroup, IconButton, TextField } from "@mui/material";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";
import { signupAction } from "@/actions/auth.action";
import { SignupSchema } from "@/utils/validaitionSchemas";
import Alert from "@/components/Alert";

const SignupFom = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [clientError, setClientError] = useState("");
  const [serverError, setserverError] = useState("");
  const [serverSuccess, setserverSuccess] = useState("");
  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const user = { email, password, name };
    const validation = SignupSchema.safeParse(user);
    if (!validation.success)
      return setClientError(validation.error.errors[0].message);
    signupAction(user).then((result) => {
      if (result?.error) setserverError(result.error);
      if (result?.success) setserverSuccess(result.success);
    });
    setName("");
    setEmail("");
    setPassword("");
    setClientError("");
  };

  return (
    <Box
      component="form"
      onSubmit={formSubmitHandler}
      sx={{ display: "flex", flexDirection: "column", gap: 3, width: "250px" }}
    >
      <TextField
        id="name"
        label="Name"
        type="text"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
      {clientError ||
        (serverError && (
          <Alert type="error" message={clientError || serverError} />
        ))}
      {serverSuccess && <Alert type="success" message={serverSuccess} />}
      <Button variant="contained" type="submit">
        <Link href="#">Sign up</Link>
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

export default SignupFom;
