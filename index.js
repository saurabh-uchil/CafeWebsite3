//include express
const express = require('express')
const app = express()


//include data.js
const data = require('./data.js')

//include bcryptjs
const bcrypt = require('bcryptjs')

//Morgan logger
const morgan = require('morgan') 
app.use(morgan('dev'))

//Middleware to parse req.body
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Regex for validation
const regexForEmail = /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/
const regexForNumbers = /\d/
const regexForSpecialCharacters = /[-|$|=|_|(|)|{|}|:|;|'|"|.|>|<|,|!|@|#|%|^|&|?|\/|\\|\||~|`|*]/

//Ports to listen
const PORT = process.env.PORT || 3000

//For creating and using views
app.set('view engine', 'ejs')

// For css and images
app.use(express.static('css'))

//Routes for homepage, users page and schedules page
app.get('/', (req,res) => {
    /* res.send("Welcome to our schedule website") */
    res.render('pages/homepage')
})

app.get('/:parameter', (req,res)=>{
    if(req.params.parameter==="users"){
        /* res.send(data.users) */
        res.render('pages/users',{
            users: data.users
        })
    }
    else if(req.params.parameter==="schedules"){
        /* res.send(data.schedules) */
        res.render('pages/schedules',{
            schedules: data.schedules
        })
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
    else if(req.params.id ==='add'){
        res.render('pages/addusers')
    }
    else if(req.params.id<0 || isNaN(req.params.id)){
        res.send("Enter a valid input")
    }
    else{
       /*  res.send(data.users[req.params.id]) */
       res.render('pages/indusers', {
           user: data.users,
           param: req.params.id
       })
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
           /*  res.send(newArray) */
           res.render('pages/indschedules', {
               schedule: newArray
           })
        }
    }

})

//Create new users
app.post('/users', (req, res) => {
    //Validating inputs for user values
    if(req.body.firstname==null||req.body.firstname==""||regexForNumbers.test(req.body.firstname)||regexForSpecialCharacters.test(req.body.firstname)){
        /* res.send("Enter a valid first name") */
        console.log("Enter a valid first name")
    }
    else if(req.body.lastname==null||req.body.lastname==""||regexForNumbers.test(req.body.lastname)||regexForSpecialCharacters.test(req.body.lastname)){
        res.send("Enter a valid last name")
    }
    else if(req.body.email==null||req.body.email==""||!regexForEmail.test(req.body.email)){
        res.send("Enter a valid email address")
    }
    else if(req.body.password==null||req.body.password==""){
        res.send("Password cannot be empty")
    }
    else{
        const salt = bcrypt.genSaltSync(10)
        const password = bcrypt.hashSync(req.body.password, salt)
        req.body.password = password 
        data.users.push(req.body)
       /*  res.send(req.body) */
        res.redirect('/users')
    }    
})

//Create a new schedule
app.post('/schedules', (req, res) => {

    //Validating inputs for schedule values
    if(req.body.user_id==null|| req.body.user_id==""){
        res.send("User Id cannot be empty")
    }
    else if(isNaN(req.body.user_id)||req.body.user_id >= data.users.length){
        res.send("Enter a valid user id")
    }
    else if(req.body.day==""||req.body.day==null||isNaN(req.body.day)){
        res.send("Enter a valid day")
    }
    else if(req.body.start_at==""||req.body.start_at==null){
        res.send("Enter a valid start time")
    }
    else if(req.body.end_at==null||req.body.end_at==""){
        res.send("Enter a valid end time")
    }
    else{
        data.schedules.push(req.body)
        /* res.send(req.body) */
        res.redirect('/schedules')
    }
   
})

//Prevent from directly accessing individual schedules
app.get('/schedules/:id', (req,res)=>{
    if(req.params.id==='add'){
        res.render('pages/addschedules')
    }
    res.send("You cannot access the individual schedules directly, you should use aany of the given users")
})

//Listen on the given port
app.listen(PORT, () =>{
    console.log(`Port number: ${PORT}`)
})
