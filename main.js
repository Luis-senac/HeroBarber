import express from "express";
import Profissional from "./profissionais.js";
import sequelize from "./db.js";
import Agendamento from "./agendamento.js"; // AGORA FUNCIONA

export const router = express.Router();

Agendamento.belongsTo(Profissional, { foreignKey: "profissional_id" });
Profissional.hasMany(Agendamento, { foreignKey: "profissional_id" });

// TESTAR CONEXÃO
export async function testarConexao() {
  try {
    await sequelize.authenticate();
    console.log("✅ Conectado ao PostgreSQL Render!");
  } catch (err) {
    console.error("❌ ERRO ao conectar ao PostgreSQL:", err.message);
  }
}

// ROTAS ----------------------------------------------

// GET /agendamentos
router.get("/agendamento", async (req, res) => {
  try {
    const agendamentos = await Agendamento.findAll({
      include: [{ model: Profissional }],
      order: [["data_agendamento", "ASC"]],
    });

    res.json(agendamentos);
  } catch (erro) {
    res.status(500).json({ error: erro.message });
  }
});

// POST /agendamentos
router.post("/agendamento", async (req, res) => {
  const { nome, email, profissional, horarioSelecionado, data_agendamento } =
    req.body;

  // Verificar dados obrigatórios
  if (!nome || !email || !profissional || !horarioSelecionado || !data_agendamento) {
    return res.status(400).json({ error: "Dados incompletos" });
  }

  try {
    // Corrigir o formato da data
    const dataFormatada = data_agendamento.split("T")[0];

    const profissionalEncontrado = await Profissional.findOne({
      where: { nome: profissional },
    });

    if (!profissionalEncontrado) {
      return res.status(400).json({ error: "Profissional não encontrado" });
    }

    await Agendamento.create({
      nome_cliente: nome,
      email_cliente: email,
      profissional_id: profissionalEncontrado.id,
      horarioSelecionado,
      data_agendamento: dataFormatada,
      status: "pendente",
    });

    res.json({ message: "Agendamento salvo com sucesso!" });
  } catch (erro) {
    res.status(500).json({ error: erro.message });
  }
});
