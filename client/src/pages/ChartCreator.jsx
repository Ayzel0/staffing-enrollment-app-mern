import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { useState, useMemo } from 'react';
import LineChart from '../components/LineChart';
import DataUpdater from '../components/DataUpdater';

Chart.register(CategoryScale);

const ChartCreator = () => {
  const [chartData, setChartData] = useState({});
  const [title, setTitle] = useState(null);
  const [yLabel, setYLabel] = useState(null);
 
  const handleDataUpdate = ({ updatedTitle, updatedYLabel, data }) => {
    setChartData(data);
    setTitle(updatedTitle);
    setYLabel(updatedYLabel);
  }

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
          text: title,
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
              const keys = Object.keys(chartData ?? {});
              const key = keys[labelIndex]

              if (datasetIndex === 1) {
                return 'Total Staffing: ' + chartData[key].FTE;
              }
              return 'Total Enrollment: ' + chartData[key].enrollment;
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
            text: yLabel,
            color: 'black',
          },
          ticks: {
            display: true,
            color: 'black',
          }
        }
      }
    }
  }, [chartData]);

  const formPanelStyle = chartData && Object.keys(chartData).length
    ? { width: '30vw' }
    : { width: '100vw' };

  const graphPanelStyle = chartData && Object.keys(chartData).length 
    ? { width: '70vw' }
    : { width: '0vw' };

  return (
    <div className='panel-aligner'>
      <div className="panel-wrapper">
        <div className='form-panel' style={formPanelStyle}>
          <DataUpdater onSubmit = {handleDataUpdate}/>
        </div>
        <div className='graph-panel' style={graphPanelStyle}>
          <LineChart data = {chartData} options = {options} />
        </div>
      </div>
    </div>
  )
}

export default ChartCreator;