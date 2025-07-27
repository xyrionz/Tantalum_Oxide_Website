import React, { useState } from 'react';
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

const defaultLabels = [1, 2, 3, 4, 5, 6];
const defaultData = [8, 6, 5, 4, 3, 2];

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

const EthanolQuantityVsParticleUniformityChart: React.FC = () => {
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
        label: 'Particle Uniformity Score',
        data: values,
        backgroundColor: 'rgba(255, 206, 86, 0.6)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-4 border rounded-lg bg-white shadow">
      <Bar data={data} options={options} />
      <form className="mt-4 flex gap-2" onSubmit={handleAddPoint}>
        <input
          type="number"
          step="any"
          placeholder="Ethanol Volume (mL)"
          value={newX}
          onChange={e => setNewX(e.target.value)}
          className="border rounded px-2 py-1"
        />
        <input
          type="number"
          step="any"
          placeholder="Uniformity Score"
          value={newY}
          onChange={e => setNewY(e.target.value)}
          className="border rounded px-2 py-1"
        />
        <button type="submit" className="bg-green-500 text-white px-3 py-1 rounded">Add Point</button>
      </form>
    </div>
  );
};

export default EthanolQuantityVsParticleUniformityChart;
