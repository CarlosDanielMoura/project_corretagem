import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const logClientCRUDOperations = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const logContent = {
    body: req.body,
    headers: req.headers,
    query: req.query,
    params: req.params,
    method: req.method,
    url: req.url,
    statusCode: 0,
  };

  let actionType = "";
  if (req.method === "POST") actionType = "CREATE";
  else if (req.method === "GET") actionType = "READ";
  else if (req.method === "PUT" || req.method === "PATCH")
    actionType = "UPDATE";
  else if (req.method === "DELETE") actionType = "DELETE";

  // Extrair o ID do usuário do token JWT e garantir que seja do tipo number
  let userId: number | null = null;
  const authHeader = req.headers.authorization;
  console.log("Authorization Header:", authHeader);

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    console.log("Token JWT:", token);

    try {
      const decodedToken = jwt.verify(
        token,
        process.env.JWT_PASS as string
      ) as jwt.JwtPayload;
      userId = decodedToken.id ? parseInt(decodedToken.id as string, 10) : null; // Converte id para number
      console.log("ID do usuário:", userId);
    } catch (error) {
      console.error("Erro ao decodificar o token JWT:", error);
    }
  }

  next();

  res.on("finish", async () => {
    logContent.statusCode = res.statusCode;
    const requestBody =
      actionType === "DELETE"
        ? JSON.stringify(req.params)
        : JSON.stringify(req.body);

    try {
      // Cria o log e associa o userId
      await prisma.clientLogs.create({
        data: {
          actionType,
          url: logContent.url,
          method: logContent.method,
          statusCode: logContent.statusCode,
          requestBody,
          responseBody: logContent.statusCode < 400 ? "Success" : "Error",
          timestamp: new Date(),
          userId, // Agora userId é o valor correto do campo `id` do token
        },
      });

      console.log(`Operação de cliente ${actionType} registrada com sucesso.`);
    } catch (error) {
      console.error("Erro ao registrar operação de cliente:", error);
    }
  });
};

export { logClientCRUDOperations };
