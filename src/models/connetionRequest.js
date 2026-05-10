const mongoose = require ("mongoose")
const connectionRequest = new mongoose.Schema(
    {
    fromuserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
     touserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
     status:{
        type:String,
        enum:{
            values:["interested","ignored","accepted","rejected"],
            message:`{VALUE} is incorrect status type`
        }
    }

},{
    timestamp:true
})
const connectionSchema = mongoose.model("connectionSchema",connectionRequest)
module.exports=connectionSchema