const TaskModel = require("../models/tasks.model");


module.exports.createtaskk = async({
    title,
    description,
    isPublic,
    owner
})=>{

    if(!title || !description || !owner){
        throw new Error("All fields are required");
    }

    const task = await TaskModel.create({
        
        title,
        description,
        isPublic,   
        owner

    });

    return task;
}