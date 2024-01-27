import React, { useState } from 'react';
import './Component3.css';
const Component3 = ({ addToast }) => {
  const [inputValue, setInputValue] = useState('');
  const [showCountdown, setShowCountdown] = useState(true);
  const [countdown, setCountdown] = useState(0);
  const [countries, setCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(false);

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
            setShowCountdown(false);
            // API Call
            fetchData();         
            // Reset countdown to 0 after reaching 1   
            return 0; 
          }
  
          return prevCount - 1;
        });
      }, 1000);
    }
  }; 

  const fetchData = async () => {
    try {
      setIsLoading(true);
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
    finally{
      setIsLoading(false);
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
    <div>
    {showCountdown?
    (<div>
      <div className='title'>Enter Countdown Time</div>
      <div><input
        type="number"
        placeholder="Enter Here"
        value={inputValue}
        onChange={handleInputChange}
        className='input-type'
      /></div>
      <div><button onClick={handleClick} className='toast-button2'>Start Timer</button></div>
      </div>)
      :isLoading ? 
    (
        <div style={{fontSize:'30px', marginTop:'40px', marginLeft:'30px'}}>Fetching Data, Please wait...</div>
    ) :
      
    (<div>
      <div>
        {countries.length > countriesPerPage && (
          <nav>
            <div>
            <ul className="pagination">
              <li>
                <button className='pagination-button' onClick={handlePrevious}>Previous</button>
              </li>
              <li>
                <button className='pagination-button' onClick={handleNext}>Next</button>
              </li>
            </ul>
            </div>
          </nav>
        )}   
        </div>
        <div style={{marginTop:'50px'}}>
        <ul>
          {currentCountries.map((country) => (
            <li style={{listStyle:'none', padding:'10px', fontSize:'20px'}} key={country.country_id}>{country.country_name}</li>
          ))}
        </ul>              
      </div>
      </div>
      )}
    </div>
  );
};

export default Component3;
