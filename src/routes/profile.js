const express=require("express")
const profielRouter= express.Router()
const {autMiddle} = require("../adminauth")
const {validateEditData} = require("../utlis/validate")
profielRouter.get("/profile/view",autMiddle, async (req,res)=>{
const user =req.user
 res.send(user);
  
})
profielRouter.patch("/profile/edit",autMiddle, async (req,res)=>{
try{
const isvalidateEdit = validateEditData(req)
if(!isvalidateEdit){
  res.status(404).send("this is invalid field to edit")
}
const loggesdinuser=req.user;
Object.keys(req.body).forEach((key)=>{if (req.body[key] !== undefined){loggesdinuser[key]=req.body[key]}})
 await loggesdinuser.save()
res.json(loggesdinuser)
}
catch(err){
res.send(err.message)
}
  
})
module.exports=profielRouter