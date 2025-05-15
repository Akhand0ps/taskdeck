const dotenv = require('dotenv');
dotenv.config();

const express  = require('express');
const app = express();

const cors = require('cors');
const connectDB = require("./db/db");
connectDB();


const userRoutes = require("./routes/user.routes");
const userTasks = require("./routes/Tasks.routes");


app.use(cors({
    origin:['http://localhost:5173','https://taskdeck-akhand0ps.vercel.app'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get("/",(req,res)=>{
    res.send("Welcome to the backend");
})


app.use("/api/auth",userRoutes);
app.use("/api/tasks",userTasks);


module.exports = app;