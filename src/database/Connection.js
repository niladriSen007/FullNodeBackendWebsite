import mongoose from "mongoose";

const connection = mongoose.connect("mongodb://localhost:27017/fullDynamicWebsite")
.then(()=>{
    console.log("Connection Successful");
}).catch((e)=>{
    console.log("No Connection");
})

export {  connection}