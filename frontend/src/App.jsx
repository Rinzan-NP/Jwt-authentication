import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./redux/store";
import UserWrapper from "./Wrapper/UserWrapper";

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Routes>
          <Route path="/*" element={<UserWrapper/>}></Route>
          <Route path="admin/*" element={<h1>hello</h1>}></Route>
        </Routes>
      </Provider>
    </Router>
  );
}

export default App;
