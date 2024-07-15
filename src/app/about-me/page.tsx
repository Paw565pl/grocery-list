import { auth } from "@/auth";
import Image from "next/image";

const AboutMePage = async () => {
  const session = await auth();
  if (!session)
    return (
      <div className="text-red-600">
        You have to be logged in to access this page.
      </div>
    );

  return (
    <>
      <h1 className="text-5xl font-bold">User Info</h1>
      <section>
        <Image
          src={session.user.image || "/noImagePlaceholder.jpg"}
          alt="user image"
          width={150}
          height={150}
        />
        <dl className="space-y-1">
          <div className="flex items-center gap-3">
            <dt className="font-semibold">Email:</dt>
            <dd>{session.user.email}</dd>
          </div>

          <div className="flex items-center gap-3">
            <dt className="font-semibold">Nickname:</dt>
            <dd>{session.user.nickname}</dd>
          </div>
        </dl>
      </section>
    </>
  );
};

export default AboutMePage;
