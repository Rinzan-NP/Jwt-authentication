// AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authToken, setAuthToken] = useState(() =>
    localStorage.getItem("authToken")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/token/", {
        username: e.target.username.value,
        password: e.target.password.value,
      });

      const { data } = response;

      if (response.status === 200 || response.status === 204) {
        setAuthToken(data);
        setUser(jwtDecode(data.access));
        localStorage.setItem("user", JSON.stringify(jwtDecode(data.access)));
        localStorage.setItem("authToken", JSON.stringify(data));
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Invalid credential !");
      } else {
        console.error(error);
      }
    }
  };

  const updateToken = async () => {
    let response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: authTokens?.refresh }),
    });

    let data = await response.json();

    if (response.status === 200) {
      setAuthToken(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
    } else {
      logoutUser();
    }
  };

  useEffect(() => {
    let fourMinutes = 1000 * 60 * 4;

    let interval = setInterval(() => {
      if (authToken) {
        updateToken();
      }
    }, fourMinutes);
    return () => clearInterval(interval);
  }, [authToken]);

  const logoutUser = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/login");
  };

  let context_data = {
    loginUser: loginUser,
    user: user,
    logoutUser: logoutUser,
  };

  return (
    <AuthContext.Provider value={context_data}>{children}</AuthContext.Provider>
  );
};
