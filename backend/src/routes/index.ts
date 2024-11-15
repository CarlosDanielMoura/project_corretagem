import { Router } from "express";
import { router as UseRouter } from "./userRoutes";
import { routerClient } from "./clientRoutes";

const routes = Router();

routes.use(UseRouter);
routes.use(routerClient);

export { routes };
