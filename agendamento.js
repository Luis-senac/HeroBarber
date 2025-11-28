// agendamentos.js
import { DataTypes } from "sequelize";
import db from "./db.js";

const Agendamento = db.define("agendamento", {
  nome_cliente: DataTypes.STRING,
  email_cliente: DataTypes.STRING,
  horarioSelecionado: DataTypes.STRING,
  data_agendamento: DataTypes.DATEONLY,
  status: DataTypes.STRING,
  profissional_id: DataTypes.INTEGER,
});

export default Agendamento;
