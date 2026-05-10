const express = require("express");
require("dotenv").config();
const app = express();
const { connectDB } = require("../src/config/database");
const User = require('../src/models/user')
app.use(express.json())
const cookieParser = require("cookie-parser")
app.use(cookieParser());
const authRouter = require("./routes/auth")
const profielRouter = require("./routes/profile")
const requestRouter = require("./routes/request")
const userRouter = require("./routes/user")
const cors = require("cors")
app.use(cors({
  origin: "https://world-of-developer-frontend-part.vercel.app/",
  credentials: true
}))
app.use("/",authRouter)
app.use("/",profielRouter)
app.use("/",requestRouter)
app.use("/",userRouter)
const PORT = process.env.PORT || 3000;
connectDB()
  .then(() => {
    //because first we should connect to db then start server and listen request
    console.log("connected successfully");
    app.listen(PORT, () => {
      console.log("server started");
    });
  })
  .catch((err) => {
    console.log(err);
  });
