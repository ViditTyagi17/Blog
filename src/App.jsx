import { useState, useEffect } from "react";

import authService from "./appwrite/auth";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, setLoading } from "./store/authSlice";
import { Outlet } from "react-router-dom";
import Header from './components/header/Header'
import  Footer  from './components/footer/Footer.jsx';
import { setTheme } from "../theme/themeSlice.js";


function App() {
  const loading = useSelector((state)=>state.auth.loading)
  const dispatch = useDispatch();

  
useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    dispatch(setTheme(mediaQuery.matches ? "dark" : "light"));
    
    const handleChange = (e) => {
      dispatch(setTheme(e.matches ? "dark" : "light"));
    };
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [dispatch]);

   useEffect(() => {
    dispatch(setLoading(true));
    authService.getCurrentUser().then((user) => {
      if (user) {
        dispatch(login(user));

        
      } else {
        dispatch(logout());
      }
    }).finally(()=>dispatch(setLoading(false)));
  }, [dispatch]);

  if(loading){
     return (<div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-neutral-700">
    <p className="text-lg font-medium text-black dark:text-white">Loading...</p>
  </div>);
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-neutral-700">
    <Header />
    <main className="grow px-4 sm:px-6 lg:px-8">
       <Outlet />
    </main>
     <Footer />
    </div>
     );
}

export default App;
