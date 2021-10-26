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
            schedule: newArray,
            userid: req.params.id
        })
     }
 }

})

//Prevent from directly accessing individual schedules
app.get('/schedules/:id', (req,res)=>{
    if(req.params.id==='add'){
        res.render('pages/addschedules')
    }
    res.send("You cannot access the individual schedules directly, you should use aany of the given users")
})

  /* let input, filter, table, tr, td, textValue;

        input = document.getElementById("sid")
        filter = input.value
        table = document.getElementById("descrpntable");
        tr = table.getElementsByTagName("tr")
        
        for(let i =0; i<tr.length; i++){
            td = tr[i].getElementsByTagName("td")[0]
            if(td){
                textValue = td.textContent || td.innerText
                if(textValue.indexOf(filter) > -1){
                    tr[i].style.display = ""
                }
                else{
                    table.innerHTML = "<h1 style=\"text-align:center;color:darkblue\">No such userid exisits</h1>"
                }
            }
        }
        /* console.log(`${filter}`) */ 
/* 
        let filter = document.getElementById('sid').value
        let table = document.getElementById('descrpntable')
        let tr = table.getElementsByTagName('tr')
  
        for(let i = 0; i< tr.length; i++){
            let td = tr[i].getElementsByTagName('td')[0]
            
            if(td){
                let textvalue = td.textContent || td.innerHTML
  
                if(textvalue.indexOf(filter) > -1){
                  tr[i].style.display = " ";         
                }
                else{
                  tr[i].style.display = "none"; 
                }
            }
        } */