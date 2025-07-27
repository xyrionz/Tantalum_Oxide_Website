import React from 'react';
import { Line } from 'react-chartjs-2';
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Annealing Temperature vs Crystallinity Index',
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Temperature (°C)',
      },
    },
    y: {
      title: {
        display: true,
        text: 'Crystallinity Index (0 to 1)',
      },
      min: 0,
      max: 1,
    },
  },
};

interface Props {
  labels: number[];
  data: number[];
}

const AnnealingTemperatureVsCrystallinityIndexChart: React.FC<Props> = ({ labels, data }) => {
  return (
    <div className="p-4 border rounded-lg bg-white shadow">
      <Line 
        data={{
          labels,
          datasets: [
            {
              label: 'Crystallinity Index',
              data,
              borderColor: 'rgb(153, 102, 255)',
              backgroundColor: 'rgba(153, 102, 255, 0.2)',
              tension: 0.3,
            },
          ],
        }} 
        options={options} 
      />
    </div>
  );
};

export default AnnealingTemperatureVsCrystallinityIndexChart;
