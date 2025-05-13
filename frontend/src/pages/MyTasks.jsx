import axios from "../axios";
import { useEffect, useState } from "react";
import { useNavigate,Link } from "react-router-dom";

const MyTasks = () =>{
    const[tasks,setTasks] = useState([]);
    const[isLoading,setIsLoading] = useState(true);
    const [sortBy, setSortBy] = useState('date'); // 'date', 'status', 'public'
    const [searchTerm, setSearchTerm] = useState('');

    const navigate = useNavigate();

    const getTasks = async()=>{
        try{
            setIsLoading(true);
            const response = await axios.get("/tasks");
            setTasks(response.data);
        }catch(err){
            console.error("Error fetching tasks: ",err);
        }finally{
            setIsLoading(false);
        }

    };

    const toggleTask = async (taskId) =>{
        try{
            await axios.patch(`/tasks/${taskId}/toggle`);
            getTasks();
        }catch(err){
            console.error("Error toggling task: ",err);
        }
    }

    const deleteTask = async(taskId)=>{
        if(window.confirm("Are you sure you want to delete this task?")){
            try{
                await axios.delete(`/tasks/${taskId}`);
                getTasks();
            }catch(err){
                console.error("Error deleting task: ",err);
            }
        }
        
    }

    useEffect(()=>{
        getTasks();
        
    },[]);

    const sortTasks = (tasks) => {
        switch(sortBy) {
            case 'status':
                return [...tasks].sort((a, b) => b.isCompleted - a.isCompleted);
            case 'public':
                return [...tasks].sort((a, b) => b.isPublic - a.isPublic);
            default:
                return tasks; // Default sort by date
        }
    };

    const filteredTasks = tasks.filter(task => 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (

        <div className="min-h-screen bg-gray-50 p-6">

            <h2 className="text-3xl font-semibold text-center mb-6 text-blue-700">My tasks</h2>
            {isLoading ? (
                <div className="flex justify-center">
                    <p className="text-gray-600"> Loading tasks...</p>
                </div>
            ):tasks.length === 0 ? (
                <div className="text-center"> 
                <p className="text-center text-gray-600 mb-4">No tasks found</p>
                <Link 
                    to="/create-task"
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 "
                    >
                        Create Your First Task
                    </Link>
                </div>

            ) : (
                <>
                    <div className="mb-4 flex justify-end">
                        <select 
                            value={sortBy} 
                            onChange={(e) => setSortBy(e.target.value)}
                            className="p-2 border rounded"
                        >
                            <option value="date">Sort by Date</option>
                            <option value="status">Sort by Status</option>
                            <option value="public">Sort by Visibility</option>
                        </select>
                    </div>
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full max-w-md mb-4 p-2 border rounded"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        
                        {sortTasks(filteredTasks).map((task,index) => (
                            
                            <div
                                key={index}
                                className="bg-white shadow-md rounded p-4 border-l-4"
                                style={{
                                    borderColor:task.isCompleted ? "#16a34a" : "#facc15",
                                }}
                            >
                                <h3 className="text-xl font-bold mb-2">{task.title}</h3>
                                <p className="text-gray-700 mb-2">{task.description}</p>

                                <p 
                                    className={`text-sm font-semibold ${
                                        task.isCompleted ? "text-green-600" : "text-yellow-600"
                                    }`}
                                >
                                    {task.isCompleted ? "Completed ✔️" : "Pending 🕒"}
                                </p>

                                <p
                                    className={`text-sm ${
                                    task.isPublic ? "text-blue-500" : "text-gray-400"
                                    }`}
                                >
                                    {task.isPublic ? "Public 🌍" : "Private 🔒"}
                                </p>

                                <div>

                                    <button 
                                        onClick={()=> navigate(`/edit-task/${task._id}`)}
                                        className="px-4 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
                                        
                                        >
                                        Edit

                                    </button>
                                </div>

                                <div className="flex gap-3 mt-4">
                                    
                                    <button
                                        onClick={()=>
                                            toggleTask(task._id)
                                        }
                                        className="mt-3 px-4 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700 cursor-pointer"
                                    >

                                        Togggle Status
                                    </button>

                                    <button
                                        onClick={()=>{
                                            deleteTask(task._id);
                                        }}
                                        className="px-8 py-0 text-sm bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
                                    >
                                        Delete
                                    </button>

                                </div>
                            </div>
                        
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default MyTasks