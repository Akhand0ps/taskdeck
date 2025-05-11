const mongoose = require('mongoose');


function connectDB(){
    
    mongoose.connect(process.env.DB_CONNECT
    ).then(()=>{
        console.log("Connected to MongoDB");
    }).catch((err)=>{
        console.log("erro in connecting to MongoDB");  
    });
}


module.exports = connectDB;

