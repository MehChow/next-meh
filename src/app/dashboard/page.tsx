"use client";

import { Button } from "@/components/ui/button";
import useUserStore from "@/store/user-store";

export function DashboardPage() {
  const { fetchUser, user } = useUserStore();

  return (
    <div className="flex items-center justify-center h-screen">
      <Button onClick={async () => await fetchUser()}>Test GetUser API</Button>
    </div>
  );
}

export default DashboardPage;
