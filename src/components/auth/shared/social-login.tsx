import GoogleAuthButton from "./google-auth-button";

interface SocialLoginProps {
  returnUrl?: string;
}

export function SocialLogin({ returnUrl }: SocialLoginProps) {
  return (
    <div className="flex justify-between">
      <GoogleAuthButton returnUrl={returnUrl} />
    </div>
  );
}

export default SocialLogin;
