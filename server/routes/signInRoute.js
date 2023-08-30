const express= require('express');
const userModel = require('../Schemas/userSchema');
const loginRouter=new express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookie= require('cookie-parser');
const saltRounds = 10;
require('dotenv').config(); 

const private_key=process.env.jwtprivatekey;

loginRouter.post("/register-user", async(req,res)=>{
    const content= req.body;
    const newUser= new userModel(content);
    
    const mail_id= newUser.email.toLowerCase();
    const ins_id= mail_id.split('@')[0]; ins_id.slice(0,11);
    const institute_id= ins_id;
    newUser.email= mail_id; 
    newUser.institute_id=institute_id;  
 
    const found= await userModel.findOne({email:newUser.email});

    if(found){
        res.sendStatus(400); 
    } 
    else{
        try {
            bcrypt.hash(newUser.password, saltRounds,async (err, hash)=>{
                if(err){throw err;}
                newUser.password= hash;
                await newUser.save();
                res.sendStatus(200);
            });
        } catch (error) {
            console.log(error);
            res.sendStatus(500);   
        }
    }
});

loginRouter.post("/login-user",async(req,res)=>{
    const {institute_id,password}=req.body;
    // console.log(institute_id);
    // console.log(password);
    try {
        const found= await userModel.findOne({institute_id:institute_id});
        // console.log(found);
        if(found){
            const ps = await bcrypt.compareSync(password, found.password);
            if(ps){
                const token = jwt.sign({institute_id: found.institute_id },private_key);
                res.cookie('token',token);
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

module.exports= loginRouter;