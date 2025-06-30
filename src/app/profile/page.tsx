import { auth } from "@/auth";
import { Typography, Box, Button } from "@mui/material";
import { signOutAction } from "@/actions/auth.action";

const ProfilePage = async () => {
  const session = await auth();
  return (
    <Box component="div">
      <Typography component="div">
        {session?.user && (
          <>
            <Typography component="h1" className="text-3xl font-bold mb-7">
              Welcome {session.user.name} to your profile
            </Typography>
            <Box component="form" action={signOutAction}>
                <Button variant="contained" color="primary" type="submit">
                    Sign out
                </Button>
            </Box>
          </>
        )}
      </Typography>
    </Box>
  );
};

export default ProfilePage;
