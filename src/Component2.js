// Component2.js

import React, { useState } from 'react';

const Component2 = ({ addToast }) => {
  const [inputValue, setInputValue] = useState('');

  const handleClick = () => {
    addToast(inputValue);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleClick}>Show Toast</button>
    </div>
  );
};

export default Component2;
