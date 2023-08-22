
const express = require("express")
const User = require("./db/user_model")
const auth_router = require("./auth/auth_router")
let cors = require("cors");
const {testDbConnection} = require("./db/db_connection")



const app = express()

app.use(express.json())
app.use(cors())


app.use("/auth",auth_router)






app.listen(5000, () => {
    console.log('app is running on port 5000')
})

testDbConnection();

User.sync().then(() => {
    console.log("User Model synced");
  });

app.get('/test', (req,res) =>{
    res.json(process.env.DB_PASSWORD || "gay")
})
