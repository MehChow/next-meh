import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen bg-black">
      <Image
        src="/auth-background.jpg"
        alt="auth-background"
        fill={true}
        priority
        className="object-cover object-top opacity-45 blur-sm z-0"
      />
      {children}
    </div>
  );
}
