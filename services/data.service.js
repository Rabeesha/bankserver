//imort db
const db=require('./db')
//import jwt(jsonwebtoken)
const jwt =require('jsonwebtoken')

let user={
    1000:{uname:"abijith",acno:1000,password:"userone",balance:5000,transaction:[]},
    1001:{uname:"neeer",acno:1001,password:"usertwo",balance:5000,transaction:[]},
    1002:{uname:"laisha",acno:1002,password:"userthree",balance:5000,transaction:[]}
  }

// regiser
  const register=(acno,uname, password,phonenumber,balance)=>{
  return db.User.findOne({acno})
  .then(user=>{
    if(user){
      return{
        statusCode:422,
        status:false,
        message:"User already exist"
      } 
    }
 
   
    else{
      const newUser=new db.User({
        uname,
        acno,
        password,
        phonenumber,
        balance, 
        transaction:[]
      
      })
     newUser.save()
        
     console.log(user)
    
      
       return {
        statusCode:200,
        status:true,
        message:"Sussfully registered"
       }
       
      
    }

  })
}
  //login
  const login=(acno,password)=>{
    return db.User.findOne({acno,password})
    .then(user=>{
      if(user){
        const token=jwt.sign({
          currentNo:acno
        },'supersecretkey123123')
           return {
             statusCode:200,
             status:true,
             message:"Sucessfuly login",
             token,
             currentUser:user.uname, // to store logind person name
             balance:user.balance
           } 
      }
      else{
        return {
          statusCode:422,
          status:false,
          message:"invalid user or password"
        } 

      }
    })
  }
  
// deposit
const deposit=(acno,password,amount)=>{
  var amt=parseInt(amount)
return db.User.findOne({acno,password})
.then(user=>{
  if(!user){
    return {
      statusCode:422,
      status:false,
      message:"invalid credentail"
    }
  }
 
    user.balance+=amt
    user.transaction.push({
      amount:amt,
type:"Credit"
    })
    user.save()
    return {
      statusCode:200,
      status:true,
      message:amt+"deposited your new balance is"+user.balance
    } 
    
  
})
}
// if(acno in user){
//   if(password==user[acno]["password"]){
//     // accDetails[acno]["_balance"]+=amt
// var result=user[acno]["balance"]+=amt
// user[acno]["transaction"].push({
// amount:amt,
// type:"Credit"
// })
// if(result){
//  var final=user[acno]["balance"]=result
// }

// this.accountBalance=accDetails[acno]["balance"]=accDetails[acno]["balance"]+=amt
    //  return accDetails[acno]["balance"]
//     return {
//       statusCode:200,
//       status:true,
//       message:amt+"deposited your new balance is"+final
//     } 
    
    
//   }
//   else{
//     return {
//       statusCode:422,
//       status:false,
//       message:"invalid password"
//     } 
//   }
// }
// else{
//   return {
//     statusCode:422,
//     status:false,
//     message:"invalid user"
//   } 

// }

// }
// withdraw
const withdraw=(req,acno,password,amount)=>{
  var amt=parseInt(amount)
  return db.User.findOne({acno,password})
  .then(user=>{
    if(!user){
      return {
        statusCode:422,
        status:false,
        message:"invalid credentail"
      }
    } 
    // if(req.currentAcc!=user.acno){
    //   return {
    //     statusCode:422,
    //     status:false,
    //     message:"operation denaid"
    //   } 
    // }
   if (user.balance<amt)
   {
    return {
              statusCode:422,
              status:false,
              message:"insufficent balance"
            } 
   }
    user.balance-=amt
    user.transaction.push({
      amount:amt,
type:"Debit"
    })
    user.save()
   
   return {
    statusCode:200,
    status:true,
    message:amt+"debitted suecssfully your new balance is"+user.balance
  } 
  
  
    
})
}

   




// if(acno in user){
//   if(password==user[acno]["password"]){
//     if(user[acno]["balance"]>amt){
      
//        var result=user[acno]["balance"]-=amt
//      if(result){
//       user[acno]["balance"]=result
//      }
//      user[acno]["transaction"].push({
//       amount:amt,
//       type:"Debit"
//     })
//     return {
//       statusCode:200,
//       status:true,
//       message:amt+"debitted suecssfully your new balance is"+user[acno]["balance"]
//     } 
    
      
      
    
//     }
//     else{
//       return {
//         statusCode:422,
//         status:false,
//         message:"insufficent balance"
//       } 
//     }
//   }
// else{
//   return {
//     statusCode:422,
//     status:false,
//     message:"invalid password"
//   } 
// }

// }
// else{
//   return {
//     statusCode:422,
//     status:false,
//     message:"invalid user"
//   } 
// }
// }
// transaction

const getTransaction=(acno)=>{
  return db.User.findOne({acno})
  .then(user=>{
    if(user){
      return {
        statusCode:200,
        status:true,
        transaction: user.transaction
      } 
    }
    return {
      statusCode:422,
      status:false,
      message:"invalid user"
    } 
  })
}
  // if(acno in user){
  //   return {
  //     statusCode:200,
  //     status:true,
  //     transaction: user[acno].transaction
  //   } 
  // }
  // else{
  //   return {
  //     statusCode:422,
  //     status:false,
  //     message:"invalid user"
  //   } 
  // }
  //  }
  
const getbalance=(acno)=>{
  return db.User.findOne({acno})
  .then(user=>{
    if(user){
      return {
        statusCode:200,
        status:true,
        balance:user.balance
      } 
    }
    return {
      statusCode:422,
      status:false,
      message:"invalid user"
    } 
  })
}
const deleteAcc=(acno)=>{
  return db.User.deleteOne({acno})
  .then(user=>{
    if(user){
      return {
        statusCode:200,
        status:true,
        message:"Account deleted sucessfully"
      } 
    }
    return {
      statusCode:422,
      status:false,
      message:"invalid operation"
    } 
  })
}
module.exports={
  register,
  login,
  deposit,
  withdraw,
  getTransaction,
  getbalance,
  deleteAcc
}


