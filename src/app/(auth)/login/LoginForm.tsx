"use client";
import { Box, Button, ButtonGroup, IconButton, TextField } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";
import { LoginSchema } from "@/utils/validaitionSchemas";
import Alert from "@/components/Alert";
import { loginAction } from "@/actions/auth.action";
import Spinner from "@/components/Spinner";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [clientError, setClientError] = useState("");

  const [loading, setLoading] = useState(false);

  const [serverError, setserverError] = useState("");
  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = LoginSchema.safeParse({ email, password });
    if (!validation.success)
      return setClientError(validation.error.errors[0].message);

    setLoading(true);
    loginAction({ email, password }).then((result) => {
      if(!result.success) setserverError(result.message);
      setLoading(false);
    });
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
        disabled={loading}
      />
      <TextField
        id="password"
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
      />
      {clientError ||
        (serverError && (
          <Alert type="error" message={clientError || serverError} />
        ))}
      <Button disabled={loading} variant="contained" type="submit">
        {loading ? <Spinner /> : <>Sign in</>}
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
