import { useEffect, useState } from "react";
import axios from "../axios";

const PublicTasks = () =>{
    
    const[users,setUsers] = useState([]);
    const[tasks,setTasks] = useState([]);
    const [error, setError] = useState("");

    const[selectedUser,setSelectedUser] = useState(null);

    useEffect(()=>{

            const fetchUsers = async () =>{
            try{

                const res = await axios.get("/tasks/public");
                setUsers(res.data);
            }catch(err){
                console.error("Error fetching users:", err);
                setError(err.response?.data?.message || "Failed to fetch users");
            }
        }
        fetchUsers();
    },[])

    const fetchTasks = async (userId) =>{
        try{
            const res = await axios.get(`/tasks/public/${userId}`);
            console.log("Tasks fetched:", res.data);
            setTasks(res.data);
            setSelectedUser(userId);
        }catch(err){
            console.error("Error fetching tasks: ",err);
        }
    }


    return (

        <div className="p-6">

            <h2 className="text-2xl font-bold mb-4">Public Tasks of Others Users</h2>

            <div className="flex gap-4 overflow-x auto mb-6">
                {users && users.map((user)=>(
                    <button
                        key={user._id}
                        onClick={()=>fetchTasks(user._id)}
                        className={`px-4 py-2 rounded ${
                            selectedUser === user._id ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                        }`}
                    >
                    {user.fullname.firstname}  {user.fullname.lastname}
                    </button>
                ))}
            </div>


            {tasks.length === 0 ? (
                <p className="text-gray-500">No pubic tasks available</p>

            ):(
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tasks.map((tasks,index)=>(
                        <div 
                        
                           key={index}
                           className="bg-white border-l-4 rounded shadow p-4"
                           style ={{
                            borderColor: tasks.isCompleted ? "#16a34a" : "#facc15",
                           }}
                        >

                        <h3 className="text-lg font-semibold">{tasks.title}</h3>
                        <p>{tasks.description}</p>  

                        <p
                            className={`text-sm mt-2 font-semibold ${
                                tasks.isCompleted ? "text-green-600" : "text-yellow-600"
                            }`}
                        >
                            {tasks.isCompleted ? "Completed ✔️" : "Pending 🕒"}
                        </p>
                        </div>
                    ))}


                </div>
            )}

        </div>
    )
}

export default PublicTasks;