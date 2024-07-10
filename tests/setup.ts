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
  const testCache = <T extends (...args: Array<unknown>) => unknown>(func: T) =>
    func;
  const originalModule = await vi.importActual("react");
  return {
    ...originalModule,
    cache: testCache,
  };
});

window.HTMLElement.prototype.scrollIntoView = vi.fn();
window.HTMLElement.prototype.hasPointerCapture = vi.fn();
window.HTMLElement.prototype.releasePointerCapture = vi.fn();
