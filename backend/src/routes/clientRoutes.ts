import { Router, Request, Response, NextFunction } from "express";
import { ClientController } from "../controller/Client.controller";
import { authMiddleware } from "../middleware/authMiddleware";
import { logClientCRUDOperations } from "../middleware/logClientCRUDOperations";

const clientController = new ClientController();
const routerClient = Router();

routerClient.post(
  "/client/create",
  logClientCRUDOperations,
  (req: Request, res: Response, next: NextFunction) =>
    clientController.create(req, res)
);

routerClient.get(
  "/client/get/:id?",
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) =>
    clientController.get(req, res)
);

routerClient.delete(
  "/client/delete/:id",
  authMiddleware,
  logClientCRUDOperations,
  (req: Request, res: Response, next: NextFunction) =>
    clientController.delete(req, res)
);

routerClient.patch(
  "/client/update/:id",
  authMiddleware,
  logClientCRUDOperations,
  (req: Request, res: Response, next: NextFunction) =>
    clientController.update(req, res)
);

export { routerClient };
