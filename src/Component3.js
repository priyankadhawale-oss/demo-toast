// Component3.js

import React, { useState } from 'react';
import './Component3.css';
const Component3 = ({ addToast }) => {
  const [inputValue, setInputValue] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [countries, setCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(5);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  
  const handleClick = async () => {
    const seconds = parseInt(inputValue, 10);
    
    if (!isNaN(seconds)) {
      setCountdown(seconds);
      const intervalId = setInterval(() => {
        setCountdown((prevCount) => {
          addToast(`${prevCount} :1`);
  
          if (prevCount <= 1) {
            clearInterval(intervalId);
            // Make API call here
            /* let x= setTimeout(start,2000);
            function start(){
            document.write("fetching data, please wait");
            clearTimeout(x);
            
            fetchData();
            } */
            fetchData();
            
            return 0; // Reset countdown to 0 after reaching 1
          }
  
          return prevCount - 1;
        });
      }, 1000);
    }
  }; 

  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://api.knowmee.co/api/v1/master/get-country-list'
      );
      const data = await response.json();

      if (data.status && data.responseData) {
        setCountries(data.responseData);        
      }
    } catch (error) {
      addToast('Error fetching data from the API');
      console.error(error);
    }
  };

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = countries.slice(indexOfFirstCountry, indexOfLastCountry);

  const handlePrevious = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const handleNext = () => {
    setCurrentPage((prevPage) =>
      prevPage < Math.ceil(countries.length / countriesPerPage) ? prevPage + 1 : prevPage
    );
  };

  return (
    <div className='component3'>
      <div>
      <div className='title'>Enter Countdown Time</div>
      <div><input
        type="number"
        placeholder="Enter Here"
        value={inputValue}
        onChange={handleInputChange}
        className='input-type'
      /></div>
      <div><button onClick={handleClick} className='toast-button2'>Start Time</button></div>
      </div>
      
      <div>
        
        <ul>
        <h2>Countries</h2>
          {currentCountries.map((country) => (
            <li key={country.country_id}>{country.country_name}</li>
          ))}
        </ul>
        {/* Pagination */}
        {countries.length > countriesPerPage && (
          <nav>
            <ul className="pagination">
              <li>
                <button className='pagination-button' onClick={handlePrevious}>Previous</button>
              </li>
              <li>
                <button className='pagination-button' onClick={handleNext}>Next</button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
};

export default Component3;
