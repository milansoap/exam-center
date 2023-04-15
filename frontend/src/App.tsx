import React, { useState, useEffect } from 'react';
import ApiService from './services/ApiService';
import { Exam } from './models/Exam';
import { Outlet } from 'react-router-dom';

function App() {

  return (
      <div className="App">
        <Outlet />
      </div>
        );
}

export default App;
