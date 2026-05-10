const validator = require("validator");
const validateData=(req)=>{
    const {first_name,last_name,password,email}=req.body;
    if(!first_name || !last_name|| !password || !email){
        throw new Error("This field is requiredddd")
    }
    else if(first_name.length<3 || last_name.length<3){
        throw new Error("atleast 3 chararcter requiree")
    }
     else if(first_name.length>50 || last_name.length>50){
        throw new Error("atmost 50 chararcter allowed")
    }
     else if(!validator.isEmail(email)){
        throw new Error("Email is not valid")
    }
   else if(!validator.isStrongPassword(password)){
        throw new Error("Password is not strong")
    }
    
  
        }
const validateEditData =(req)=>{
            allowedField=["first_name","last_name","age","gender","bio","skills","photourl"]
            const isEditAllowed = Object.keys(req.body).every((field)=>allowedField.includes(field))
            return isEditAllowed;
        }
module.exports ={validateData,validateEditData}
