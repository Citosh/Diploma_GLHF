const sequelize = require("sequelize")
const express = require("express")
const auth_router = require("./auth/auth_router")
const admin_router = require("./admin/admin_router")
<<<<<<< HEAD
=======
const user_router = require("./user/user_router")
const data_gen_router = require("./data_generation/data_gen_router")
>>>>>>> f44d4eeeb31276361b3c9bd759896e0076ffb7ab
let cors = require("cors");
const {testDbConnection} = require("./db/db_connection")

const app = express()

app.use(express.json())
app.use(cors())


app.use('/auth',auth_router)
app.use('/admin', admin_router)
<<<<<<< HEAD
=======
app.use('/data', data_gen_router)
app.use('/user', user_router)



>>>>>>> f44d4eeeb31276361b3c9bd759896e0076ffb7ab


app.listen(5000, () => {
    console.log('app is running on port 5000')
})

testDbConnection();


app.get('/test', (req,res) =>{
    res.json(process.env.DB_PASSWORD || "gay")
})
