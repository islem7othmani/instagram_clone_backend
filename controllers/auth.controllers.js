const userModel = require("../models/user.models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const transporter = require("../utils/nodemailer");
const Redis = require("ioredis");
const crypto = require("crypto");
//const { emailQueue } = require("../queues");
//const { SEND_EMAIL_VERIFICATION, SEND_RESET_EMAIL } = require("../constants");
//const { json } = require("body-parser");
//const { default: strictTransportSecurity } = require("helmet/dist/types/middlewares/strict-transport-security");
const redisIO = new Redis({
	port: process.env.REDIS_PORT,
	host: process.env.REDIS_HOST,
    user:process.env.REDIS_USERNAME,
    password:process.env.REDIS_PASSWORD
});

const register = async(req,res)=>{
    try{
        const emailEntered = await userModel.findOne({email : req.body.email});
        //if(emailEntered) return res.status(500).json({message:"email already exists"});

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(req.body.password , salt)
        const user = new userModel({
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            profilepic : req.body.profilepic,
            email : req.body.email,
            password : passwordHash
        }) ;
        const savedUser = await user.save();

        const code = crypto.randomBytes(Math.ceil(6/2)).toString("hex").slice(0,6).toUpperCase();
        redisIO.set(code,savedUser.email,"ex",3600);
        await transporter.sendMail({ 
            from: "wattpad@clone-wattpad.com",
			to: savedUser.email,
			subject: "verify email",
			body: `this code: ${code}`,
            html:`<p>this code: ${code}</p>`
        }) ;
        return res.status(200).json({message:"verify your mail please"})
    }catch(err){
        console.log(err)
        return res.status(500).json(err);
    }
};
const emailVerification =  async(req,res)=>{
    try{
        const codesent = await req.body.code ; 
        if(!codesent) return res.status(500).json({message:"verify the code we sent again"})

        const email = await redisIO.get(req.query.code);
		const user = await userModel.findOneAndUpdate(
			{ email: email },
			{ isEmailVerified: true },
			{ new: true }
		);
		return res.status(200).json("account verified");
    }catch(err){
        console.log(err);
        res.status(500).json({messag:"wrong code"});
    }
}

module.exports.register = register;
module.exports.emailVerification = emailVerification;