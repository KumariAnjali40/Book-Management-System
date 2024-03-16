const jwt = require('jsonwebtoken');
const {UserModel}=require('../models/user.model');
const {BlackListModel}=require('../models/blacklist.model');
const {BookModel}=require('../models/book.model');

const auth=async(req,res,next)=>{
    const access_token=req.headers.authorization?.split(" ")[1];
    console.log(access_token);
    if(await BlackListModel.findOne({access_token})){
        return res.json({msg:"You have been logged out"});
    }
    if(access_token){
        try{
            const decoded=jwt.verify(access_token,"Anjali");
            console.log(decoded);
            const {userID}=decoded;
            const user=await UserModel.findOne({_id:userID});
            const require_role=user?.role;
            req.userID=userID;
            req.role=require_role;

            next();

        }
        catch(err){
            res.status(400).json({msg:err});
        }
    }else{
        res.json({msg:"Please Login"});
    }
}


module.exports={
    auth,
}