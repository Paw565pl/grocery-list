import { drop } from "@mswjs/data";
import "@testing-library/jest-dom/vitest";
import db from "./mocks/db";
import server from "./mocks/server";

beforeAll(() => server.listen());
afterEach(() => {
  drop(db);
  server.resetHandlers();
});
afterAll(() => server.close());

vi.mock("react", async () => {
  const testCache = <T extends (...args: unknown[]) => unknown>(func: T) =>
    func;
  const originalModule = await vi.importActual("react");
  return {
    ...originalModule,
    cache: testCache,
  };
});

// mock server session
vi.mock("@/auth", async () => {
  const originalModule = await vi.importActual("@/auth");

  const auth = vi.fn().mockResolvedValue(null);

  return { ...originalModule, auth };
});

// mock client session
vi.mock("next-auth/react", async () => {
  const originalModule = await vi.importActual("next-auth/react");

  const useSession = vi.fn().mockReturnValue({
    data: null,
    status: "unauthenticated",
    update: vi.fn(),
  });

  return { ...originalModule, useSession };
});

window.HTMLElement.prototype.scrollIntoView = vi.fn();
window.HTMLElement.prototype.hasPointerCapture = vi.fn();
window.HTMLElement.prototype.releasePointerCapture = vi.fn();
