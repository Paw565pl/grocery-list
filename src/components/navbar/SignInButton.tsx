import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";

const SignInButton = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("auth0");
      }}
    >
      <Button type="submit">Sign in</Button>
    </form>
  );
};

export default SignInButton;
