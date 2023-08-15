const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('diploma', 'postgres', 'admin', {
    host: 'localhost',
    dialect:  'postgres'
  });
 const testDbConnection = async () => {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  };

  module.exports = { sq: sequelize, testDbConnection };