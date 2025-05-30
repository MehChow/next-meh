"use client";

import authApi from "@/services/auth-api";
import { useEffect } from "react";

export function DashboardPage() {
  const checkAuth = async () => {
    const response = await authApi.getUser();
    console.log(response);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return <div className="flex items-center justify-center h-screen"></div>;
}

export default DashboardPage;
