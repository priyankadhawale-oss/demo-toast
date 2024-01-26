// Component2.js

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import './Popup.css';
import './Component2.css';
const Component2 = ({ addToast }) => {
  const [inputValue, setInputValue] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [timeoutValue, setTimeoutValue] = useState(7);

  const handleClick = () => {
    addToast(inputValue);
  };

  const handleCogClick = () => {
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleConfirmClick = () => {
    // Update the default notification time value with the entered value
    //addToast(`Timeout updated to: ${timeoutValue}`);
    setShowPopup(false);
  };

  const handleTimeoutChange = (event) => {
    const newValue = parseInt(event.target.value, 10);
    setTimeoutValue(isNaN(newValue) ? 0 : newValue);
  };

  return (
    <div>
      <div className='title'>Enter Custom Toast Text
      <button className='setting-icon' style={{marginLeft: '160px'}} ><FontAwesomeIcon icon={faCog} onClick={handleCogClick} style={{ cursor: 'pointer'}} /></button> 
      </div>
      <div>
        <input
        type="text"
        value={inputValue}
        placeholder="Enter Here"
        onChange={(e) => setInputValue(e.target.value)}
        className='input-type'
      />
      </div>
      {showPopup && (
  <div className="popup-container">
    <div className="popup">
      <span onClick={handlePopupClose} className="close">
        &times;
      </span >
     <div className='time-out'> <label htmlFor="timeout">Set Timeout:&ensp;</label>
      <input
        type="number"
        id="timeout"
        value={timeoutValue}
        onChange={handleTimeoutChange}
      />
  </div>
      <button className='confirm-click' onClick={handleConfirmClick}>Confirm</button>
  </div>
  </div>
      )}
      <div>
      <button onClick={handleClick} style={{ marginTop: '10px',marginLeft: '30px'}} className='toast-button2' >
      Show Custom Toast Text
      </button>
      </div>
    </div>

  );
};

export default Component2;
