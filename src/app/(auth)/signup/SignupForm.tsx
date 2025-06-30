"use client";
import { Box, Button, ButtonGroup, IconButton, TextField } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";
import { signupAction } from "@/actions/auth.action";
import { SignupSchema } from "@/utils/validaitionSchemas";
import Alert from "@/components/Alert";
import Spinner from "@/components/Spinner";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [clientError, setClientError] = useState("");
  const [loading, setLoading] = useState(false);
  const [serverError, setserverError] = useState("");
  const [serverSuccess, setserverSuccess] = useState("");
  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const user = { email, password, name };
    const validation = SignupSchema.safeParse(user);
    if (!validation.success)
      return setClientError(validation.error.errors[0].message);

    setLoading(true);
    signupAction(user).then((result) => {
      if (result.success) {
        setClientError("");
        setserverError("");
        setName("");
        setEmail("");
        setPassword("");
        setserverSuccess(result.message);
      }
      if (!result.success) {
        setserverSuccess("");
        setserverError(result.message);
      }
      setLoading(false);
    });
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
      <Button disabled={loading} variant="contained" type="submit">
        {loading ? <Spinner /> : <>Sign up</>}
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

export default SignupForm;
