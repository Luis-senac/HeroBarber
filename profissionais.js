import { DataTypes } from "sequelize";
import sequelize from "./db.js";

const Profissional = sequelize.define("profissionais", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Profissional;
