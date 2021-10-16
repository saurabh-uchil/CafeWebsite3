//include express
const express = require('express')
const app = express()

//include data.js
const data = require('./data.js')

//include bcryptjs
const bcrypt = require('bcryptjs')

//Middleware to parse req.body
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Ports to listen
const PORT = process.env.PORT || 3000

//Routes for homepage, users page and schedules page
app.get('/', (req,res) => {
    res.send("Welcome to our schedule website")
})

app.get('/:parameter', (req,res)=>{
    if(req.params.parameter==="users"){
        res.send(data.users)
    }
    else if(req.params.parameter==="schedules"){
        res.send(data.schedules)
    }
    else{
        res.send("Invalid paramter")
    }
})

//Parameterized routes for different users and schedules
app.get('/users/:id', (req, res) =>{
    if(req.params.id>=data.users.length){
        res.send(`We have only ${data.users.length} users, so the max index is ${data.users.length-1}`)
    }
    else if(req.params.id<0 || isNaN(req.params.id)){
        res.send("Enter a valid input")
    }
    else{
        res.send(data.users[req.params.id])
    }
})

//Parameterized routes for different schedules
app.get('/users/:id/schedules', (req, res) =>{
    if(req.params.id>=data.users.length){
        res.send(`We have only ${data.users.length} users, so the max index is ${data.users.length-1}`)
    }
    else if(req.params.id<0 || isNaN(req.params.id)){
        res.send("Enter a valid input")
    }
    else{
        let newArray = []
        for(let i =0; i<data.schedules.length; i++){   
            if(parseInt(data.schedules[i].user_id) == req.params.id){
               newArray.push(data.schedules[i])
            }
        }
        if(newArray.length==0){
            res.send("No schedules found for the given user")
        }else{
            res.send(newArray)
        }
    }

})

//Create new users
app.post('/users', (req, res) => {
    const salt = bcrypt.genSaltSync(10)
    const password = bcrypt.hashSync(req.body.password, salt)
    req.body.password = password 
    data.users.push(req.body)
    res.send(req.body)
})

//Create a new schedule
app.post('/schedules', (req, res) => {
    data.schedules.push(req.body)
    res.send(req.body)
})

//Listen on the given port
app.listen(PORT, () =>{
    console.log(`Port number: ${PORT}`)
})
