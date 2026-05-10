const dns = require('node:dns');
const mongoose = require("mongoose")
dns.setServers(['1.1.1.1', '8.8.8.8', '8.8.4.4']);
const connectDB = async ()=>{
    await mongoose.connect(process.env.MONGO_URI);
}
module.exports = {
    connectDB
}
