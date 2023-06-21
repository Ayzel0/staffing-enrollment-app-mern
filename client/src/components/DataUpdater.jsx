import { useState, useEffect } from "react";
import '../styles/DataUpdater.css';

const DataUpdater = ({ onSubmit }) => {
  const years = Array.from({length: 10}, (_, i) => {
    return `${2013+i}-${2014+i}`;
  });
  
  const initialState = years.reduce((obj, year) => ({ ...obj, [year]: { enrollment: '', FTE: '' } }), {});

  const [values, setValues] = useState(initialState);
  const [name, setName] = useState('');

  const handleChange = (year, field, event) => {
    const updatedValues = {...values};
    updatedValues[year][field] = event.target.value;
    setValues(updatedValues);
  }

  const handleNameChange = (name) => {
    setName(name);
  }

  useEffect(() => {
    const yearsWithData = Object.keys(values).filter(year => values[year].enrollment !== '' && values[year].FTE !== '');
    
    let updatedTitle = '';
    let updatedYLabel = '';
    let valuesWithData = {};
  
    if(yearsWithData.length > 0) {
      valuesWithData = yearsWithData.reduce((acc, year) => ({...acc, [year]: values[year]}), {});
      updatedTitle = name +  `: Staffing vs Enrollment Trends (Cumulative % change since ${yearsWithData[0]})`;
      updatedYLabel = `Cumulative % change since ${yearsWithData[0]}`;
    }
  
    onSubmit({updatedTitle, updatedYLabel, data: valuesWithData});
  }, [name, values]);

  const handleClear = () => {
    setValues(initialState);
  }

  const handlePaste = (year, field, event) => {
    event.preventDefault();
    const pasteData = event.clipboardData.getData('text');
    const pastedValues = pasteData.split(/\s/)
      .map(val => val.replace(/,/g, ''))
      .filter(val => !isNaN(val) && val.trim() !== '')
      .slice(0, 10);
    
    if (pastedValues.length > 1) {
      const startYearIndex = years.indexOf(year);
      let updatedValues = { ...values };
  
      for (let i = 0; i < pastedValues.length; i++) {
        const currentYearIndex = startYearIndex + i;
        if (currentYearIndex < years.length) {
          updatedValues[years[currentYearIndex]][field] = pastedValues[i];
        }
      }
  
      setValues(updatedValues);
    } else {
      handleChange(year, field, event);
    }
  }

  return (
    <div className='data-updater'>
      <form className="data-updater-form" onSubmit={(e) => e.preventDefault()}>
        <div className='district-form-group'>
          <input 
            type="text" 
            className="district_input" 
            id="name" 
            placeholder="Enter District Name"
            value={name}
            onChange={e => handleNameChange(e.target.value)} 
          />
        </div>
        <table className='form-table'>
          <thead>
            <tr>
              <th>Year</th>
              <th>Total <br />Student <br />Enrollment</th>
              <th>Total <br />Staffing</th>
            </tr>
          </thead>
          <tbody>
          {years.map(year => (
            <tr key={year}>
              <td><label className='form-year-label'>{year}</label></td>
              <td><input
                type='number'
                placeholder='Enrollment'
                value={values[year].enrollment}
                onChange={e => handleChange(year, 'enrollment', e)}
                onPaste={e => handlePaste(year, 'enrollment', e)}
                className='form-input'
              /></td>
              <td><input
                type='number'
                placeholder='FTE'
                value={values[year].FTE}
                onChange={e => handleChange(year, 'FTE', e)}
                onPaste={e => handlePaste(year, 'FTE', e)}
                className='form-input'
              /></td>
            </tr>
          ))}
          </tbody>
        </table>
        <div className='form-buttons'>
          <button type="button" onClick={() => handleClear()}>Clear Data</button>
        </div>
      </form>
    </div>
  )
}

export default DataUpdater
