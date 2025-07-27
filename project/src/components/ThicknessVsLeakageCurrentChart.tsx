import React from 'react';
import { Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);


const options = {
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Thickness vs Leakage Current',
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Coating Thickness (nm)',
      },
    },
    y: {
      title: {
        display: true,
        text: 'Leakage Current (μA)',
      },
    },
  },
};

interface Props {
  points: { x: number; y: number }[];
}

const ThicknessVsLeakageCurrentChart: React.FC<Props> = ({ points }) => {
  const data = {
    datasets: [
      {
        label: 'Leakage Current (μA)',
        data: points,
        backgroundColor: 'rgb(255, 99, 132)',
      },
    ],
  };
  return (
    <div className="p-4 border rounded-lg bg-white shadow">
      <Scatter data={data} options={options} />
    </div>
  );
};

export default ThicknessVsLeakageCurrentChart;
