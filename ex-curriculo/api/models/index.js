import { Sequelize, DataTypes } from "sequelize";
import pessoaModel from "./pessoaModel.js";
import skillModel from "./skillModel.js";
import formacaoModel from "./formacaoModel.js";
import "dotenv/config";

const sequelize = new Sequelize(process.env.POSTGRES_URL, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  dialectModule: require("pg"),
});

const Pessoa = pessoaModel(sequelize, DataTypes);
const Skill = skillModel(sequelize, DataTypes);
const Formacao = formacaoModel(sequelize, DataTypes);

Pessoa.hasMany(Formacao, {
  foreignKey: "pessoaId",
  as: "formacoes",
  onDelete: "CASCADE",
});

Formacao.belongsTo(Pessoa, {
  foreignKey: "pessoaId",
  as: "pessoa",
});

Pessoa.hasMany(Skill, {
  foreignKey: "pessoaId",
  as: "skills",
  onDelete: "CASCADE",
});

Skill.belongsTo(Pessoa, {
  foreignKey: "pessoaId",
  as: "pessoa",
});

(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Database synchronized successfully");
  } catch (err) {
    console.error("Error syncing database:", err);
  }
})();

export default { sequelize, Pessoa, Skill, Formacao };