// Component3.js
import React, { useState } from 'react';

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
      addToast(`Reverse count started for ${seconds} seconds`);

      setCountdown(seconds);

      const intervalId = setInterval(() => {
        addToast(`Countdown: ${countdown} seconds`);
        setCountdown((prevCount) => prevCount - 1);

        if (countdown <= 0) {
          clearInterval(intervalId);
          // Make API call here
          fetchData();
        }
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
        addToast('API call successful. Displaying countries:');
      } else {
        addToast('API call successful, but no country data found.');
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
    <div>
        <form>
            <table>
                <tr>
      <th><label htmlFor="countdownInput">Enter Countdown Time:</label></th></tr>
      <tr><td><input
        type="number"
        id="countdownInput"
        placeholder="Enter Here"
        value={inputValue}
        onChange={handleInputChange}
        style={{ width: '100%' }}
      /></td></tr>
      <tr>
      <button
        onClick={handleClick}
        style={{ backgroundColor: '#959FF8', color: '#fff', width: '100%', borderRadius:'10px', boxSizing:'border-box' }}
      >
        Start Timer
      </button>
      </tr>
      </table>
      </form>
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
                <button onClick={handlePrevious}>Previous</button>
              </li>
              <li>
                <button onClick={handleNext}>Next</button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
};

export default Component3;
