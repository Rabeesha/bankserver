// import mongoose
const mongoose=require('mongoose')
//connect server to db
mongoose.connect('mongodb://localhost:27017/bankApp',{
    useNewUrlParser:true  // to aviod warings
})
//model creation
const User=mongoose.model('User',{  //collection  name with singular format starting capitel letter
uname:String,
acno:Number,
password:String,
phonenumber:Number,
balance:Number,
transaction:[]
})
module.exports={
    User
}