import { PrismaClient } from "@prisma/client";
import { compare, hash } from "bcrypt";
import { BadRequestError, NotFoundError } from "../helpers/error-api";
import { getGenerateToken } from "../helpers/getGenerateToken";

const prisma = new PrismaClient();

export class UserService {
  async register(email: string, password: string) {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new BadRequestError("User already exists");
    }

    const hashedPassword = await hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        // password: false, // O campo "password" não precisa ser retornado
      },
    });

    return newUser;
  }

  async login(email: string, password: string) {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (!existingUser) {
      throw new NotFoundError("User not found");
    }

    const isPasswordValid = await compare(password, existingUser.password);
    if (!isPasswordValid) {
      throw new BadRequestError("Invalid password");
    }

    const token = getGenerateToken(existingUser);
    const { password: _, ...userlogin } = existingUser;

    return { user: userlogin, token };
  }
}
