"use client";

import { Button } from "@/components/ui/button";
import authService from "@/services/auth-service";
import { useRouter } from "next/navigation";

export default function AuthTestButton() {
  const router = useRouter();
  return (
    <>
      <Button onClick={() => authService.authCheck()}>TEST AUTH API</Button>
      <Button
        onClick={() => {
          authService.logout();
          router.push("/auth");
        }}
      >
        Logout
      </Button>
    </>
  );
}
