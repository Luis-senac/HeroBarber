import express from "express";
import mysql from "mysql2/promise";

export const router = express.Router();

// Configuração do MySQL
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",        // Ajuste para seu MySQL
  database: "streetbarber_db",
});

// Teste de conexão
export async function testarConexao() {
  try {
    const connection = await pool.getConnection();
    console.log("✅ Conectado ao MySQL com sucesso!");
    connection.release();
  } catch (err) {
    console.error("❌ Erro ao conectar ao MySQL:", err.message);
  }
}

// GET /api/agendamentos
router.get("/agendamentos", async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT a.id, a.nome_cliente, a.email_cliente, a.horarioSelecionado, 
              DATE_FORMAT(a.data_agendamento, '%d/%m/%Y') AS data, a.status, p.nome AS profissional 
       FROM agendamentos a 
       JOIN profissionais p ON a.profissional_id = p.id
       ORDER BY a.data_agendamento ASC`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/agendamentos
router.post("/agendamentos", async (req, res) => {
  const { nome, email, profissional, horarioSelecionado, data_agendamento } = req.body;

  if (!nome || !email || !profissional || !horarioSelecionado || !data_agendamento) {
    return res.status(400).json({ error: "Dados incompletos" });
  }

  try {
    // Obter ID do profissional
    const [profissionalRows] = await pool.query(
      "SELECT id FROM profissionais WHERE nome = ?",
      [profissional]
    );

    if (profissionalRows.length === 0)
      return res.status(400).json({ error: "Profissional não encontrado" });

    const profissional_id = profissionalRows[0].id;

    // Inserir no banco incluindo data_agendamento
    await pool.query(
      "INSERT INTO agendamentos (nome_cliente, email_cliente, profissional_id, horarioSelecionado, data_agendamento, status) VALUES (?, ?, ?, ?, ?, ?)",
      [nome, email, profissional_id, horarioSelecionado, data_agendamento, "pendente"]
    );

    res.json({ message: "Agendamento salvo com sucesso!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});