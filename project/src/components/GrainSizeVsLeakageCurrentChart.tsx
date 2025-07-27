import React, { useState } from 'react';
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

const defaultPoints = [
  { x: 10, y: 0.1 },
  { x: 20, y: 0.3 },
  { x: 30, y: 0.6 },
  { x: 40, y: 1.0 },
  { x: 50, y: 1.5 },
  { x: 60, y: 2.0 },
  { x: 70, y: 2.7 },
];

const options = {
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Grain Size vs Leakage Current',
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Grain Size (nm)',
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

const GrainSizeVsLeakageCurrentChart: React.FC = () => {
  const [points, setPoints] = useState<{ x: number; y: number }[]>(defaultPoints);
  const [newX, setNewX] = useState('');
  const [newY, setNewY] = useState('');

  const handleAddPoint = (e: React.FormEvent) => {
    e.preventDefault();
    const x = parseFloat(newX);
    const y = parseFloat(newY);
    if (!isNaN(x) && !isNaN(y)) {
      setPoints([...points, { x, y }]);
      setNewX('');
      setNewY('');
    }
  };

  const data = {
    datasets: [
      {
        label: 'Leakage Current (μA)',
        data: points,
        backgroundColor: 'rgb(255, 159, 64)',
      },
    ],
  };

  return (
    <div className="p-4 border rounded-lg bg-white shadow">
      <Scatter data={data} options={options} />
      <form className="mt-4 flex gap-2" onSubmit={handleAddPoint}>
        <input
          type="number"
          step="any"
          placeholder="Grain Size (nm)"
          value={newX}
          onChange={e => setNewX(e.target.value)}
          className="border rounded px-2 py-1"
        />
        <input
          type="number"
          step="any"
          placeholder="Leakage Current (μA)"
          value={newY}
          onChange={e => setNewY(e.target.value)}
          className="border rounded px-2 py-1"
        />
        <button type="submit" className="bg-green-500 text-white px-3 py-1 rounded">Add Point</button>
      </form>
    </div>
  );
};

export default GrainSizeVsLeakageCurrentChart;
