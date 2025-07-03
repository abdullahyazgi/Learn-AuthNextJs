"use client";
import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { LoginSchema } from "@/utils/validaitionSchemas";
import Alert from "@/components/Alert";
import { loginAction } from "@/actions/auth.action";
import Spinner from "@/components/Spinner";
import SocialProviders from "@/components/SocialProviders";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [clientError, setClientError] = useState("");

  const [loading, setLoading] = useState(false);

  const [serverError, setserverError] = useState("");
  const [serverSuccess, setserverSuccess] = useState("");
  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = LoginSchema.safeParse({ email, password });
    if (!validation.success)
      return setClientError(validation.error.errors[0].message);

    setLoading(true);
    loginAction({ email, password }).then((result) => {
      if(result.success) {
        setClientError("");
        setserverError("");
        setEmail("");
        setPassword("");
        setserverSuccess(result.message);
      }
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
        {serverSuccess && <Alert type="success" message={serverSuccess} />}
      <Button disabled={loading} variant="contained" type="submit">
        {loading ? <Spinner /> : <>Sign in</>}
      </Button>
      <SocialProviders />
    </Box>
  );
};

export default LoginForm;
