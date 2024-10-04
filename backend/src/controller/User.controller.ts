import { Request, Response } from "express";
import { UserService } from "../services/User.service";

const userService = new UserService();

export class UserController {
  async register(req: Request, res: Response): Promise<void> {
    // Não retornar explicitamente o Response aqui
    const { email, password } = req.body;
    try {
      if (!email || !password) {
        res.status(400).json({ message: "Email and password are required" });
        return;
      }

      const user = await userService.register(email, password);
      if (!user) {
        res.status(400).json({ message: "User already exists" });
        return;
      }
      res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}
