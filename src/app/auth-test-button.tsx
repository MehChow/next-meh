"use client";

import { Button } from "@/components/ui/button";
import authApi from "@/services/auth-api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AuthTestButton() {
  const router = useRouter();

  const handleAuthCheck = async () => {
    try {
      const isAuthenticated = await authApi.authCheck();
      if (isAuthenticated) {
        toast.success("You are authenticated!!");
      }
    } catch (error) {
      toast.error("Authentication check failed");
    }
  };

  const handleLogout = async () => {
    try {
      await authApi.logout();
      toast.success("You have successfully logged out");
      router.push("/auth");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <>
      <Button onClick={handleAuthCheck}>TEST AUTH API</Button>
      <Button onClick={handleLogout}>Logout</Button>
    </>
  );
}
