const express = require("express")
const User = require("./db/user_model")
const {sq, testDbConnection} = require("./db/db_connection")

const app = express()
app.use(express.json())


app.listen(5000, () => {
    console.log('app is running on port 5000')
})

testDbConnection();

User.sync().then(() => {
    console.log("User Model synced");
  });



app.get("/getusers", async (req,res) =>{
    const users = await User.findAll()

    res.json(users)
})