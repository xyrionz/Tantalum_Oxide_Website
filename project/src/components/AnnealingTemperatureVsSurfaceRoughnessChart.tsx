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
  BarElement,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement);


const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Annealing Temperature vs Surface Roughness',
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
        text: 'Roughness Index',
      },
    },
  },
};

interface Props {
  labels: number[];
  data: number[];
}

const AnnealingTemperatureVsSurfaceRoughnessChart: React.FC<Props> = ({ labels, data }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Roughness Index',
        data,
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.3,
      },
    ],
  };
  return (
    <div className="p-4 border rounded-lg bg-white shadow">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default AnnealingTemperatureVsSurfaceRoughnessChart;
