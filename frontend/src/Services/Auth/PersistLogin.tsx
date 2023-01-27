import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { useRefreshMutation } from "./authApiSlice";
import { selectCurrentToken } from "./authSlice";

import { processResult } from "immer/dist/internal";

const usePersist = () => {
  const[persist, setPersist] = useState(JSON.parse(localStorage.getItem('persist') as any)|| false)
  useEffect(()=>{
      localStorage.setItem("persist", JSON.stringify(persist))
  },[persist])
return [persist, setPersist]
}

//v cookie refreshtokern
//refresh daet nam novii access

export const PersistLogin = () => {
  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();
  const token = useSelector(selectCurrentToken);
  const [trueSuccess, setTrueSuccess] = useState(false);
  const [persist] = usePersist()

  const effectRan = useRef(false);
  useEffect(() => {
    if (effectRan.current === false|| process.env.NODE_ENV !== "development") {
      console.log('useeffect')
   
      const verifyRefreshToken = async () => {
        console.log("verifying refresh token");
        try {
          await refresh(null); //why null
          setTrueSuccess(true);
          
        } catch (err) {
          console.log(err);
          
        }
        
      };
      verifyRefreshToken();
    }
    return () => {
      effectRan.current = true;
    };
  }, []);


  // let content
  // if (!persist) { // persist: no
  //     console.log('no persist')
  //     content = <Outlet />
  // } else if (isLoading) { //persist: yes, token: no
  //     console.log('loading')
  //     content = <p>Loading...</p>
  // } else if (isError) { //persist: yes, token: no
  //     console.log('error')
  //     content = (
  //         <p className='errmsg'>
  //             {`${error} - `}
              
  //         </p>
  //     )
  // } else if (isSuccess && trueSuccess) { //persist: yes, token: yes
  //     console.log('success')
  //     content = <Outlet />
  // } else if (token && isUninitialized) { //persist: yes, token: yes
  //     console.log('token and uninit')
  //     console.log(isUninitialized)
  //     content = <Outlet />
  // }

  // return content

  return (
    <div>
      {isLoading && <h2>Loading</h2>}
      {isError && <h2>Please login again</h2>}
      {isSuccess && trueSuccess && <Outlet />}
      {token && isUninitialized && <Outlet />}
    </div>
  );
};
