const express = require('express');
const {connection}=require('./db');
const {userRouter}=require('./routes/user.routes');
const {bookRouter}=require('./routes/book.routes');
const app=express();

app.use(express.json());

app.use('/user',userRouter);
app.use('/book',bookRouter);

app.get('/',(req,res)=>{
    res.json({msg:"Welcome"});
})


app.listen(4500,async()=>{
  try{
      await connection
      console.log("Connected to Db");
      console.log("server is runnig at port 4500");

  }
  catch(err){
    console.log(err);
  }
})