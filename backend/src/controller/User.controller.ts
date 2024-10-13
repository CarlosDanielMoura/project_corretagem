import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/User.service";

const userService = new UserService();

export class UserController {
  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required" });
      return;
    }

    try {
      const user = await userService.register(email, password);
      if (!user) {
        res.status(400).json({ message: "User already exists" });
        return;
      }
      res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
      next(error); // Passa o erro para o middleware de erro global
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required" });
      return;
    }

    try {
      const user = await userService.login(email, password);
      res.status(200).json({ message: "User logged in successfully", user });
    } catch (error) {
      next(error); // Passa o erro para o middleware de erro global
    }
  }
}
