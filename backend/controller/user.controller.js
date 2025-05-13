const UserModel = require('../models/user.model');

const userService = require('../services/user.service');

const {validationResult} = require('express-validator');

const BlacklistToken = require('../models/blacklistToken.model');

module.exports.register = async (req,res)=>{
    // console.log(req.body);

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }


    const {fullname,email,password}  = req.body;
    // console.log(email);

    const isUserExist = await UserModel.findOne({email});

    if(isUserExist){
        return res.status(400).json({message:'User already exists'});
    }

    const hashedPassword = await UserModel.hashedPassword(password);

    try{
        const user = await userService.createUser({
            firstname:fullname.firstname,
            lastname:fullname.lastname,
            email,
            password:hashedPassword
        });

        const token =  await user.generateAuthToken();

        
        res.status(201).json({
            token,
            user
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            message:'Internal server error'
        })
    }
}


module.exports.login = async (req,res,next)=>{

    // console.log(req.body);

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {email,password} = req.body;

    const user = await UserModel.findOne({email}).select("+password");

    if(!user){
        return res.status(401).json(({message:"Invalid email or password"}));
    }
    
    const isMatch = await user.comparePassword(password);

    if(!isMatch){
        return res.status(401).json(({message:"Invalid email or password"}));
    }

    const token = await user.generateAuthToken();

    // console.log(token);
    res.cookie("token",token);

    res.status(200).json({token,user});

}


module.exports.profile = async (req,res)=>{

    try{
        res.status(200).json({
        user:{
            fullname:req.user.fullname,
            email:req.user.email
        }
    });
    }catch(err){
        res.status(500).json({message:"Failed to fetch profile"});
    }

}


module.exports.logout = async(req,res,next)=>{

    console.log("Logout called");
    try{

        // console.log();
        // console.log(req.cookies.token);
        res.clearCookie("token");

        const token = req.cookies?.token || req.headers.authorization.split(" ")[1];

        await BlacklistToken.create({token});

        res.status(200).json({message:"Logged out successfully"});
    }
    catch(err){
        next(err);
    }
}


// module.exports = {register,profile,logout};


