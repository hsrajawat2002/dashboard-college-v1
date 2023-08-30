const express= require('express');
const complaintModel = require('../Schemas/complaintSchema');
const lostItemModel = require('../Schemas/lostItemSchema');
const userModel = require('../Schemas/userSchema');
const cleaningModel = require('../Schemas/cleaningSchema');
const {userAuthenticate} = require('../middleware/authUser');
const userRouter= new express.Router();

userRouter.post("/:institute_id/register-complaint",userAuthenticate, async(req,res)=>{
    const content= req.body;
    const newComplaint= new complaintModel(content);
    newComplaint.institute_id= req.params.institute_id;
    newComplaint.date_= new Date();
    try {
        const userFound= await userModel.findOne({institute_id:req.params.institute_id});
        userFound.all_complaint.push(newComplaint._id);
        userFound.save();
        await newComplaint.save().then(res.sendStatus(200)); 
        
    } catch (error) {
        console.log(error);
        res.sendStatus(400); 
    }
});

userRouter.get('/:institute_id/get-complaints',userAuthenticate,async (req,res)=>{
    const userFound= await userModel.findOne({institute_id:req.params.institute_id});
    const complaint_ids= userFound.all_complaint;
    try {
        const complaints_= await complaintModel.find({'_id':{$in : complaint_ids}}).sort({completed:'asc',createdAt:-1});
        res.status(200).json(complaints_); 
    } catch (error) {
        res.sendStatus(400);
    }
}); 

userRouter.post("/:institute_id/register-lost-item",userAuthenticate, async(req,res)=>{
    const content= req.body;
    const lostItem= new lostItemModel(content);
    lostItem.institute_id= req.params.institute_id;
    const gdrive_id= lostItem.gdrive_link.split('/');
    lostItem.img_link= lostItem.img_link+gdrive_id[5];
    try {
        const userFound= await userModel.findOne({institute_id:req.params.institute_id});
        userFound.all_lostItem.push(lostItem._id);
        userFound.save();
        await lostItem.save().then(res.sendStatus(200));
        
    } catch (error) {
        console.log(error); 
        res.sendStatus(400); 
    } 
});

userRouter.get('/:institute_id/get-lost-items',userAuthenticate,async (req,res)=>{
    try {
        const all_items= await lostItemModel.find().sort({createdAt:-1,});
        res.status(200).json(all_items); 
    } catch (error) {
        res.status(500).json({"message":"server error occured"}); 
        console.log(error);
    }
});

userRouter.delete('/:institute_id/delete-item/:mongoID',userAuthenticate,async (req,res)=>{
    try {
        await lostItemModel.findByIdAndDelete(req.params.mongoID);
        res.status(200);
    } catch (error) {
        res.status(500).json({"message":"server error occured"}); 
        console.log(error);
    }
});

userRouter.post('/:institute_id/register-cleaning-request',userAuthenticate,async (req,res)=>{
    const content= req.body;
    const newCleaning= new cleaningModel(content);
    newCleaning.institute_id= req.params.institute_id;
    try {
        const userFound= await userModel.findOne({institute_id:req.params.institute_id});
        userFound.all_cleaning.push(newCleaning._id);
        userFound.save();
        await newCleaning.save().then(res.sendStatus(200));
        
    } catch (error) {
        console.log(error);
        res.sendStatus(400); 
    }
});

userRouter.get('/:institute_id/get-cleaning-requests',userAuthenticate, async(req,res)=>{
    const userFound= await userModel.findOne({institute_id:req.params.institute_id});
    const cleaning_ids= userFound.all_cleaning;
    try {
        const cleanings_= await cleaningModel.find({'_id':{$in : cleaning_ids}}).sort({completed:'asc',createdAt:-1});
        res.status(200).json(cleanings_);
    } catch (error) {
        res.sendStatus(400);
    }
});

userRouter.post('/:institute_id/update-cleaning/:mongoID',userAuthenticate, async(req,res)=>{
    try {
        const cleaningRequest= await cleaningModel.findById(req.params.mongoID);
        cleaningRequest.completed="yes";
        cleaningRequest.save();
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(400);
    }
});

module.exports= userRouter; 