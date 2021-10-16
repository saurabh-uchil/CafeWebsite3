//include express
const express = require('express')
const app = express()

//include data.js
const data = require('./data.js')

//Ports to listen
const PORT = process.env.PORT || 3000

app.get('/', (req,resp) => {
    resp.send("Welcome to our schedule website")
})

app.get('/:parameter', (req,resp)=>{
    if(req.params.parameter==="users"){
        resp.send(data.users)
    }
    else if(req.params.parameter==="schedules"){
        resp.send(data.schedules)
    }
    else{
        resp.send("Invalid paramter")
    }
})

//Listen on the given port
app.listen(PORT, () =>{
    console.log(`Port number: ${PORT}`)
})
