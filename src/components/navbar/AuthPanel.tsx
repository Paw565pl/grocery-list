import { auth } from "@/auth";
import SignInButton from "./SignInButton";
import SignOutButton from "./SignOutButton";

const AuthPanel = async () => {
  const session = await auth();

  if (!session) return <SignInButton />;

  return (
    <div className="flex items-center gap-2">
      <span>{session.user?.nickname}</span>
      <SignOutButton />
    </div>
  );
};

export default AuthPanel;
