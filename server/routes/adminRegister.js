const express= require('express');
const userModel = require('../Schemas/userSchema');
const adminLoginRouter=new express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const adminModel = require('../Schemas/adminSchema');
const saltRounds = 10;
const cookie=require('cookie-parser');
require('dotenv').config();

const private_key=process.env.adminjwt;

adminLoginRouter.post("/register-admin", async(req,res)=>{
    const content= req.body;
    const newAdmin= new adminModel(content);
    
    // const token = jwt.sign({ admin_id: newAdmin.admin_id },private_key);
    // newAdmin.token=token;
    const found= await userModel.findOne({admin_id: newAdmin.admin_id });

    if(found){
        res.sendStatus(400);
    }
    else{
        try {
            bcrypt.hash(newAdmin.password, saltRounds,async (err, hash)=>{
                if(err){throw err;}
                newAdmin.password= hash;
                await newAdmin.save();
                res.sendStatus(200);
            });
        } catch (error) {
            console.log(error);
            res.sendStatus(400);
        }
    }
});

adminLoginRouter.post("/login-admin",async(req,res)=>{
    const {admin_id,password}=req.body;
    try {
        const found= await adminModel.findOne({admin_id:admin_id });
        // console.log(found);
        if(found){
            const ps = await bcrypt.compareSync(password, found.password);
            if(ps){
                const token = jwt.sign({admin_id: found.admin_id },private_key);
                res.cookie('token',token,{sameSite : "none" ,secure :true});
                res.status(200).json(found);
            }
            else{
                res.sendStatus(400);
            }
        }
        else{
            res.sendStatus(500);
        }
    } catch (error) { 
        res.sendStatus(500).json("server error occured"); 
    }
});

module.exports= adminLoginRouter;