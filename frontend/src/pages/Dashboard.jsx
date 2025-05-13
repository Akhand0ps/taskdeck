import { useEffect , useState} from "react";

import axios from "../axios";

const Dashboard = () =>{

    const[user,setUser] = useState(null);

    useEffect(()=>{
        const getProfile = async()=>{
            try{
                const response = await axios.get("/auth/profile");
                setUser({
                    firstname: response.data.user.firstname,
                    lastname:response.data.user.lastname,
                    email:response.data.email
                }); 
            }catch(err){
                console.error("Failed to fetch profile: ",err);
            };
        }
        getProfile();
    },[]);

    return (
        <div className="p-10 text-center text-2xl font-semibold text-gray-800">
            {user ? `Welcome ${user.firstname} 👋`: "Loading..."}
        </div>
    )
}


export default Dashboard