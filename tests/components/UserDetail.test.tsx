import UserDetail from "@/components/userDetail";
import { render, screen } from "@testing-library/react";
import { validSession } from "../mocks/auth";

describe("UserDetail", () => {
  it("should render user details", () => {
    render(<UserDetail session={validSession} />);
    const { user } = validSession;

    const image = screen.getByRole("img");
    const email = screen.getByText(user.email || "");
    const nickname = screen.getByText(user.nickname || "");

    expect(image).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(nickname).toBeInTheDocument();
  });
});
