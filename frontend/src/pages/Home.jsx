import {Link, Navigate} from "react-router-dom";

const Home = () =>{


    const isAuthenticated = localStorage.getItem("token");

    if(isAuthenticated) return <Navigate to="/my-tasks"/>

    return (
        <div className="min-h-screen bg-gray-200 flex flex-col justify-center items-center">


            <h1 className="text-4xl font-bold mb-4 text-blue-700" >Welcome to TaskDeck</h1>
            <p  className="mb-6 text-gray-600">Save your tasks and share them publicly</p>
            <div className="flex space-x-4"> 
                <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Login</Link>
                <Link to="/register" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Register</Link>
            </div>
        </div>
    )
}

export default Home