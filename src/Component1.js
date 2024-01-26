import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import './Popup.css';

const Component1 = ({ addToast }) => {
  const [clickCount, setClickCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [timeoutValue, setTimeoutValue] = useState(7);

  
  const handleClick = () => {
    setClickCount((prevCount) => prevCount + 1);
    addToast(`Testing : ${clickCount + 1}`);
  };

  const handleCogClick = () => {
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleConfirmClick = () => {
    // Update the default notification time value with the entered value
    // addToast(`Timeout updated to: ${timeoutValue}`);
    setShowPopup(false);
  };

  const handleTimeoutChange = (event) => {
    const newValue = parseInt(event.target.value, 10);
    setTimeoutValue(isNaN(newValue) ? 0 : newValue);
  };

  return (
    <div>
      <button onClick={handleClick} style={{ margin: '20px' }} className='toast-button'>
        Show Toast Message
      </button>
      <button className='setting-icon'><FontAwesomeIcon icon={faCog} onClick={handleCogClick} style={{ cursor: 'pointer' }} /></button>

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
    </div>
  );
};

export default Component1;
