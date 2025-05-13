import { useState } from "react";
import axios from "../axios";
import { useNavigate } from "react-router-dom";


const CreateTask = () => {

    const[title,setTitle] = useState("");
    const[description,setDescription]= useState("");
    const[isPublic,setIsPublic] = useState(false);
    const[error,setError] = useState("");


    const navigate = useNavigate();

    const handleCreate = async(e)=>{
        e.preventDefault();

        try{
            await axios.post("/tasks",{
                title,
                description,
                isPublic,
            })
            alert("Task created successfully");
            navigate("/my-tasks");
        }catch(err){
            setError(err.res?.data?.message || "Task creation Failed");
        }
    }


    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
              <form 
                onSubmit={handleCreate}
                className="bg-white p-8 rounded shadow-md w-full max-w-md"
              >


                <h2 className="text-2xl font-bold mb-6 text-center text-green-700">Create Your Task</h2>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <div className="mb-4">
                    <label className="block text-gray-700 font-gray-700">Title</label>
                    <input
                        type="text"
                        value={title}
                        placeholder="go to gym"
                        onChange={(e)=>{
                            setTitle(e.target.value);
                        }}
                        required
                        className ="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-green-500"

                    />  
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-700 font-gray-700">Description</label>
                    <textarea
                        value={description}
                        placeholder="go to gym and workout for 2hrs"
                        onChange={(e)=>{
                            setDescription(e.target.value);
                        }}
                        required
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-green-500"

                    ></textarea>
                      
                </div>
                
                
                
                <div className="mb-6 flex items-center gap-2">

                    <input
                        type="checkbox"
                        checked={isPublic}
                        onChange={(e) => setIsPublic(e.target.checked)}
                        className="mr-2 cursor-pointer "

                    />
                    <label className="block text-gray-700 font-gray-700">Make Public</label>
                    <button 
                        type="submit"
                        className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer"
                    >
                        Create
                    </button>
                </div>
              </form>
        </div>
    )
}


export default CreateTask;