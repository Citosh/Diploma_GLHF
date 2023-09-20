const { DataTypes} = require("sequelize");
const { sq } = require("../db_connection");


const FileData = sq.define("filedata", {
    
    path:{
        type: DataTypes.STRING
    }
  });

 module.exports = FileData;