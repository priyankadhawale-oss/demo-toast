// src/App.js
import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Routes, Navigate, useNavigate, useLocation  } from 'react-router-dom';
import Component1 from './Component1';
import Component2 from './Component2';
import Component3 from './Component3';
import NotificationProvider from './NotificationProvider';


//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
//import '../node_modules/bootstrap/dist/js/bootstrap.min.js';

function App() {
  return (
    <Router>
      <NotificationProvider>
        {(addToast) => (
      <div className="app-container">
        <header className="red-header">
          <nav>
            <ul className="navbar-container">
              <li style={{fontSize:'20px'}}activeClassName="active"><Link to="/">Header</Link></li>
              <li className="flex-grow"></li>
              <li><NavItem to="/component1" activeClassName="active" text="First Component"/></li>
              <li><NavItem to="/component2" activeClassName="active" text="Second Component"/></li>
              <li><NavItem to="/component3" activeClassName="active" text="Third Component"/></li>
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/component1" />} />
            <Route path="/component1" element={<Component1 addToast={addToast}/>} />
            <Route path="/component2" element={<Component2 addToast={addToast} />} />
            <Route path="/component3" element={<Component3 addToast={addToast}/>} />
          </Routes>
        </main>

        <footer className="grey-footer">
          <p>Footer</p>
        </footer>
      </div>
      )}
      </NotificationProvider>
    </Router>
  );
}
// Custom component for clickable list item
function NavItem({ to, text }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname === to;

  const handleClick = () => {
    navigate(to);
  };

  return (
    <li className={`navbar-button ${isActive ? 'active' : ''}`} onClick={handleClick}>
      {text}
    </li>
  );
}
export default App;
