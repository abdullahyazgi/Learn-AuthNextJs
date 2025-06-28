import { Stack, Button, Typography } from "@mui/material"
import Link from "next/link";

export const NavBar = () => {
  return (
    <Stack direction="row" spacing={1} sx={{ flexGrow: 1 }}>
      <Typography bgcolor="GrayText"><Link href="/">Auth Nextjs</Link></Typography>
      <Button color="primary">Home</Button>
      <Button color="primary">About</Button>
    </Stack>
  );
}
