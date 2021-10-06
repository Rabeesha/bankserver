//import express
const express =require('express')  
//import session
// const session = require('express-session')

//import jwt(jsonwebtoken)
const jwt =require('jsonwebtoken')
//imort cors
const cors=require('cors')  //used to share datas from diffent ports

//import dataservice
const dataservice = require('./services/data.service')

//create app using express
const app = express()

//allow resoursesharing using cors
app.use(cors({
orgin:'http//localhost:4200',
credentials:true
}))

//to parse json
app.use(express.json())


// To generate session
// app.use(session({
//      secret:'randomsecretkey',// any key name that is id
//      resave:false,//to save unmodifyd datas 
//      saveUninitialized:false// to save unintilized value either it is true or false
// }))

//to create middleware application specific
app.use((req,res,next)=>{
    console.log("middleware")
    next()
})
// tocreate router specific middleware
const authMiddleware=(req,res,next)=>{
    if(!req.session.currentNo){// checking  current user in session
       const result= ({
          statusCode:401,
          status:false,
          message:"please login"
        }) 
      res.status(result.statusCode).json(result)
      }
      else{
          next()
      }
}
//token validation midileware
const jwtMiddleware=(req,res,next)=>{
    try{
        const token=req.headers["x-access-token"]
        const data= jwt.verify(token,'supersecretkey123123')
        req.currentAcc=data.CurrentNo
        next()
    }
   catch{
    
        const result= ({
           statusCode:401,
           status:false,
           message:"please login"
         }) 
       res.status(result.statusCode).json(result)
       } 
   }

//jwt test
app.post('/token',jwtMiddleware,(req,res)=>{ 
    res.send("current account number"+req.currentAcc)
})

//resolving http method
app.get('/',(req,res)=>{
    res.status(401).send("get method")
})
app.post('/',(req,res)=>{
    console.log("post")
    res.send("post method")
})
app.put('/',(req,res)=>{
    res.send("put method")
})

app.patch('/',(req,res)=>{
    res.send("patch method")
})
app.delete('/',(req,res)=>{
    res.send("delete method")
})
//bankapp resolving
//register API
app.post('/register',(req,res)=>{
    console.log(req.body)
    
dataservice.register(req.body.acno,req.body.uname, req.body.password,req.body.phonenumber,req.body.balance)
.then(result=>{
    res.status(result.statusCode).json(result)
})
//
})
//login API
app.post('/login',(req,res)=>{
    dataservice.login(req.body.acno, req.body.password)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
   
})
//deosit API
app.post('/deposit',jwtMiddleware,(req,res)=>{
    // console.log(req.session.currentNo)
     dataservice.deposit(req.body.acno, req.body.password,req.body.amount)
    .then(result=>{
        res.status(result.statusCode).json(result) 
    })
    
})

// withdraw

app.post('/withdraw',jwtMiddleware,(req,res)=>{
   dataservice.withdraw(req,req.body.acno, req.body.password,req.body.amount)
    .then(result=>{
        res.status(result.statusCode).json(result) 
    })
})

//transaction

app.post('/transaction',jwtMiddleware,(req,res)=>{
    dataservice.getTransaction(req.body.acno)
   
    .then(result=>{
        res.status(result.statusCode).json(result) 
    })
})
app.post('/account',jwtMiddleware,(req,res)=>{
    dataservice.getbalance(req.body.acno)
   
    .then(result=>{
        res.status(result.statusCode).json(result) 
    })
})
// to delete an account
app.delete('/deleteAcc/:acno',jwtMiddleware,(req,res)=>{
    dataservice.deleteAcc(req.params.acno)
   
    .then(result=>{
        res.status(result.statusCode).json(result) 
    })
})
//to set port
app.listen(3000,()=>{
    console.log("server started port number:3000")
})


