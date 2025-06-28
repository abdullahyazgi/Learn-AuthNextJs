import {Link} from "@mui/material";
import React from 'react'

export const Hero = () => {
  return (
    <div className="mt-7">
      <h1 className="mb-2">Hello AuthNextJS</h1>
      <p>
        Go to <Link href="/login"color="primary">sign in</Link>
      </p>
    </div>
  );
}
