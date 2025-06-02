"use client";

import { Button } from "@/components/ui/button";
import GoogleIcon from "../../../../public/svg/google";
import { useGoogleLogin } from "@react-oauth/google";
import authApi from "@/services/auth-api";

const GoogleAuthButton = () => {
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const response = await authApi.googleLogin(tokenResponse.code);
      console.log(response);
    },
    onError: (error) => console.log(error),
    flow: "auth-code",
    redirect_uri: "http://localhost:3000",
  });

  return (
    <Button
      className="w-[48%] cursor-pointer bg-gradient-to-b from-violet-300 to-slate-200 text-black font-bold hover:opacity-90 hover:scale-105"
      onClick={() => handleGoogleLogin()}
    >
      <GoogleIcon />
      Google
    </Button>
  );
};

export default GoogleAuthButton;
