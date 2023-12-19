// Home.js
import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import Navbar from "../components/Navbar";

const Home = () => {
  let { user, logoutUser } = useContext(AuthContext);

  const handleLogout = () => {

  }

  return (
    <>
      <Navbar />
      <div className="max-w-sm mx-auto mt-8 p-4 bg-green-100 rounded shadow-lg">
        <p className="text-green-800 mb-2">Successfully logged in! {user.username}</p>
        <button
          onClick={logoutUser}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:shadow-outline-red"
        >
          Logout
        </button>
        
   
      </div>
    </>
  );
};

export default Home;
