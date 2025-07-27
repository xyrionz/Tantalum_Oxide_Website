import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Ethanol Quantity vs Particle Uniformity',
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Ethanol Volume (mL)',
      },
    },
    y: {
      title: {
        display: true,
        text: 'Particle Uniformity Score',
      },
    },
  },
};

interface Props {
  labels: number[];
  data: number[];
}

const EthanolQuantityVsParticleUniformityChart: React.FC<Props> = ({ labels, data }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Particle Uniformity Score',
        data,
        backgroundColor: 'rgba(255, 206, 86, 0.6)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="p-4 border rounded-lg bg-white shadow">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default EthanolQuantityVsParticleUniformityChart;
