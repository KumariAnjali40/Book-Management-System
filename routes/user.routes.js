const express= require('express');
const {UserModel}=require('../models/user.model');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const { BlackListModel } = require('../models/blacklist.model');


const userRouter=express.Router();

//function for checking the strong password;
function strongPassword(s){
    const hasUpperCase=/[A-Z]/.test(s);
    const hasNumber=/\d/.test(s);
    const hasSpecial=/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(s);
    const length= s.length >= 8;

    return hasUpperCase && hasNumber && hasSpecial && length;
}
//for registration

userRouter.post('/register',async(req,res)=>{
   const {name,email,pass,city,age, role}=req.body;
   try{
    const user=await UserModel.findOne({email:email});
    console.log(user);
    console.log(email);
    if(user){
        return res.status(400).json({msg:"user is already register"});
    }
    if(strongPassword(pass)){
        bcrypt.hash(pass,5,async(err,hash)=>{
            if(err){
                res.status(400).json({err:err});

            }else{
                const user1=new UserModel({name,email,pass:hash,city,age,role});
                await user1.save();
                console.log(user1);
                res.status(200).json({msg:"Register succesful",user1});
            }
        })
    }else{
        res.json({msg:"use strong password"})
    }

   }
   catch(err){
    res.status(400).json({msg:err});
   }

});


//for login
userRouter.post('/login',async(req,res)=>{
    const {email,pass}=req.body;
    try{
        const user=await UserModel.findOne({email});
          if(user){
            bcrypt.compare(pass,user.pass,(_err,result)=>{
                if(result){
                    const access_token=jwt.sign({userID:user._id},"Anjali",{expiresIn:'1h'});
                    const refresh_token=jwt.sign({userID:user._id},"Anjali",{expiresIn:'2h'});

                    res.status(200).json({msg:"Login Succesfull", access_token,refresh_token});
                }else{
                    res.status(200).json({msg:"Wrong passwrod"});
                }
            })
          }
    }
    catch(err){
        res.status(400).json({msg:err});
    }
})



//logout

userRouter.get('/logout',async(req,res)=>{
    const access_token=req.headers.authorization?.split(" ")[1];
    const refresh_token=req.headers.authorization?.split(" ")[2];
    try{
        const blacklist=new BlackListModel({access_token:access_token,refresh_token:refresh_token});
        await blacklist.save();
        res.status(200).json({msg:"Hey! user you are logout"});
    }
    catch(err){
        res.status(400).json({err:err});
    }
})

















module.exports={
    userRouter,
}