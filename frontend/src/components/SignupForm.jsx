import React, { useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {

  const navigate = useNavigate()
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone_number: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const valid = () => {
    if (
      !form.first_name ||
      !form.last_name ||
      !form.email ||
      !form.phone_number
    ) {
      alert("All fields must be filled");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      alert("Invalid email format");
      return false;
    }
    if (!/^\d{10}$/.test(form.phone_number)) {
      alert("Invalid phone number format");
      return false;
    }
    if (form.confirmPassword !== form.password) {
      alert("Password must be same");
      return false;
    }
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (valid()) {
      try {
        let response = await axios.post(
          "http://127.0.0.1:8000/api/register/",
          form
        );
        if (response.status === 200  ){
          navigate('/login')
        }
      } catch (error) {
       alert("something went wrong") 
      }
      
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">Sign up !</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-4 border-2 border-gray-300 rounded-md"
      >
        <label className="block">
          <span className="text-gray-700">First Name</span>
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            onChange={handleChange}
            className="block w-96 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Last Name</span>
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            onChange={handleChange}
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Phone Number</span>
          <input
            type="text"
            name="phone_number"
            placeholder="+91......"
            onChange={handleChange}
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Email</span>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Password</span>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Confirm Password</span>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            required
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
        </label>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-400"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
