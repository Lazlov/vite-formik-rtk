import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import { useRefreshMutation } from "./authApiSlice";
import { selectCurrentToken } from "./authSlice";

export const PersistLogin = () => {
  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();
  const token = useSelector(selectCurrentToken);
  const location = useLocation();
  useEffect(() => {
    console.log("effectrun");

    const verifyRefreshToken = async () => {
      console.log("verifying refresh token");
      try {
        await refresh(null);
      } catch (err) {
        console.log(err);
      }
    };
    if (!token) {
      verifyRefreshToken();
    }
  }, []);

  console.log("persist", token);

  return (
    <div>
      {isLoading && <h2>Loading</h2>}
      {isError  && (
        // <Navigate to="/login" state={{ from: location }} replace />
        <div>pls log in again</div> //token expaired
      )}
      {token && isUninitialized && <Outlet />}
      {isSuccess && <Outlet />}
    </div>
  );
};
