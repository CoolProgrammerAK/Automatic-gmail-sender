const express=require('express')
const app=express()
const dotenv=require('dotenv')
dotenv.config()
const userrouter=require('./router/router')


//All credientials information are saved in .env file
app.use(express.json())
app.use("/gmail",userrouter)


app.listen(5000,()=>{
    console.log("connected")
})
