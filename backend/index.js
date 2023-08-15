const express = require("express")
const User = require("./db/user_model")
const {sq, testDbConnection} = require("./db/db_connection")

const app = express()


app.listen(5000, () => {
    console.log('app is running on port 5000')
})

testDbConnection();

User.sync().then(() => {
    console.log("User Model synced");
  });
