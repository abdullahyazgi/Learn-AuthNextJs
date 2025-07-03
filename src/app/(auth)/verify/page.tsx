
interface VerifyPageProps {
  searchParams: Promise<{ token: string }>;
}

const VerifyPage = async ({searchParams}: VerifyPageProps) => {
    const currentSearchParams = await searchParams;
    console.log(currentSearchParams);
  return (
    <div>
        <h3>
            Your email has been verifyed
        </h3>
    </div>
  )
}

export default VerifyPage;