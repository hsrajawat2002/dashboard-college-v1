const mongoose=require('mongoose');

const messageSchema= mongoose.Schema({
    message:{type:String,required:true},
},{timestamps:true});


const messageModel= mongoose.model("messageItem", messageSchema);
module.exports= messageModel;