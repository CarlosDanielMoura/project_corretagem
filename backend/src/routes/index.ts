import { Router } from "express";
import { router as UseRouter } from "./userRoutes";

const routes = Router();

routes.use(UseRouter);

export { routes };
