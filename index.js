//include express
const express = require('express')
const app = express()
const alert = require('alert')


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

//Database 
const db = require('./database') 

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
        db.any('SELECT * FROM users;')
        .then((data) => {
            res.render('pages/users',{
                users: data
            }) 
            res.end()
             
        })
        .catch((err) =>{
            res.send(err)
            res.end()
        })
        
    }
    else if(req.params.parameter==="schedules"){
        /* res.send(data.schedules) */
        db.any('SELECT * FROM schedules;')
        .then((data) => {
            res.render('pages/schedules',{
                schedules: data
            }) 
            res.end()
             
        })
        .catch((err) =>{
            res.send(err)
            res.end()
        })
    }
    
    else if(req.params.parameter==="addusers"){
        res.render('pages/addusers')
    }

    else if(req.params.parameter==="addschedules"){
        res.render('pages/addschedules')
    }

    else{
        res.send("Invalid paramter")
    }
})

//Create new users
app.post('/users', (req, res) => {
    //Validating inputs for user values
    if(req.body.firstname==null||req.body.firstname==""||regexForNumbers.test(req.body.firstname)||regexForSpecialCharacters.test(req.body.firstname)){
        /* res.send("Enter a valid first name") */
        alert("Enter a valid first name")
        /*  errormsg("Enter a valid first name")  */
    }
    else if(req.body.lastname==null||req.body.lastname==""||regexForNumbers.test(req.body.lastname)||regexForSpecialCharacters.test(req.body.lastname)){
       /*  res.send("Enter a valid last name") */
        alert("Enter a valid last name")
    }
    else if(req.body.email==null||req.body.email==""||!regexForEmail.test(req.body.email)){
        /* res.send("Enter a valid email address") */
        alert("Enter a valid email address")
    }
    else if(req.body.password==null||req.body.password==""){
        /* res.send("Password cannot be empty") */
        alert("Password cannot be empty")
    }
    else{
        const salt = bcrypt.genSaltSync(10)
        const password = bcrypt.hashSync(req.body.password, salt)
        req.body.password = password 
       /*  data.users.push(req.body) */
       /*  res.send(req.body) */
       db.none('INSERT INTO users (firstname, lastname, email, password) VALUES($1, $2, $3, $4);',[req.body.firstname, req.body.lastname, req.body.email, req.body.password])
       .then(()=>{
        res.redirect('/users')
       })
       .catch((err)=>{
           res.send(err)
        })
        
    }    
})

//Create a new schedule
app.post('/schedules', (req, res) => {

    //Validating inputs for schedule values
    if(req.body.user_id==null|| req.body.user_id==""){
       /*  res.send("User Id cannot be empty") */
        alert("User Id cannot be empty")
    }
    else if(isNaN(req.body.user_id)){
        /* res.send("Enter a valid user id") */
        alert("Enter a valid user id")
    }
    else if(req.body.day==""||req.body.day==null||isNaN(req.body.day)){
        /* res.send("Enter a valid day") */
        alert("Enter a valid day")
    }
    else if(req.body.start_at==""||req.body.start_at==null){
        /* res.send("Enter a valid start time") */
        alert("Enter a valid start time")
    }
    else if(req.body.end_at==null||req.body.end_at==""){
       /*  res.send("Enter a valid end time") */
        alert("Enter a valid end time")
    }
    else{
        /* data.schedules.push(req.body) */
        /* res.send(req.body) */
        db.none('INSERT INTO schedules (userid, sday, start_at, end_at) VALUES($1, $2, $3, $4);',[req.body.user_id, req.body.day, req.body.start_at, req.body.end_at])
        .then(()=>{
            res.redirect('/schedules')
        })
        .catch((err)=>{
            res.send(err)
        })
       
    }
   
})



//Listen on the given port
app.listen(PORT, () =>{
    console.log(`Port number: ${PORT}`)
})

