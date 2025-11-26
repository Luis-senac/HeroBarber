// importa a classe Sequelize
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Cria uma nova instância de conexão com o banco de dados
const db = new Sequelize(
    process.env.NAME, // nome do banco
    process.env.USER, // Usuário administrador do banco
    process.env.PASS, // senha do banco
  {
    host: process.env.HOST, // onde o banco está
    dialect: "postgres", // O tipo do banco
    port: Number(process.env.PORT),
    dialectOptions: {
      ssl: { require: true, rejectUnauthorized: false },
    },
    logging: false,
  }
);

db.authenticate()
  .then(function () {
    console.log("Conectado ao banco com sucesso");
  })
  .catch(function (erro) {
    console.log("Erro ao conectar ao banco de dados" + erro);
  });

export default db;
