// server.ts ou app.ts

import express from "express";
import { routes } from "./routes";

const app = express();

app.use(express.json()); // Middleware para parsear JSON
app.use(express.urlencoded({ extended: true })); // Middleware para parsear URL-encoded
app.use(routes);

export { app };
