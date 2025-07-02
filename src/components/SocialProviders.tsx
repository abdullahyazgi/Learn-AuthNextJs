"use client";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { ButtonGroup, IconButton } from "@mui/material";
import { signIn } from "next-auth/react";

type Provider = "github" | "google";

const SocialProviders = () => {

    const socialLoginHandler = (provider: Provider) => {
        signIn(provider, { redirectTo: "/profile" })
    };

  return (
    <>
      <ButtonGroup>
        <IconButton onClick={() => socialLoginHandler("google")}>
          <FcGoogle />
        </IconButton>
        <IconButton onClick={() => socialLoginHandler("github")}>
          <FaGithub />
        </IconButton>
      </ButtonGroup>
    </>
  );
};

export default SocialProviders;
