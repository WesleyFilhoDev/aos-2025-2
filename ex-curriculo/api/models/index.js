import { Sequelize, DataTypes } from "sequelize";
import pessoaModel from "./pessoaModel.js";
import skillModel from "./skillModel.js";
import formacaoModel from "./formacaoModel.js";
import "dotenv/config";

console.log(">>> DATABASE_URL =>", process.env.DATABASE_URL);

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectModule: require("pg"),
  protocol: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  }
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

export default { sequelize, Pessoa, Skill, Formacao };
