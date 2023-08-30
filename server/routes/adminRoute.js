const express= require('express');
const complaintModel = require('../Schemas/complaintSchema');
const cleaningModel = require('../Schemas/cleaningSchema');
const { adminAuthenticate } = require('../middleware/authUser');
const adminRouter= new express.Router();

adminRouter.get('/get-complaints',adminAuthenticate,async (req,res)=>{
    try {
        const all_complaint= await complaintModel.find().sort({createdAt:-1});
        res.status(200).json(all_complaint);
    } catch (error) {
        res.status(500).json({"message":"server error occured"});
        console.log(error);
    }
});

adminRouter.get('/get-cleaning-requests',adminAuthenticate,async (req,res)=>{
    try {
        const all_cleaning= await cleaningModel.find({completed:"no"}).sort({cleaning_date:-1});
        res.status(200).json(all_cleaning);
    } catch (error) {
        res.status(500).json({"message":"server error occured"});
        console.log(error);
    }
});

adminRouter.post('/complete-complaint/:mongoID',adminAuthenticate,async (req,res)=>{
    try {
        const found= await complaintModel.findOne({_id:req.params.mongoID});
        console.log(found);
        found.completed="yes";
        await found.save();
        console.log(found);
        res.status(200);
    } catch (error) {
        res.status(500).json({"message":"server error occured"}); 
        console.log(error);
    }
});

module.exports= adminRouter;