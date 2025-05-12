const TaskModel = require("../models/tasks.model");


module.exports.createTask = async({
    title,
    description,
    owner
})=>{

    if(!title || !description || !owner){
        throw new Error("All fields are required");
    }

    const task = await TaskModel.create({
        
        title,
        description,
        owner

    });

    return task;
}