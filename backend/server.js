const express = require('express')
const app = express()
require('dotenv').config()

app.listen(process.env.PORT,()=>{
    console.log('App is listen is port ',process.env.PORT);
})