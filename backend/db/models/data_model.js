const { DataTypes} = require("sequelize");
const { sq } = require("../db_connection");


const Data = sq.define("data", {
    quantity:{
        type: DataTypes.INTEGER
    },
    date:{
        type: DataTypes.DATEONLY
    }
  });

 module.exports = Data;