import { auth } from "@/auth";
import UserDetail from "@/components/userDetail";

const AboutMePage = async () => {
  const session = await auth();
  if (!session)
    return (
      <div className="text-red-600">
        You have to be logged in to access this page.
      </div>
    );

  return <UserDetail session={session} />;
};

export default AboutMePage;
