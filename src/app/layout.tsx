import type { Metadata } from "next";
import { Tektur } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/auth-context";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./globals.css";

const tektur = Tektur({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MEH E-commerce",
  description: "Your one-stop shop for all your needs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${tektur.className}`}>
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
        >
          <AuthProvider>
            <Toaster />
            {children}
          </AuthProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
