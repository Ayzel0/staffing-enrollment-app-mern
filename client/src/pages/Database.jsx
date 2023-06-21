import DistrictSelector from '../components/DistrictSelector'
import Chart from 'chart.js/auto';
import LineChart from '../components/LineChart';
import { CategoryScale } from 'chart.js';
import { useState, useMemo } from 'react';
import '../styles/Database.css';

Chart.register(CategoryScale);

const Database = () => {
  const [districtData, setDistrictData] = useState({});
  const [districtName, setDistrictName] = useState(null);

  // handler for clicking a district
  const handleDistrictSelect = (districtObj) => {
    const name = districtObj.name;
    setDistrictName(name);

    const newDistrictObj = {...districtObj};
    delete newDistrictObj.name;
    setDistrictData(newDistrictObj);
  }

  // update component state so that buttons re-render
  const resetDistrictSelect = () => {
    setDistrictData({});
  }

  // chart stuff starts here
  const options = useMemo(() => {
    return {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            usePointStyle: true,
            pointStyle: 'circle',
            color: 'black',
            font: {
              size: 12,
            }
          }
        },
        title: {
          display: true,
          text: districtName + ': Staffing vs. Enrollment Trends (Cumulative % change since ' + (Object.keys(districtData).length > 0 ? Object.keys(districtData)[0] : 'START_YEAR') + ')',
          color: 'black',
          font: {
            size: 16,
          }
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const labelIndex = context.dataIndex;
              const datasetIndex = context.datasetIndex;
              const keys = Object.keys(districtData ?? {});
              const key = keys[labelIndex]

              if (datasetIndex === 1) {
                return 'Total Staffing: ' + districtData[key].FTE;
              }
              return 'Total Enrollment: ' + districtData[key].enrollment;
            }
          }
        }
      },
      scales: {
        x: {    
          title: {   
            display: true,
            text: 'Year',
            color: 'black',
          },
          ticks: {
            display: true,
            color: 'black',
          }
        },
        y: {    
          title: {
            display: true,
            text: 'Cumulative % change since ' + (Object.keys(districtData).length > 0 ? Object.keys(districtData)[0] : 'START_YEAR'),
            color: 'black',
          },
          ticks: {
            display: true,
            color: 'black',
          }
        }
      }
    }
  }, [districtData]);

  const buttonPanelStyle = districtData && Object.keys(districtData).length 
    ? { width: '30vw', height: '90vh', overflowY: 'scroll' }
    : { width: '100vw' };

  const graphPanelStyle = districtData && Object.keys(districtData).length 
    ? { width: '70vw' }
    : { width: '0vw' };

  return (
    <div className='database'>
      <div className='button-panel' style={buttonPanelStyle}>
        <DistrictSelector onDistrictSelect={handleDistrictSelect} />
      </div>
      <div className='database-graph-panel' style={graphPanelStyle}>
        <LineChart data={districtData} options={options} />
      </div>
    </div>
  )
}

export default Database;

/*
<h1>{districtName}</h1>
            {Object.entries(districtData).map(([key, value], index) => {
              return(
                <div key={key}>
                  <p>Enrollment: {value.enrollment}</p>
                  <p>FTE: {value.FTE}</p>
                </div>
              )
            })}
            <button onClick={resetDistrictSelect}>Go Back</button>
            */