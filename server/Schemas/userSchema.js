const mongoose= require('mongoose');

const userSchema= mongoose.Schema({
    first_name:{type:String, required:true},
    last_name:{type:String, required:true},
    email:{type:String, required:true},
    contact_no:{type:String, required:true},
    password:{type:String,required:true},

    // token:{type:String,required:true},

    institute_id:{type:String, required:true},
    all_complaint:[{type:mongoose.Schema.ObjectId}],
    all_lostItem:[{type:mongoose.Schema.ObjectId}],
    all_cleaning:[{type:mongoose.Schema.ObjectId}]
});

const userModel= mongoose.model("user", userSchema);
module.exports= userModel;