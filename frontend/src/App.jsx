import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";

const App = () => {
  return (
    <div className="w-full h-screen bg-zinc-900">
      <Routes>
        <Route path={"/"} element={<Register />}></Route>
        <Route path={"/dashboard"} element={<Dashboard />}></Route>
      </Routes>
    </div>
  );
};

export default App;
