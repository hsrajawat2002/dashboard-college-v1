const mongoose=require('mongoose');

const complaintSchema= mongoose.Schema({

    title:{type:String, required:true,maxLength:50},
    description:{type:String,required:true,maxLength:250},
    date_:{type:Date, required:true},
    location:{type:String, default:"Fulgar Hostel"},
    img_link:{type:String},
    completed:{type:String, required:true,default:"no"},
    
    institute_id:{type:String,required:true},
},{timestamps:true});

const complaintModel=mongoose.model("Complaint",complaintSchema);
module.exports= complaintModel;