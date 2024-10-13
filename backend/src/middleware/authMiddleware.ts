import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { UnauthorizedError } from "../helpers/error-api";

// Tipo do payload que será decodificado do JWT
type JwtPayload = {
  id: number;
};

const prisma = new PrismaClient();

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { authorization } = req.headers;

    // Verifique se o cabeçalho Authorization está presente
    if (!authorization) {
      res.status(401).json({ message: "Token não fornecido" });
      return;
    }

    const token = authorization.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Formato do token incorreto" });
      return;
    }

    const { id } = jwt.verify(token, process.env.JWT_PASS ?? "") as JwtPayload;

    // Busca o usuário no banco de dados
    const user = await prisma.user.findFirst({ where: { id } });

    if (!user) {
      res.status(401).json({ message: "Usuário não autorizado" });
      return;
    }

    // Atribuir o usuário encontrado ao objeto req.user
    req.user = user;

    // Passa o controle para o próximo middleware ou rota
    next();
  } catch (error) {
    console.error("Erro no middleware de autenticação: ", error);
    res.status(401).json({ message: "Token inválido ou expirado" });
    return;
  }
};
