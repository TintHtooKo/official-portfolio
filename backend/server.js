const express = require('express')
const app = express()
const mongoose = require('mongoose')
const mongoURL = ('mongodb+srv://tinthtooko:htookoanan241364@cluster0.xzccfmm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const Role = require('./route/RoleRoute')
const User = require('./route/UserRoute')
require('dotenv').config()

mongoose.connect(mongoURL).then(()=>{
    console.log('db connected');
    app.listen(process.env.PORT,()=>{
        console.log('App is listen is port ',process.env.PORT);
    })
})

app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}))
app.use(express.json())
app.use(cookieParser())
app.use('/role',Role)
app.use('/user',User)

