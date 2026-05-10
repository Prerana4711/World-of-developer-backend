const mongoose = require('mongoose')
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userSchema= mongoose.Schema(
    {
    first_name:{
   type:String,
   required:true
    },
    last_name:{
   type:String,
    },
    age:{
   type:Number,
   
    },
    password:{
 type:String,
   validate:(value)=>{
if(!validator.isStrongPassword(value)){
    throw new Error("Password is not strong")
}
    }
    },
    gender:{
   type:String,
    validate:(value)=>{
        if(!(["male","female","others"]).includes(value))
            throw new Error("Please add a valid gender")
    }
    },
    email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
    
},
    photourl:{
    type:String,
    default:"https://backlinko.com/reverse-image-searchhttps://backlinko.com/reverse-image-searchhttps://backlinko.com/reverse-image-search"
    },
    bio:{
    type:String,
    default:"This is my bio section"  
    },
       skills:{
    type:[String]
  
    }
},{

    timestamps:true
}
)
userSchema.methods.getJWT = async function (){
    const user = this
     const token =await jwt.sign({_id:user._id}, "Prerana@471111" ) 
     return token;
}
userSchema.methods.isPasswordValid = async function (passwordInputUser){
const user = this;
const passwrodHash = user.password;
const ispasswordValid = await bcrypt.compare(passwordInputUser,passwrodHash)
return ispasswordValid;
}

const User = mongoose.model("User",userSchema)
module.exports= User