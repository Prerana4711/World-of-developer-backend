const express = require("express")
const authRouter= express.Router()
const User = require('../../src/models/user')
const jwt= require("jsonwebtoken")
const {autMiddle} = require("../adminauth")
const {validateData} = require('../utlis/validate')
const bcrypt = require("bcrypt");

authRouter.post("/signup",async (req,res)=>{  
   try{
    validateData(req)
    const {first_name, last_name, password, email} = req.body
    const passwordHash = await bcrypt.hash(password,10)
   
     const user = new User({
      first_name,
      last_name,
      password:passwordHash,
      email
     })
   await user.save()
 
      
      const token =await user.getJWT();
      res.cookie("token", token)
   res.json(user)}
   catch(err){
    res.status(404).send(err.message)
   }
})
authRouter.post("/login", async (req,res)=>{
  try{
      const {email,password} = req.body;
      const user = await User.findOne({email:email})
      if(!user){
        throw new Error("user dont exist")
      }
      const validpassword = await user.isPasswordValid(password);
      if(!validpassword){
           throw new Error("Invalid Crendential")
      }
      const token =await user.getJWT();
      res.cookie("token", token)
      res.send(user)
  }
   catch(err){
  res.status(404).send(err)
 }
})
authRouter.post("/logout", async (req,res)=>{
  try{
    res
    .cookie("token",null,{
        expires:new Date(Date.now())
    })
    .send("logout successful!")
  }
   catch(err){
  res.status(404).send(err.message)
 }
})
module.exports= authRouter
