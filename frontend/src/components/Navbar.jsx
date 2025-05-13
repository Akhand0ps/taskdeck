import { Link } from "react-router-dom"

const Navbar = ()=>{
    return (


        <nav className="bg-blue-700 text-white px-6 py-6 flex justify-between items-center">
            <h1 className="text-xl font-bold">Task Manager</h1>
            <div className="space-x-4">
                <Link to="/" className="hover:underline">Home</Link>
                <Link to="/create-task" className="hover:underline">Add Task</Link>
                <Link to="/my-tasks" className="hover:underline">My Tasks</Link>
                <Link to="/public-tasks" className="hover:underline">Public Tasks</Link>
                <Link to="/profile" className="hover:underline">Profile</Link>
            </div>
        </nav>
    )
}


export default Navbar