"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import authApi from "@/services/auth-api";
import { AuthResponse } from "@/types/auth";
import { PROTECTED_ROUTES } from "@/constant/Routes";

interface AuthContextType {
  user: AuthResponse | null;
  setUser: (user: AuthResponse | null) => void;
  isLoading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// List of public routes that don't require authentication

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Check initial auth state
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // User is already logged in, access token is valid
        const userData = await authApi.getUser();
        setUser(userData);
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

    checkAuth();
  }, []);

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
    <AuthContext.Provider value={{ user, setUser, isLoading, logout }}>
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
