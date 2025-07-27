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

const defaultLabels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const defaultData = [0, 0.2, 0.5, 1.0, 1.8, 2.5, 3.1, 3.8, 4.2, 4.5, 5.0];

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

const LeakageCurrentVsVoltageChart: React.FC = () => {
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
        label: 'Leakage Current (μA)',
        data: values,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
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
          placeholder="Voltage (V)"
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

export default LeakageCurrentVsVoltageChart;
