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
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const defaultLabels = [300, 400, 500, 600, 700, 800];
const defaultData = [0.2, 0.35, 0.5, 0.65, 0.8, 0.95];

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

const AnnealingTemperatureVsCrystallinityIndexChart: React.FC = () => {
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
        label: 'Crystallinity Index',
        data: values,
        borderColor: 'rgb(153, 102, 255)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
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
          placeholder="Crystallinity Index"
          value={newY}
          onChange={e => setNewY(e.target.value)}
          className="border rounded px-2 py-1"
        />
        <button type="submit" className="bg-green-500 text-white px-3 py-1 rounded">Add Point</button>
      </form>
    </div>
  );
};

export default AnnealingTemperatureVsCrystallinityIndexChart;
