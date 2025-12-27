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
    
      <button onClick={logoutHandler}  className="inline-block px-6 py-2 duration-200 hover:bg-blue-500 hover:text-white rounded-full">Logout</button>
    
  );
}

export default LogoutButton;
