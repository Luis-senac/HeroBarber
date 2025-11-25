// importa a classe Sequelize
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Cria uma nova instância de conexão com o banco de dados
const db = new Sequelize(
  , // nome do banco
  , // Usuário administrador do banco
  , // senha do banco
  {
    host: , // onde o banco está
    dialect: "postgres", // O tipo do banco
    port: Number(),
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
