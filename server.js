import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import { router, testarConexao } from "./main.js";
import db from "./db.js"

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
  console.log(`✅ Servidor rodando em http://postgresql://dpg-d4j0k6fdiees738eni30-a.oregon-postgres.render.com${PORT}`);
  await testarConexao();
});
