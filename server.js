import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import { router, testarConexao } from "./main.js";
import db from "./db.js";
import Profissional from "./profissionais.js";

const app = express();

// CORREÇÃO
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// FRONT
const frontPath = path.join(__dirname, "front");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// SERVIR ARQUIVOS ESTÁTICOS
app.use(express.static(frontPath));

// API
app.use("/api", router);

// CORREÇÃO AQUI ▶▶ APENAS "/" ENVIA HOME.HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(frontPath, "home.html"));
});

// Seed dos profissionais
const seedProfissionais = async () => {
  const nomes = ["Thiago Mendes", "Henrique Souza", "Lucas Silva"];
  for (const nome of nomes) {
    await Profissional.findOrCreate({ where: { nome } });
  }
  console.log("👨‍🔧 Profissionais criados ou já existentes.");
};

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`🚀 Servidor iniciado na porta ${PORT}`);

  await testarConexao();
  await db.sync({ alter: true });
  await seedProfissionais();

  console.log("🟩 Backend funcionando e front servindo!");
});
