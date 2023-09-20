const { DataTypes} = require("sequelize");
const { sq } = require("../db_connection");


const Data = sq.define("data", {
    name:{
        type: DataTypes.STRING
    },
    quantity:{
        type: DataTypes.INTEGER
    },
    date:{
        type: DataTypes.DATEONLY
    }
  });

 module.exports = Data;