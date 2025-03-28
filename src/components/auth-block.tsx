"use client";

import Link from "next/link";
import { LogIn, LogOut } from "lucide-react";
import useUserStore from "@/store/user-store";
import { useEffect } from "react";
import authApi from "@/services/auth-api";
import { useRouter } from "next/navigation";

export function AuthBlock() {
  const { user, authStatus, fetchUser, clearUser } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (authStatus === "IDLE") fetchUser();
  }, [fetchUser, authStatus]);

  const handleLogout = async () => {
    await authApi.logout();
    clearUser();
    router.refresh();
  };

  if (authStatus === "LOADING" || authStatus === "IDLE") {
    return <div className="absolute right-0 pr-6">Loading...</div>; // Or a spinner
  }

  if (user) {
    return (
      <div className="absolute right-0 pr-6 flex gap-8">
        <Link href="/dashboard" className="hover:opacity-80 transition flex items-center gap-2">
          {user.username}
        </Link>

        <Link
          href="/"
          className="hover:opacity-80 transition flex items-center gap-2"
          onClick={handleLogout}
        >
          <LogOut />
          Logout
        </Link>
      </div>
    );
  }

  return (
    <div className="absolute right-0 pr-6 flex gap-8">
      <Link href="/auth?tab=Login" className="hover:opacity-80 transition flex items-center gap-2">
        <LogIn />
        Login
      </Link>

      <Link href="/auth?tab=Register" className="hover:opacity-80 transition">
        Register
      </Link>
    </div>
  );
}

export default AuthBlock;
