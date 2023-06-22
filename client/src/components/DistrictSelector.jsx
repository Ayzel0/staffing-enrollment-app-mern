import { useState, useEffect } from 'react';
import axios from 'axios';
import LineChart from './LineChart';
import '../styles/DistrictSelector.css';

const DistrictSelector = ({ onDistrictSelect }) => {
  const [districtData, setDistrictData] = useState([]);

  useEffect(() => {
    axios.get('https://edunomics-staffing-enrollment.onrender.com/api/districts')
      .then(response => {
        setDistrictData(response.data);
      })
      .catch(error => {
        console.error('error in retrieving data: ', error);
      })
  }, [])

  const getDistrictData = (id) => {
    const district = districtData.find(district => district._id === id);
    const fteArr = district.fteCounts;
    const enrollArr = district.enrollmentCounts;
    const distName = district.districtName;
    const yearArr = district.years;

    const districtObj = yearArr.reduce((result, year, index) => {
      let enrollFTECombined = {
        enrollment: enrollArr[index],
        FTE: fteArr[index]
      }
      result[year] = enrollFTECombined;
      return result;
    }, {name: distName});
    return districtObj;
  }

  return (
    <div className='district-grid'>
      {districtData && districtData.map(district => {
        const districtObj = getDistrictData(district._id);
        const years = Object.keys(districtObj).slice(1);
        return (
          <button key={district._id} className='district' onClick={() => onDistrictSelect(districtObj)}>
            <h2>{districtObj.name}</h2>
            <p>Data from {years[0]} to {years[years.length - 1]}</p>
          </button>
        )
      })}
    </div>
  )
}

export default DistrictSelector;