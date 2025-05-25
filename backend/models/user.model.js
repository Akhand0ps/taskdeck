const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({

    fullname:{
        firstname:{
            type:String,
            requried:true,
            minlength:[3,'Minimum length is 3 characters'],
        },
        lastname:{
            type:String,
            minlength:[3,'Minimum length is 3 characters'],

        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        
    },
    password:{
        type:String,
        required:true,
        select:false,
    }
})


userSchema.methods.generateAuthToken = async function(){
    const token = await jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'});
    console.log(token);
    return token;
}


userSchema.methods.comparePassword = async function (password){

    const isMatch = await bcrypt.compare(password + process.env.SALT,this.password);
    console.log(isMatch);
    return isMatch;
    
}


userSchema.statics.hashedPassword = async function (password){
    return await bcrypt.hash(password+process.env.SALT,10);
}




const UserModel = mongoose.model("User",userSchema);

module.exports = UserModel;