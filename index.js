//Packages to be included
const express = require('express')
const bcryptjs = require('bcryptjs')
const morgan = require('morgan')
const app = express()

//port to listen
const PORT = process.env.PORT || 4000

//middleware for body parser
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//middleare for loggger
app.use(morgan('dev'))

//get request
app.get('/', (req, res) =>{
    res.send("Hello from 3B")
})

//listen on the given port
app.listen(PORT, ()=>{
    console.log("listening on port: "+PORT)
})