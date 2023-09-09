const { DataTypes, UUID } = require("sequelize");
const { sq } = require("../db_connection");


const Info = sq.define("info", {
    firstname:{
        type: DataTypes.STRING
    },
    lastname:{
        type: DataTypes.STRING
    },
    phonenumber:{
        type: DataTypes.STRING
    }
  });

 module.exports = Info;