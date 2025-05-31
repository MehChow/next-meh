import AuthTab from "@/components/auth/auth-tab";

interface SearchParams {
  tab?: string;
  error?: string;
  returnUrl?: string;
}

export default async function Auth({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { tab = "Login", error, returnUrl } = await searchParams;

  return (
    <div className="flex items-center justify-center h-screen">
      <AuthTab defaultTab={tab} error={error} returnUrl={returnUrl} />
    </div>
  );
}
