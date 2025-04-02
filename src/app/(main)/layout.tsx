import type { Metadata } from "next";
import NavBar from "@/components/nav-bar";
import Logo from "@/components/logo";
import AuthBlock from "@/components/auth-block";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-lvh bg-orange-100">
      <header className="flex items-center justify-center top-0 bg-white/40 h-24 sticky w-full backdrop-blur-sm z-99">
        <Logo />
        <NavBar />
        <AuthBlock />
      </header>

      {children}
    </div>
  );
}
