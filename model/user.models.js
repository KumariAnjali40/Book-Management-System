const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    name:{type : String, require:true},
    email:{type :String, require:true},
    password:{type: String,require:true},
    city:{type: String,require:true},
    age:{type: Number, require:true},
    role:{type: String,
      enum:["admin","librarian","reader"],
      default:"reader"
    }
},{
    versionKey:false
})

const UserModel = mongoose.model("user",userSchema);

module.exports={
    UserModel,
}