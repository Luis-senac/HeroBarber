import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import { router, testarConexao } from "./main.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname)); // Servir frontend
app.use("/api", router);

const PORT = 3000;
app.listen(PORT, async () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
  await testarConexao();
});
