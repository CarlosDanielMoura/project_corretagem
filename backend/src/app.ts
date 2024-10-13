// server.ts ou app.ts
import express from "express";
import { routes } from "./routes";
import { errorMiddleware } from "./middleware/error";

const app = express();

app.use(express.json()); // Middleware para parsear JSON

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
