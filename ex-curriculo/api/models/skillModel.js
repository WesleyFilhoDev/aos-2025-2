import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Skill = sequelize.define("Skill", {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    nivel: {
      type: DataTypes.ENUM("iniciante", "intermediário", "avançado", "especialista"),
      allowNull: false,
      validate: { notEmpty: true, isIn: [["iniciante", "intermediário", "avançado", "especialista"]] },
    },
  });

  return Skill;
};