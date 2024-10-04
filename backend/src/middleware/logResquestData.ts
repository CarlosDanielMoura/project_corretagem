import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const logAndSaveSessionData = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // Captura o conteúdo da requisição antes de passar o controle ao próximo middleware ou controlador

  const logContent = {
    body: req.body,
    headers: req.headers,
    query: req.query,
    params: req.params,
    method: req.method,
    url: req.url,
    statusCode: 0,
  };

  // Executa a função `next()` para passar a requisição ao próximo middleware ou controlador
  next();

  // Ouvindo o evento `finish`, que é disparado quando a resposta é enviada ao cliente
  res.on("finish", async () => {
    logContent.statusCode = res.statusCode;
    logContent.body["password"] = null;
    try {
      const {
        actionAccess,
        o_location,
        is_sensitive_data_access,
        previous_sessions_count,
        average_session_duration,
        avg_actions_per_session,
        threat_level_prediction,
        email, // Capturando o email da requisição
      } = req.body;

      const user = await prisma.user.findUnique({
        where: { email },
      });

      let foundUserId = null;
      if (user) {
        if (res.statusCode === 201) {
          // Criado com sucesso ele atribui ID do usuário
          foundUserId = user.id;
        } else {
          // Se não, ele não atribui ID do usuário
          foundUserId = null;
        }
      }

      // Salvando a sessão de análise no banco de dados após a resposta ter sido enviada
      await prisma.sessionAnalysis.create({
        data: {
          actionAccess,
          o_location,
          is_sensitive_data_access,
          previous_sessions_count: previous_sessions_count || 0,
          average_session_duration,
          avg_actions_per_session,
          threat_level_prediction,
          userId: foundUserId,
          contentLog: JSON.stringify(logContent) || "",
        },
      });

      console.log("Sessão de análise salva com sucesso após a resposta.");
    } catch (error) {
      console.error("Erro ao salvar a sessão de análise:", error);
    }
  });
};

export { logAndSaveSessionData };
