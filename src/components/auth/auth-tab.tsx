"use client";

import { useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import SignInCard from "@/components/auth/sign-in-card";
import SignUpCard from "@/components/auth/sign-up-card";
import { useEffect } from "react";
import { toast } from "sonner";

export function AuthTab({
  defaultTab,
  error,
}: {
  defaultTab: string;
  error: string | undefined;
}) {
  const router = useRouter();

  const handleTabChange = (value: string) => {
    // Update the URL with the new tab value
    router.replace(`/auth?tab=${value}`, { scroll: false });
  };

  useEffect(() => {
    if (error === "session_expired") {
      toast.error("Your session has expired. Please login again.");
    }
  }, [error]);

  return (
    <Tabs
      defaultValue={defaultTab}
      className="fixed w-[600px]"
      onValueChange={handleTabChange}
    >
      <TabsList className="w-full mb-2 bg-slate-300">
        <TabsTrigger value="Login">Login</TabsTrigger>
        <TabsTrigger value="Register">Register</TabsTrigger>
      </TabsList>

      <TabsContent value="Login">
        <SignInCard />
      </TabsContent>

      <TabsContent value="Register">
        <SignUpCard />
      </TabsContent>
    </Tabs>
  );
}

export default AuthTab;
