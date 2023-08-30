const mongoose=require('mongoose');
require('dotenv').config();

const url=process.env.MONGODB_URL;
mongoose.connect(url).then(console.log("DB connected")).catch((err)=>{console.log(err);}); 