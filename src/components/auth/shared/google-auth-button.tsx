"use client";

import { Button } from "@/components/ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import authApi from "@/services/auth-api";
import GoogleIcon from "../../../../public/svg/google";
import { AuthErrorType } from "@/types/auth";
import { toast } from "sonner";

interface GoogleAuthButtonProps {
  returnUrl?: string;
}

const GoogleAuthButton = ({ returnUrl }: GoogleAuthButtonProps) => {
  const { setUser } = useAuth();
  const router = useRouter();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const response = await authApi.googleLogin(tokenResponse.code);

      // If login is successful, set userInfo in Zustand store
      setUser(response.data);

      // Redirect to returnUrl if it exists, otherwise go to home
      if (returnUrl) {
        router.replace(decodeURIComponent(returnUrl));
      } else {
        router.replace("/");
      }
    },
    onError: (error) => {
      const authError = error as AuthErrorType;
      switch (authError.code) {
        case "GOOGLE_AUTH_ERROR":
          toast.error("Google authentication failed");
          break;
        default:
          toast.error(authError.message);
      }
    },
    flow: "auth-code",
    redirect_uri: "http://localhost:3000",
  });

  return (
    <Button
      className="w-[100%] cursor-pointer bg-gradient-to-b from-violet-300 to-slate-200 text-black font-bold hover:opacity-90 hover:scale-105"
      onClick={() => handleGoogleLogin()}
    >
      <GoogleIcon />
      Google
    </Button>
  );
};

export default GoogleAuthButton;
