import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import './ConfigureTimeout.css';

const Component1 = ({ addToast }) => {
  const [clickCount, setClickCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [timeoutValue, setTimeoutValue] = useState(0);

  
  const handleClick = () => {
    setClickCount((prevCount) => prevCount + 1);
    addToast(`Testing : ${clickCount + 1}`, timeoutValue);
  };

  const handleCogClick = () => {
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleConfirmClick = () => {
    setShowPopup(false);
  };

  const handleTimeoutChange = (event) => {
    const newValue = parseInt(event.target.value, 10);
    setTimeoutValue(newValue*1000);
  };

  return (
    <div>
      <button onClick={handleClick} style={{ marginLeft: '30px', marginTop:'30px', marginRight:'20px' }} className='toast-button'>
        Show Toast Message
      </button>
      {/* <ConfigureTimeout/> */}
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
              //value={timeoutValue}
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
