import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

export class UserService {
  async register(email: string, password: string) {
    // Verifica se o usuário já existe
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return null;
    }
    // Hash da senha
    const hashedPassword = await hash(password, 10);
    // Criação do usuário
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        password: false,
      },
    });

    return newUser;
  }
}
