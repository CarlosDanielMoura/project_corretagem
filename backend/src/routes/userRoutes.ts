import { Router, Request, Response, NextFunction } from "express";
import { UserController } from "../controller/User.controller";
import { logAndSaveSessionData } from "../middleware/logResquestData";
import { authMiddleware } from "../middleware/authMiddleware";

const userController = new UserController();
const router = Router();

router.post(
  "/register",
  logAndSaveSessionData,
  (req: Request, res: Response, next: NextFunction) =>
    userController.register(req, res, next)
);
router.post(
  "/login",
  logAndSaveSessionData,
  (req: Request, res: Response, next: NextFunction) =>
    userController.login(req, res, next)
);

router.get(
  "/auth",
  authMiddleware,
  logAndSaveSessionData,
  (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ message: "Authenticated", user: req.user });
  }
);
export { router };
