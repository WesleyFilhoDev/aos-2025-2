import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Formacao = sequelize.define("Formacao", {
    instituicao: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },  
    },
    curso: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    nivel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    inicio: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    fim: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
  });

  return Formacao;
};