// NotificationProvider.js

import React, { useState } from 'react';
import Toast from './Toast';

const NotificationProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message) => {
    const newToast = {
      id: Date.now(),
      message,
    };

    setToasts((prevToasts) => [...prevToasts, newToast]);
  };

  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  const handleMouseLeave = (timer) => {
    setToasts((prevToasts) => {
      const [currentToast, ...remainingToasts] = prevToasts;
      if (currentToast) {
        return [{ ...currentToast, timer }, ...remainingToasts];
      }
      return prevToasts;
    });
  };

  return (
    <div>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          onClose={() => removeToast(toast.id)}
          onMouseLeave={() => handleMouseLeave(toast.timer)}
        />
      ))}
      {children(addToast)}
    </div>
  );
};

export default NotificationProvider;
 
