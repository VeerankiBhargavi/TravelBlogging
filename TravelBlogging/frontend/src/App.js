// src/App.js
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Login from './components/Login/login';
import Search from './components/Search/Search';
import DashBoard from './components/DashBoard/dashboard';
import Profile from './components/Profile/Profile'
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
           <Route path ="/" element ={<DashBoard/>}/>
           <Route path="/api/users/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/api/users/:id" element={<Profile/>}/>
    
        </Routes>
      </div>
    </Router>
  );
}

export default App;
