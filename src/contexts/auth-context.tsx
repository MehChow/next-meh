"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import authApi from "@/services/auth-api";
import { AUTH_ROUTES, PROTECTED_ROUTES } from "@/constant/Routes";
import { User } from "@/types/auth";

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// List of public routes that don't require authentication

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const checkAuth = async () => {
    try {
      // User is already logged in, access token is valid
      const response = await authApi.getUser();
      setUser(response.data);
    } catch (error) {
      // User is not logged in, access token is invalid
      setUser(null);
      // Only redirect if trying to access protected route
      if (PROTECTED_ROUTES.some((route) => pathname?.startsWith(route))) {
        const returnUrl = encodeURIComponent(pathname);
        router.push(`/auth?tab=Login&returnUrl=${returnUrl}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Only run the initial auth check if we're on a protected route
  useEffect(() => {
    if (!AUTH_ROUTES.some((route) => pathname?.startsWith(route))) {
      checkAuth();
    } else {
      setIsLoading(false);
    }
  }, [pathname]);

  const logout = async () => {
    try {
      await authApi.logout();
      setUser(null);
      // Only redirect if on a protected route
      if (PROTECTED_ROUTES.some((route) => pathname?.startsWith(route))) {
        router.push("/");
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, isLoading, logout, checkAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
