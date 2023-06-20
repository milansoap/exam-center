import React, { useState, useEffect } from "react";
import ApiService from "./services/ApiService";
import { Exam } from "./models/Exam";
import { Outlet } from "react-router-dom";
import Navigation from "./components/shared/navbar";

function App() {
  return (
    <div className="App">
      <Navigation />
        <Outlet />
    </div>
  );
}

export default App;
