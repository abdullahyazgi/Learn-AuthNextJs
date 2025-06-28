import Link from 'next/link';
import React from 'react'
import LoginForm from '@/app/(auth)/login/LoginForm';
import { Button } from '@mui/material';

const loginPage = () => {
  return (
    <section className="mt-7">
      <div>
        <h1>Sign in</h1>
      </div>
      <LoginForm />
      <p>
        Do not have an account?
        <Button variant='text' color="primary">
          <Link href="/signup">Sign up</Link>
        </Button>
      </p>
    </section>
  );
}

export default loginPage;