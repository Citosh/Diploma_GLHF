const sequelize = require("sequelize")
const express = require("express")
const auth_router = require("./auth/auth_router")
const admin_router = require("./admin/admin_router")

const user_router = require("./user/user_router")


let cors = require("cors");
const {testDbConnection} = require("./db/db_connection")

const app = express()


app.use(express.json())
app.use(cors())


app.use('/auth',auth_router)
app.use('/admin', admin_router)


app.use('/user', user_router)



app.listen(5000, () => {
    console.log('app is running on port 5000')
})

testDbConnection();


app.get('/test', (req,res) =>{
    res.json(process.env.DB_PASSWORD || "gay")
})
