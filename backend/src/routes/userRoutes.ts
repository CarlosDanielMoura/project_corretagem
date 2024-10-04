import { Router } from "express";
import { UserController } from "../controller/User.controller";
import { logAndSaveSessionData } from "../middleware/logResquestData";

const userController = new UserController();
const router = Router();

router.post("/register", logAndSaveSessionData, (req, res) =>
  userController.register(req, res)
);
export { router };
