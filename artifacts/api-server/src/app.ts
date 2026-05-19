import express, { type Express } from "express";
import cors from "cors";
import * as pinoHttpPkg from "pino-http";
import type { IncomingMessage, ServerResponse } from "http";
import router from "./routes";
import { logger } from "./lib/logger";

const pinoHttp =
  typeof pinoHttpPkg === "function"
    ? pinoHttpPkg
    : (pinoHttpPkg as unknown as { default: typeof pinoHttpPkg }).default;

const app: Express = express();

app.use(
  (pinoHttp as unknown as (opts: object) => express.RequestHandler)({
    logger,
    serializers: {
      req(req: IncomingMessage & { id?: unknown; url?: string }) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res: ServerResponse) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

export default app;
