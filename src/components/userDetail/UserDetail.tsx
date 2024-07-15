import { Session } from "next-auth";
import Image from "next/image";

interface UserDetailProps {
  session: Session;
}

const UserDetail = ({ session }: UserDetailProps) => {
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
        <dl>
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

export default UserDetail;
