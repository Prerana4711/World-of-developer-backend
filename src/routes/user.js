const express = require("express");
const userRouter = express.Router();
const {autMiddle} = require("../adminauth")
const connectionRequest = require("../../src/models/connetionRequest");
const User = require("../models/user");
userRouter.get("/user/requests/recieved",autMiddle, async (req,res)=>{
    try{
     const loggedinuser = req.user;
     const requestDoc = await connectionRequest.find({
        touserId:loggedinuser._id,
        status:"interested"
     }).populate("fromuserId",["first_name","last_name","age","gender","bio","photourl","skills"]);   
     res.send(requestDoc)
    }
    catch(err){
      res.status(404).send(err.message)
    }
} )
userRouter.get("/user/connection",autMiddle, async (req,res)=>{
    try{
     const loggedinuser = req.user;
     const requestDoc = await connectionRequest.find({
      $or:[
        {touserId:loggedinuser._id, status:"accepted"},
        {fromuserId:loggedinuser._id, status:"accepted"},
      ],
     }).populate("fromuserId",["first_name","last_name","age","gender","bio","photourl","skills"]).populate("touserId",["first_name","last_name","age","gender", "bio","photourl","skills"]);  
     const data = requestDoc.map((row)=>{
        if(row.fromuserId._id.toString() ===loggedinuser._id.toString()){
            return row.touserId
        }
        return row.fromuserId
     })
     res.send(data)
    }
    catch(err){
      res.status(404).send(err.message)
    }
} )
userRouter.get("/feed",autMiddle,async (req,res)=>{
    loggedinuser=req.user;
    const limit = parseInt(req.query.limit) || 10
    const page =  parseInt(req.query.page)   || 1
    const skip = (page-1)*limit
     const requestDococ = await connectionRequest.find({
       $or:[{fromuserId:loggedinuser._id},{touserId:loggedinuser._id}]
     }).select("fromuserId touserId")
     const hideUserFromFeed = new Set();
     requestDococ.forEach((req)=>{
        hideUserFromFeed.add(req.fromuserId.toString());
        hideUserFromFeed.add(req.touserId.toString());
     })
     const user = await User.find({
       $and:[
        {_id:{$nin:Array.from(hideUserFromFeed)}}, 
        {_id:{$ne:loggedinuser._id}}
    ]
     }).select("first_name last_name age bio gender photourl").skip(skip).limit(limit)
     res.send(user)

})

module.exports = userRouter;