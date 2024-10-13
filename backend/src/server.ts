import { app } from "./app";
import "dotenv/config";

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta htttp://localhost:${PORT}`);
});
