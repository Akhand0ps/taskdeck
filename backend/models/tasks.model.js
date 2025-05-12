const mongoose = require('mongoose');


const taskSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true,
        trim:true,
    },

    description:{
        type:String,
        trim:true,
    },

    isCompleted:{
        type:Boolean,
        default:false,
    },

    isPublic:{
        type:Boolean,
        default:false,
    },

    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User',
    },

    creadtedAt:{
        type: Date,
        default:Date.now,
    }
});



module.exports = mongoose.model("Task",taskSchema);