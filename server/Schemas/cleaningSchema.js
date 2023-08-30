const mongoose=require('mongoose');

const cleaningSchema= mongoose.Schema({
    room_no:{type:Number, required:true},
    cleaning_date:{type:Date,required:true},
    time_begin_hour:{type:String, required:true},
    time_begin_minute:{type:String, required:true, default:"00"},
    time_end_hour:{type:String, required:true},
    time_end_minute:{type:String, required:true, default:"00"},

    // cleaning_type:{type:String,required:true},
    completed:{type:String, default:"no"},

    institute_id:{type:String,required:true},
},{timestamps:true});

const cleaningModel=mongoose.model("Cleaning",cleaningSchema);
module.exports=cleaningModel;