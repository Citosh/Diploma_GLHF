const { DataTypes } = require("sequelize");
const { sq } = require("../db_connection");

const User = sq.define("user", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },

    email: {
      type: DataTypes.STRING,
      unique: true,
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
    },
    info: {
      type: DataTypes.TEXT
    }
  },{
    timestamps : false
  });

  User.sync({alter: true}).then(() => {
    console.log("User Model synced");
  });



  module.exports = User;