import CardWrapper from "./shared/card-wrapper";
import Separator from "./shared/separator";
import SocialLogin from "./shared/social-login";
import SignUpForm from "./sign-up-form";

export function SignUpCard() {
  return (
    <CardWrapper title="Sign Up" gradient="signup-card">
      <SignUpForm />
      <Separator />
      <SocialLogin />
    </CardWrapper>
  );
}

export default SignUpCard;
