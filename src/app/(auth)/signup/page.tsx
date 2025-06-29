import { Box, Typography, Link } from "@mui/material";
import SignupFom from "./SignupForm";

const SignupPage = () => {
  return (
    <Box component="section" className="mt-7">
      <Box component="div">
        <Typography component="h1">Sign up</Typography>
      </Box>
      <SignupFom />
      <Typography component="p">
        Already have an account?
        <Link href="/login"> Sign in</Link>
      </Typography>
    </Box>
  );
};

export default SignupPage;
