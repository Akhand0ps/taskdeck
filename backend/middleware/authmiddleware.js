const blacklistToken = require("../models/blacklistToken.model");
const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");


module.exports.authUser = async(req,res,next)=>{
    console.log("Auth middleware");

    const token = req.headers.authorization && req.headers.authorization.startsWith("Bearer") ? req.headers.authorization.split(" ")[1] : null;

    
    if(!token){
        return res.status(401).json({
            message:"Not authorized, no token"
        })
    }


    const isBlacklisted = await blacklistToken.findOne({token});

    if(isBlacklisted){
        return res.status(401).json({
            message:"Not authorized, token blacklisted"
        })
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await UserModel.findById(decoded._id);

        if(!user){
            return res.status(401).json({
                message:"Not authorized, user not found"
            })
        }

        req.user = user;
        console.log("auth success");
        return next();
        
    }
    
    catch(err){
        return res.status(401).json({
            message:"Not authorized, token expired or invalid"
        })
    }

}