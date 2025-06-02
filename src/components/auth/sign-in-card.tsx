import SignInForm from "./sign-in-form";
import CardWrapper from "./shared/card-wrapper";
import Separator from "./shared/separator";
import SocialLogin from "./shared/social-login";

interface SignInCardProps {
  returnUrl?: string;
}

export function SignInCard({ returnUrl }: SignInCardProps) {
  return (
    <CardWrapper title="Sign In" gradient="signin-card">
      <SignInForm returnUrl={returnUrl} />
      <Separator />
      <SocialLogin />
    </CardWrapper>
  );
}

export default SignInCard;
