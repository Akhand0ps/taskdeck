import { Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion"; 

const Home = () => {
  const isAuthenticated = localStorage.getItem("token");

  if (isAuthenticated) return <Navigate to="/my-tasks" />;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 flex flex-col justify-center items-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full text-center"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-800 mb-4">
          Welcome to TaskDeck
        </h1>
        <p className="text-gray-600 text-base md:text-lg mb-8 max-w-md mx-auto">
          Organize your tasks effortlessly and share them with the world.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Link
            to="/login"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Register
          </Link>
        </div>
      </motion.div>
      <div className="mt-8 text-gray-500 text-sm">
        <p>Trusted by thousands to manage tasks efficiently</p>
      </div>
    </div>
  );
};

export default Home;