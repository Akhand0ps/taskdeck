
import {useEffect, useState} from "react"
import axios from "axios";
import { useNavigate , Link} from "react-router-dom";


const Login = () =>{

    const[email,setEmail] = useState("")
    const[password,setPassword] = useState("")
    const[errMsg, setErrMsg] = useState("");

    const navigate = useNavigate();

    const handleLogin = async(e)=>{
        e.preventDefault();

        try{

            const res = await axios.post("http://localhost:4000/api/auth/login",{
                email,
                password
            });

            localStorage.setItem("token",res.data.token);
            navigate("/my-tasks");
        }catch(err){
            setErrMsg(err.response.data.msg || "Login failed");
        }
    }

    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <form
                onSubmit={handleLogin}
                className="bg-white p-8 rounded shadow-md w-full max-w-sm"
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Login</h2>
                {errMsg && <p className="text-red-500 mb-4">{errMsg}</p>}

                <div>
                    <label className="block text-gray-700">Email</label>
                    <input type="email" 
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700">Password</label>
                    <input type="password" 
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                
                <button type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 cursor-pointer"
                >
                Login
                </button>

                <p className="mt-4 text-center text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-green-600 hover:text-green-700 font-semibold">
                        Register here
                        </Link>
                </p>                        


            </form>
        </div>
    )
}

export default Login