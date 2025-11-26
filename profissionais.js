import { DataTypes } from "sequelize";
import db from "./db.js";

const Profissional = db.define("profissionais", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Profissional;

