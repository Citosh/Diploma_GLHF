const { DataTypes } = require("sequelize");
const { sq } = require("../db_connection");
const Info = require("./info_model")


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
  });



  User.hasOne(Info)
  Info.belongsTo(User)
  
  User.sync({ alter: true })
  .then(() => {
    console.log("User Model synced");
  })
  .catch((error) => {
    console.error("Error syncing User Model:", error);
  });

  Info.sync({ alter: true })
  .then(() => {
    console.log("Info Model synced");
  })
  .catch((error) => {
    console.error("Error syncing User Model:", error);
  });



  module.exports = User;

