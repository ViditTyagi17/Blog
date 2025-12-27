import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Protected({ children, authentication = true }) {
  const [loader, setLoader] = useState(true);

  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    // if(authStatus===true){
    //   navigate('/')

    // }else(authStatus===false){
    //   navigate('/login')
    // }

    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    setLoader(false);
  }, [authStatus, navigate, authentication]);



//   useEffect(() => {
//   // If still checking authentication, don't do anything yet
//   if (authStatus === null) return;

//   // Page requires login but user isn't logged in
//   if (authentication && !authStatus) {
//     navigate("/login");
//   } 
//   // Page is public (like login/signup) but user IS logged in
//   else if (!authentication && authStatus) {
//     navigate("/");
//   }

//   setLoader(false);
// }, [authStatus, authentication, navigate]);

  return loader ? <h1>Loading...</h1> : <>{children}</>;
}
