import { delay, HttpRequestHandler, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import db from "./db";

export const simulateApiError = (
  endpoint: string,
  method: HttpRequestHandler,
) => server.use(method(endpoint, () => HttpResponse.error()));

export const simulateApiDelay = (
  endpoint: string,
  method: HttpRequestHandler,
) =>
  server.use(
    method(endpoint, async () => {
      await delay();
      return HttpResponse.json([]);
    }),
  );

export const simulateApiEmptyResponse = (
  endpoint: string,
  method: HttpRequestHandler,
) => server.use(method(endpoint, () => HttpResponse.json([])));

const handlers = [
  ...db.category.toHandlers("rest"),
  ...db.product.toHandlers("rest"),
];

const server = setupServer(...handlers);

export default server;
