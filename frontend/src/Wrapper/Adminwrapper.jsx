import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPrivateRoute from "../utils/AdminPrivateRoute";
import AdminLogin from "../pages/AdminLogin";
import AdminHome from "../pages/AdminHome";
import AdminAdduser from "../pages/AdminAdduser";

const AdminWrapper = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
        <Route
          path="/"
          element={
            <AdminPrivateRoute>
              <AdminHome />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/addUser"
          element={
            <AdminPrivateRoute>
              <AdminAdduser/>
            </AdminPrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default AdminWrapper;
