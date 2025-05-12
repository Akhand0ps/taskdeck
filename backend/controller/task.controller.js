const TaskModel = require('../models/tasks.model');
const UserModel = require("../models/user.model");
const TaskService = require('../services/task.service');

module.exports.createTask = async(req,res)=>{

    try{
        const {title,description} = req.body;
        const owner = req.user._id;

        const task = await TaskService.createTask({title,description,owner});

        res.status(201).json({message:"Task created successfully",task});
    }catch(err){
        next(err);
        res.status(500).json({message:"Internal server error"});
    }
    
}

module.exports.getAllTasks = async(req,res)=>{
    // console.log(req.user);
    try{
        const tasks = await TaskModel.find({owner:req.user._id});
        const toSend = tasks.map((t) => ({
            title: t.title,
            description: t.description,
            isCompleted: t.isCompleted
        }));

        res.status(200).send(toSend);
    }catch(err){
        
        res.status(500).json({message:"Internal server error"});
    }
}


module.exports.getOneTask = async(req,res)=>{

    try{
        const taskId = req.params.id;

        const task = await TaskModel.findById(taskId);

        if(!task){
            return res.status(404).json({message:"Task not found"});
        }

        res.status(200).json({task});
    }catch(err){

        res.status(500).json({message:"Internal server error"});
    }
}

module.exports.updateTask = async(req,res)=>{
    
    try{
        const taskId = req.params.id;

        const task = await TaskModel.findById(taskId);

        if(!task){
            return res.status(404).json({message:"Task not found"});
        }

        const {title,description} = req.body;

        task.title = title;
        task.description = description;

        await task.save();

        res.status(200).json({message:"Task updated successfully",task});

        

    }catch(err){
        res.status(500).json({message: "Internal server error"});
    }
}


module.exports.deleteTask = async(req,res)=>{

    try{
        const taskId = req.params.id;

        const task = await TaskModel.findById(taskId);

        if(!task){
            return res.status(404).json({message:"Task not found"});
        }

        await TaskModel.findByIdAndDelete(taskId);


        res.status(200).json({message:"Task deleted successfully"});
    }catch(err){
        res.status(500).json({message:"Internal server error"});
    }
}

module.exports.togglePublic = async(req,res)=>{
        
    try{
        const taskId = req.params.id;

        const task = await TaskModel.findById(taskId);

        if(!task){
            return res.status(404).json({message:"Task not found"});
        }

        if(task.owner.toString() !== req.user._id.toString()){
            return res.status(401).json({message:"You are not authorized to perform this action"});
        }

        task.isPublic = !task.isPublic;

        await task.save();

        res.status(200).json({message:"Task updated successfully",task});
    }catch(err){
        res.status(500).json({message:"Internal server error"});
    }
}

module.exports.completeTask = async(req,res)=>{
     try{
        const taskId = req.params.id;

        const task = await TaskModel.findById(taskId);

        if(!task){
            return res.status(404).json({message:"Task not found"});
        }

        if(task.owner.toString() !== req.user._id.toString()){
            return res.status(401).json({message:"You are not authorized to perform this action"});
        }

        if(task.isPublic){
            task.isPublic = true;
        }
        else{
            task.isPublic = false;
        }

        task.isCompleted = !task.isCompleted;

        await task.save();

        res.status(200).json({message:"Task updated successfully",task});
    }catch(err){
        res.status(500).json({message:"Internal server error"});
    }
}


module.exports.viewPublicTasks = async(req,res)=>{

    try{
        const userId = req.params.userId;
        const tasks = await TaskModel.find({
            owner:userId,
            isPublic:true});

        const toSend = tasks.map((t) => ({
            title: t.title,
            description: t.description,
            isCompleted: t.isCompleted
        }));

        return res.status(200).send(toSend);
    }catch(err){
        res.status(500).json({message:"Internal server error"});    
    }
}

module.exports.viewPUsers = async(req,res)=>{
    
        console.log('Fetching public tasks...');
        
        const usersIds = await TaskModel.distinct('owner', { isPublic: true });
        console.log('Found user IDs:', usersIds);

        if (!usersIds.length) {
            return res.status(200).json([]);
        }

        const users = await UserModel.find({ _id: { $in: usersIds } })
            .select('fullname email -_id');
        console.log('Found users:', users);

        return res.status(200).json(users);

    
}