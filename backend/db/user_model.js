const { DataTypes } = require("sequelize");
const { sq } = require("./db_connection");

const User = sq.define("user", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false
    },

    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'USER'
    },
    access_token: {
      type: DataTypes.STRING
    }
  });


  module.exports = User;