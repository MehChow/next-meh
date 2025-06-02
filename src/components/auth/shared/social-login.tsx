import { Button } from "@/components/ui/button";
import GoogleAuthButton from "./google-auth-button";
import GithubIcon from "../../../../public/svg/github";

export function SocialLogin() {
  return (
    <div className="flex justify-between">
      <GoogleAuthButton />
      <Button className="w-[48%] cursor-pointer bg-gradient-to-b from-violet-300 to-slate-200 text-black font-bold hover:opacity-90 hover:scale-105">
        <div className="flex items-center bg-white rounded-full">
          <GithubIcon />
        </div>
        Github
      </Button>
    </div>
  );
}

export default SocialLogin;
