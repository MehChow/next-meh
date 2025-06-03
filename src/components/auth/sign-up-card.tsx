import CardWrapper from "./shared/card-wrapper";
import Separator from "./shared/separator";
import SocialLogin from "./shared/social-login";
import SignUpForm from "./sign-up-form";

interface SignUpCardProps {
  returnUrl?: string;
}

export function SignUpCard({ returnUrl }: SignUpCardProps) {
  return (
    <CardWrapper title="Sign Up" gradient="signup-card">
      <SignUpForm returnUrl={returnUrl} />
      <Separator />
      <SocialLogin returnUrl={returnUrl} />
    </CardWrapper>
  );
}

export default SignUpCard;
