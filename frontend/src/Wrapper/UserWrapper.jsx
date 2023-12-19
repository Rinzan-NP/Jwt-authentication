import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import PrivateRoute from "../utils/PrivateRoute";
import SignUp from "../pages/SignUp";
import Profile from "../pages/Profile";
import isAuthUser from "../utils/isAuthUser";
import { useDispatch, useSelector } from "react-redux";
import { set_Authentication } from "../redux/Authentication/AuthenticationSlice";

const UserWrapper = () => {
  const dispatch = useDispatch();

  const authentication_user = useSelector((state) => state.authentication_user);
  const checkAuth = async () => {
    const isAuthenticated = await isAuthUser();
    dispatch(
      set_Authentication({
        
        name: isAuthenticated.name,
        isAuthenticated: isAuthenticated.isAuthenticated,
        isAdmin : isAuthenticated.name === "Admin" ? true : false
      })
    );
  };

  useEffect(() => {
    if (!authentication_user.name) {
      console.log("the auth user  ");
      checkAuth();
    }
    if (authentication_user.isAuthenticated) {
      console.log("authenticated");
    }
    // eslint-disable-next-line
  }, [authentication_user]);
  

  return (
    <Routes>
      <Route
        exact
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      ></Route>
      <Route
        exact
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      ></Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

export default UserWrapper;
