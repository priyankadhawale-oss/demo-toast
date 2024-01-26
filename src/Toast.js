// Toast.js

import React, { useState, useEffect } from 'react';
import './Toast.css';

const Toast = ({ message, onClose, onMouseEnter, onMouseLeave }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 7000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const handleMouseEnter = () => {
    clearTimeout();
  };

  const handleMouseLeave = () => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 7000);
    onMouseLeave(timer);
  };

  return (
    <div
      className={`toast ${isVisible ? 'visible' : 'hidden'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className=''>{message}&ensp;
      <button onClick={onClose} style={{border:'none', background:'#9AE09A', marginRight:'1%' }}>X</button></div>
    </div>
  );
};

export default Toast;
