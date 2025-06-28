import { Button } from '@mui/material';
import Link from 'next/link';
import SignupFom from './SignupForm';

const SignupPage = () => {
  return (
    <section className="mt-7">
      <div>
        <h1>Sign up</h1>
      </div>
      <SignupFom />
      <p>
        Already have an account?
        <Button variant="text" color="primary">
          <Link href="/login">Sign in</Link>
        </Button>
      </p>
    </section>
  );
}

export default SignupPage;