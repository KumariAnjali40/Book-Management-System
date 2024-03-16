const express = require('express');

const {connection}=require('./db');

const app = express();
app.use(express.json());

app.get('/',(req,res)=>{
  res.send("heelo");
})


app.listen(4500,async()=>{
try{
  await connection
  console.log("connected to db");
  console.log("Server is running at port 4500");
}catch(err){
    console.log(err);
}
})