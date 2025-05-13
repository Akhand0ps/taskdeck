import { useEffect, useState } from "react"
import axios from "../axios";
import { useNavigate } from "react-router-dom";


const Profile = () =>{
    const [user,setUser] = useState(null);
    const navigate = useNavigate();


    const getProfile = async () =>{

        try{

            const res = await axios.get("/auth/profile");
            setUser(res.data.user);
        }catch(err){
            console.error("Not logged in");
            navigate("/login");
        }
    };


    const handleLogout = async () =>{
        try{
            await axios.post("auth/logout");
            localStorage.removeItem("token");
            navigate("/login");
        }catch(err){
            console.error("Logout failed");
        }
    }


    useEffect(()=>{
        getProfile();
    },[]);

    if(!user) return <p className="p-4 text-gray-600">Loading...</p>


    return(

        <div className="p-6">
            
            <h2 className="text-2xl font-bold mb-4">My Profile</h2>
            <div className="bg-white p-4 rounded shadow w-full max-w-sm ">

                <p><strong>Full Name:</strong> {user.fullname.firstname} {user.fullname.lastname}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </div>

            <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 mt-10 cursor-pointer"
            >

                Logout
            </button>

        </div>
    )
}


export default Profile