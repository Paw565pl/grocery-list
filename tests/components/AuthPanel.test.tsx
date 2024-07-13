import AuthPanel from "@/components/navbar/AuthPanel";
import { render, screen } from "@testing-library/react";
import { Session } from "next-auth";
import mockSession, { validSession } from "../mocks/auth";

describe("AuthPanel", () => {
  const renderComponent = async (session: Session | null) => {
    mockSession(session);
    render(await AuthPanel());

    const getSignInButton = () => screen.queryByRole("button", { name: /in/i });
    const getSignOutButton = () =>
      screen.queryByRole("button", { name: /out/i });
    const getNickname = () => {
      if (!session?.user.nickname) return null;

      return screen.queryByText(new RegExp(session.user.nickname, "i"));
    };

    return {
      getSignInButton,
      getSignOutButton,
      getNickname,
    };
  };

  it("should render sign in button if user is not authenticated", async () => {
    const { getSignInButton, getSignOutButton, getNickname } =
      await renderComponent(null);

    expect(getSignInButton()).toBeInTheDocument();
    expect(getSignOutButton()).not.toBeInTheDocument();
    expect(getNickname()).not.toBeInTheDocument();
  });

  it("should render nickname and sign out button if user is authenticated", async () => {
    const { getSignInButton, getSignOutButton, getNickname } =
      await renderComponent(validSession);

    expect(getSignInButton()).not.toBeInTheDocument();
    expect(getSignOutButton()).toBeInTheDocument();
    expect(getNickname()).toBeInTheDocument();
  });
});
