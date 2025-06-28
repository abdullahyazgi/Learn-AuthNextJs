import { AppBar, Box, Button, Stack, Toolbar } from "@mui/material"
import { NavBar } from "./NavBar"
import Link from "next/link";

export const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ bgcolor: "#ffff" }} position="static">
        <Toolbar>
          <NavBar />
          <Stack direction="row" spacing={1}>
            <Button variant="contained">
              <Link href="/signup">Sign up</Link>
            </Button>
            <Button variant="contained">
              <Link href="/login">Sign in</Link>
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
