import { auth } from "@/auth";
import { Session } from "next-auth";
import { SessionContextValue, useSession } from "next-auth/react";

export const validSession: Session = {
  user: {
    id: "1",
    nickname: "test",
    email: "test@test.com",
  },
  expires: new Date(Date.now() + 3600000).toISOString(),
};

const mockSession = (session: Session | null) => {
  const sessionContext: Omit<SessionContextValue, "update"> = {
    data: session,
    status: session ? "authenticated" : "unauthenticated",
  };

  vi.mocked(auth).mockResolvedValue(session as any);
  vi.mocked(useSession).mockReturnValue({
    ...sessionContext,
    update: vi.fn(),
  } as any);
};

export default mockSession;
