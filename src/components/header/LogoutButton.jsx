import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutButton() {
 const dispatch=useDispatch()
  const logoutHandler = async () => {
    
    try {
      await authService.logout();
      dispatch(logout())
    } catch (error) {
      console.error("Logout failed:", error)
    }
    
    
  };

  return (
    
      <button onClick={logoutHandler}  className=" sm:px-4 sm:py-2 px-2 py-1  rounded-full transition-colors duration-200 hover:bg-cyan-500 hover:text-white">Logout</button>
    
  );
}

export default LogoutButton;
