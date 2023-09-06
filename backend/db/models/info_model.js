const { DataTypes } = require("sequelize");
const { sq } = require("../db_connection");


const Info = sq.define("info", {
    text:{
        type: DataTypes.STRING
    }
  });

 
  
 module.exports = Info;