const jwt = require("jsonwebtoken");
const userModel = require('../Schemas/userSchema');
const adminModel = require("../Schemas/adminSchema");
require('dotenv').config();

const secretKey= process.env.jwtprivatekey;
const userAuthenticate = async(req,res,next)=>{
    try {
        const {token}=req.cookies;
        const verified_id = jwt.verify(token,secretKey);
        const userFound = await userModel.findOne({institute_id:verified_id.institute_id});
        if(!userFound){ throw new Error("User Not Found") };
        next();  
    } catch (error) {
        res.status(500).json({message:"not authorized"});
        console.log(error);
    }
};

const admin_secret= process.env.adminjwt;
const adminAuthenticate = async(req,res,next)=>{
    try {
        const {token}=req.cookies;
        const verified_id = jwt.verify(token,admin_secret);
        const userFound = await adminModel.findOne({admin_id:verified_id.admin_id});
        if(!userFound){ throw new Error("User Not Found") };
        next();  
    } catch (error) {
        res.status(500).json({message:"not authorized"});
        console.log(error);
    }
};

module.exports = {userAuthenticate,adminAuthenticate};