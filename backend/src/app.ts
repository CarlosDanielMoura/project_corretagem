// server.ts ou app.ts
import express from "express";
import { routes } from "./routes";
import { errorMiddleware } from "./middleware/error";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    errorMiddleware(err, req, res, next);
  }
);

export { app };
