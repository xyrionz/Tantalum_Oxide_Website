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
      text: 'Leakage Current vs Voltage (I–V Curve)',
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Voltage (V)',
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
  labels: number[];
  data: number[];
}

const LeakageCurrentVsVoltageChart: React.FC<Props> = ({ labels, data }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Leakage Current (μA)',
        data,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
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

export default LeakageCurrentVsVoltageChart;
