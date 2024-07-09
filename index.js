const express=require("express");
const app=express();
require('dotenv').config();
const mongoose=require("mongoose");
const router=require("./Routes/faculty.js");
app.use(express.json());
app.use("/",router);



(
    async ()=>{
       await mongoose.connect(process.env.DB_URL);   
    }
)
()
const PORT=process.env.PORT || 3300;
app.listen(PORT,()=>{
console.log(`App is listening on port number ${PORT}`)
});