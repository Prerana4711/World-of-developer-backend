  const User = require('../src/models/user')
  const jwt= require("jsonwebtoken")
  const autMiddle = async (req,res,next)=>{
    const {token} = req.cookies
  if(!token){
    throw new Error("Invalid token")
  }
  decodeToken = await jwt.verify(token,"Prerana@471111",
   {expiresIn:"0d"}
)
  const user = await User.findOne({_id:decodeToken._id})
  if(!user){
    throw new Error("User is not available")
  }
  req.user=user
   next()
}
module.exports={autMiddle}