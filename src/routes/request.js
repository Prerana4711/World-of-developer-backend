const express=require("express")
const requestRouter= express.Router()
const {autMiddle} = require("../adminauth")
const connectionRequest = require("../../src/models/connetionRequest")
const User = require("../models/user")
requestRouter.post("/request/send/:status/:toUserId",autMiddle, async (req,res)=>{
try{
const fromuserId = req.user._id;
const touserId= req.params.toUserId;
const status= req.params.status
const allowedStatus =["interested","ignored"]
if(!allowedStatus.includes(status)){
    return res.status(404).send("status type is not valid")
}
const existingConnection = await connectionRequest.findOne({
    $or:[
        {fromuserId,
         touserId
        },
         {fromuserId:touserId,
         touserId:fromuserId
        }
    ]
})
if(existingConnection){
    return res.status(404).send("request already exist")
}
const touser = await User.findOne({ _id: touserId })
if(!touser){
    return res.status(404).send("user does not exist")
}
if(touserId===fromuserId.toString()){
    return res.status(404).send("cant send request to yourself")
}
const data = new connectionRequest({
    fromuserId,
    touserId,
    status
})
const data1= await data.save()
res.send(`${data1}`)
}
catch(err){
res.status(404).send(err.message)
}

  
})
requestRouter.post("/request/review/:status/:requestedId",autMiddle, async (req,res)=>{
try{
 const loggesdinuser= req.user
const {status,requestedId}= req.params
const allowedStatus =["accepted","rejected"]
if(!allowedStatus.includes(status)){
    return res.status(404).send("status type is not valid")
}
const requestDoc  = await connectionRequest.findOne({
    _id:requestedId,
    touserId:loggesdinuser._id,
    status:"interested",
})

if(!requestDoc ){
    return res.status(404).send("cannot find connection request")
}
requestDoc.status = status
const data = await requestDoc.save()
res.send(`connenction requested ${status} succesfully`)
}
catch(err){
res.status(404).send(err.message)
}

  
})
module.exports=requestRouter;