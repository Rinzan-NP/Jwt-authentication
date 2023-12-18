// AuthContext.js
import React, { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authToken, setAuthToken] = useState(null);
  const [user, setUser] = useState(null);

  const loginUser = async (e) => {
    e.preventDefault();
    let response = await axios.post("http://127.0.0.1:8000/api/token/", {
      username: e.target.username.value,
      password: e.target.password.value,
    });
    const {data} = response;
    if (response.status === 200) {
      setAuthToken(data);
      setUser(jwtDecode(data.access));
      console.log(jwtDecode(data.access))
      navigate("/");
    }
  };

  let context_data = {
    loginUser: loginUser,
    user: user,
  };

  return (
    <AuthContext.Provider value={context_data}>{children}</AuthContext.Provider>
  );
};
