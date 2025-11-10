import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Pessoa = sequelize.define("Pessoa", {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true, notEmpty: true },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: { notEmpty: false },
    },
    linkedin: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: { isUrl: true },
    },
    github: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: { isUrl: true },
    },
  });

  return Pessoa;
};