const mongoose=require('mongoose');

const adminSchema= mongoose.Schema({
    admin_id:{type:String, requried:true},
    password:{type:String, requried:true},

    // token:{type:String, requried:true}
},{timestamps:true});

const adminModel=mongoose.model("Admin",adminSchema);
module.exports=adminModel;