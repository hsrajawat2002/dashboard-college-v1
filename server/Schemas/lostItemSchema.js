const mongoose=require('mongoose');

const lostItemSchema= mongoose.Schema({

    itemName:{type:String, required:true},
    lostDate:{type:Date, required:true},
    description:{type:String, maxLength:120, required:true},
    location_:{type:String, required:true, default:"fulgar hostel"},
    img_link:{type:String, default:"https://drive.google.com/uc?export=view&id="},
    gdrive_link:{type:String},
    contact_details:{type:String, required:true},
    found:{type:String,required:true,default:"no"},

    institute_id:{type:String, required:true}, 
},{timestamps:true});


const lostItemModel= mongoose.model("lostItem", lostItemSchema);
module.exports= lostItemModel;