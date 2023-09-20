const { DataTypes } = require("sequelize");
const { sq } = require("../db_connection");
const Info = require("./info_model")
const Data = require("./data_model")
const FileData = require("./fileData_model")


const User = sq.define("user", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },

    email: {
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
    
    isbanned:{
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });


  User.hasOne(Info)
  Info.belongsTo(User)
  User.hasMany(Data)
  Data.belongsTo(User)
  User.hasMany(FileData)
  FileData.belongsTo(User)

  
  sq.sync({ alter: true })
  .then(() => {
    console.log("Database synced");
  })
  .catch((error) => {
    console.error("Error syncing User Model:", error);
  });

 


  module.exports = User;

