import React, { useState } from 'react';
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

const defaultLabels = [300, 400, 500, 600, 700, 800];
const defaultData = [5, 4.2, 3.8, 3.2, 2.7, 2.1];

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

const AnnealingTemperatureVsSurfaceRoughnessChart: React.FC = () => {
  const [labels, setLabels] = useState<number[]>(defaultLabels);
  const [values, setValues] = useState<number[]>(defaultData);
  const [newX, setNewX] = useState('');
  const [newY, setNewY] = useState('');

  const handleAddPoint = (e: React.FormEvent) => {
    e.preventDefault();
    const x = parseFloat(newX);
    const y = parseFloat(newY);
    if (!isNaN(x) && !isNaN(y)) {
      setLabels([...labels, x]);
      setValues([...values, y]);
      setNewX('');
      setNewY('');
    }
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'Roughness Index',
        data: values,
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="p-4 border rounded-lg bg-white shadow">
      <Line data={data} options={options} />
      <form className="mt-4 flex gap-2" onSubmit={handleAddPoint}>
        <input
          type="number"
          step="any"
          placeholder="Temperature (°C)"
          value={newX}
          onChange={e => setNewX(e.target.value)}
          className="border rounded px-2 py-1"
        />
        <input
          type="number"
          step="any"
          placeholder="Roughness Index"
          value={newY}
          onChange={e => setNewY(e.target.value)}
          className="border rounded px-2 py-1"
        />
        <button type="submit" className="bg-green-500 text-white px-3 py-1 rounded">Add Point</button>
      </form>
    </div>
  );
};

export default AnnealingTemperatureVsSurfaceRoughnessChart;
