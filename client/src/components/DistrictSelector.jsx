import { useState, useEffect } from 'react';
import axios from 'axios';
import LineChart from './LineChart';
import '../styles/DistrictSelector.css';

const DistrictSelector = ({ onDistrictSelect }) => {
  const [districtData, setDistrictData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      axios.get(`https://edunomics-staffing-enrollment.onrender.com/api/search/districts?name=${searchQuery}`)
      // axios.get(`http://localhost:5000/api/search/districts?name=${searchQuery}`)
        .then(response => {
          setDistrictData(response.data);
        })
        .catch(error => {
          console.error('error in retrieving data: ', error);
        });
    }
  };

  const getDistrictData = (id) => {
    const district = districtData.find(district => district._id === id);
    const fteArr = district.fteCounts;
    const enrollArr = district.enrollmentCounts;
    const distName = district.districtName;
    const yearArr = district.years;

    try {
      const districtObj = yearArr.reduce((result, year, index) => {
        let enrollFTECombined = {
          enrollment: enrollArr[index],
          FTE: fteArr[index]
        }
        result[year] = enrollFTECombined;
        return result;
      }, {name: distName});
      return districtObj;
    } catch {
      return {};
    }
  }

  return (
    <div>
      {districtData.length != 0 
      ? (
      <>
        <div className='search-box'>
          <input 
            className='search-input'
            type='text' 
            placeholder='Search for district...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className='district-grid'>
          {districtData && districtData.map(district => {
            const districtObj = getDistrictData(district._id);
            if (Object.keys(districtObj).length > 0) {
              const years = Object.keys(districtObj).slice(1);
              return (
                <button key={district._id} className='district' onClick={() => onDistrictSelect(districtObj)}>
                  <h2>{districtObj.name}</h2>
                  <p>Data from {years[0]} to {years[years.length - 1]}</p>
                </button>
              )
            }
          })}
        </div>
      </>
      )
      : (
        <div className='search-box'>
          <input 
            type='text' 
            placeholder='Search for district...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      )
      }
    </div>
  )
}

export default DistrictSelector;