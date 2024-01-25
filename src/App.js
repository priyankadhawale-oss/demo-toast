// src/App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from 'react-router-dom';
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
            <ul>
              <li><Link to="/">Header</Link></li>
              <li><Link to="/component1">First Component</Link></li>
              <li><Link to="/component2">Second Component</Link></li>
              <li><Link to="/component3">Third Component</Link></li>
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

export default App;
