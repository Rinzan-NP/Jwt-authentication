import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PrivateRoute from "./utils/PrivateRoute";
import { Provider } from "react-redux";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import store from "./redux/store";

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Provider>
    </Router>
  );
}

export default App;
