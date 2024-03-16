const mongoose=require('mongoose');

const bookSchema=mongoose.Schema({
    title:{type:String},
    genre:{type:String},
    author:{type:String},
    published_year:{type:Number},
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel',default: null }
},{
    versionKey:false
})

const BookModel=mongoose.model("book",bookSchema);


module.exports={
 BookModel,
}