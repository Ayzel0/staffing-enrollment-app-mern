import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import '../styles/LineChart.css';
import { useRef, useCallback } from 'react';
import logoSource from '../assets/email_logo.png';

ChartJS.register(
  CategoryScale, 
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ data, options }) => {
  if (Object.keys(data).length === 0) {
    return <div className='no-data-container'>
      
    </div>
  }

  const labels = Object.keys(data);

  const enrollmentData = labels.map((year, index) => {
    if(index === 0) return 0;
    const baseYearEnrollment = data[labels[0]].enrollment;
    const currentYearEnrollment = data[year].enrollment;
    const percentChange = ((currentYearEnrollment - baseYearEnrollment) / baseYearEnrollment)*100;
    return percentChange;
  });
  const FTEData = labels.map((year, index) => {
    if(index === 0) return 0;
    const baseYearFTE = data[labels[0]].FTE;
    const currentYearFTE = data[year].FTE;
    const percentChange = ((currentYearFTE - baseYearFTE) / baseYearFTE) * 100;
    return percentChange;
  });

  // stuff for the download button
  const chartRef = useRef(null);
  const downloadImage = useCallback(() => {
    const link = document.createElement("a");
    link.download = 'staffing_enrollment_chart.png';
    link.href = chartRef.current.toBase64Image();
    link.click();
  }, [])

  const backgroundColor = {
    id: 'backgroundColor',
    beforeDraw: (chart, args, options) => {
      const {ctx} = chart;
      ctx.save();
      ctx.globalCompositeOperation = 'destination-over';
      ctx.fillStyle = options.color || '#ffffff';
      ctx.fillRect(0, 0, chart.width, chart.height);
      ctx.restore();
    }
  }

  const logo = new Image();
  logo.src = logoSource;
  const logoImage = {
    id: 'logoImage',
    beforeDraw(chart, args, options) {
      const { ctx, chartArea: { top, bottom, left, right } } = chart;
      const logoHeight = 30;
      const logoWidth = 100;
      const x_margin = 10;
      const y_margin = 35;
      ctx.save();
      ctx.globalAlpha = 0.5;
      if(logo.complete) {
        ctx.drawImage(logo, ctx.canvas.offsetWidth - logoWidth - x_margin, 
          0 + y_margin, logoWidth, logoHeight);
      } else {
        logo.onload = () => chart.draw();
      }
      ctx.restore();
    }
  }

  return (
    <div className='line-chart'>
      <Line 
        ref = {chartRef}
        options = {options}
        plugins = {[backgroundColor, logoImage]}
        data = {{
          labels,
          datasets: [
            {
              label: 'Total Students % Change',
              data: enrollmentData,
              fill: false,
              borderColor: 'blue',
              backgroundColor: 'blue',
            },
            {
              label: 'Total Staffing % Change',
              data: FTEData,
              fill: false,
              borderColor: 'red',
              backgroundColor: 'red',
            }
          ]
        }}
      />
      <button onClick={downloadImage} className='copy-button'>Download Image</button>
    </div>
  )
}

export default LineChart;