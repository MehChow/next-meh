import AuthTab from "@/components/auth/auth-tab";

interface SearchParams {
  tab?: string;
  error?: string;
}

export default async function Auth({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const tab = (await searchParams).tab || "Login";
  const error = (await searchParams).error;

  return (
    <div className="flex items-center justify-center h-screen">
      <AuthTab defaultTab={tab} error={error} />
    </div>
  );
}
