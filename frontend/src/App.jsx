
import{useLocation} from 'react-router-dom'
import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import CreateTask from './pages/CreateTask';
import MyTasks from './pages/MyTasks';
import PublicTasks from './pages/PublicTasks';
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import EditTask from "./pages/EditTask";
function AppContent() {

  const location = useLocation();
  const hideNavbar = location.pathname === "/login" || location.pathname ==="/register";


  
  return (
    
    <>
      
      {!hideNavbar && <Navbar />}

      <Routes>

        <Route path="/" element = {<Home/>} />
        <Route path='/login' element = {<Login/>} />
        <Route path='/register' element = {<Register/>} />

        <Route 
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard/>
            </ProtectedRoute>
          }
        />

        
        <Route 
          path="/create-task"
          element={
            <ProtectedRoute>
              <CreateTask/>
            </ProtectedRoute>
          }
        />

        <Route 
          path="/my-tasks"
          element={
            <ProtectedRoute>
              <MyTasks/>
            </ProtectedRoute>
          }
        />

        <Route 
          path="/public-tasks"
          element={
            <ProtectedRoute>
              <PublicTasks/>
            </ProtectedRoute>
          }
        />
        <Route 
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile/>
            </ProtectedRoute>
          }
        />

        <Route 
          path="/edit-task/:id"
          element={
            <ProtectedRoute>
              <EditTask />
            </ProtectedRoute>
          }
        />        

      </Routes>
     
    </>
    
  )
}


function App(){

  return(
    <BrowserRouter>
      <AppContent/>
    </BrowserRouter>
  )
}
export default App
