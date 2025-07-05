import { verifyingEmailAction } from "@/actions/verification.action";
import { GoVerified } from "react-icons/go";
import { VscError } from "react-icons/vsc";
import Link from "next/link";

interface VerifyPageProps {
  searchParams: Promise<{ token: string }>;
}

const VerifyPage = async ({ searchParams }: VerifyPageProps) => {
  const currentSearchParams = await searchParams;
  const result = await verifyingEmailAction(currentSearchParams.token);
  return (
    <div className="text-center mt-10">
      {result.success ? (
        <div className="flex items-center justify-center flex-col">
          <GoVerified className="text-green-700 text-8xl" />
          <h3>Email Verified</h3>
          <p>your email verified</p>
        </div>
      ) : (
        <div className="flex items-center justify-center flex-col">
          <VscError className="text-red-700 text-8xl" />
          <h3>Error</h3>
          <p>Somthing went wrong, try again</p>
        </div>
      )}

      <Link href="/login">Go to login</Link>
    </div>
  );
};

export default VerifyPage;
