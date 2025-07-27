import React from 'react';

interface DataPoint {
  x: number;
  y: number;
}

interface RetroGraphProps {
  data: DataPoint[];
  xLabel: string;
  yLabel: string;
  color?: string;
}

const RetroGraph: React.FC<RetroGraphProps> = ({ 
  data, 
  xLabel, 
  yLabel, 
  color = '#22c55e' 
}) => {
  const width = 300;
  const height = 160;
  const margin = { top: 20, right: 20, bottom: 40, left: 50 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Calculate scales
  const xMin = Math.min(...data.map(d => d.x));
  const xMax = Math.max(...data.map(d => d.x));
  const yMin = Math.min(...data.map(d => d.y));
  const yMax = Math.max(...data.map(d => d.y));

  const xScale = (x: number) => ((x - xMin) / (xMax - xMin)) * innerWidth;
  const yScale = (y: number) => innerHeight - ((y - yMin) / (yMax - yMin)) * innerHeight;

  // Create path string
  const pathData = data.map((point, index) => {
    const x = xScale(point.x);
    const y = yScale(point.y);
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg width={width} height={height} className="text-green-400">
        {/* Grid lines */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke={color} strokeWidth="0.5" opacity="0.3"/>
          </pattern>
        </defs>
        
        <rect 
          x={margin.left} 
          y={margin.top} 
          width={innerWidth} 
          height={innerHeight} 
          fill="url(#grid)" 
        />
        
        {/* Axes */}
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {/* X-axis */}
          <line
            x1={0}
            y1={innerHeight}
            x2={innerWidth}
            y2={innerHeight}
            stroke={color}
            strokeWidth="2"
          />
          
          {/* Y-axis */}
          <line
            x1={0}
            y1={0}
            x2={0}
            y2={innerHeight}
            stroke={color}
            strokeWidth="2"
          />
          
          {/* Data line */}
          <path
            d={pathData}
            fill="none"
            stroke={color}
            strokeWidth="2"
            className="animate-pulse"
          />
          
          {/* Data points */}
          {data.map((point, index) => (
            <circle
              key={index}
              cx={xScale(point.x)}
              cy={yScale(point.y)}
              r="3"
              fill={color}
              className="animate-pulse"
            />
          ))}
        </g>
        
        {/* Labels */}
        <text
          x={width / 2}
          y={height - 5}
          textAnchor="middle"
          className="text-xs fill-current"
        >
          {xLabel}
        </text>
        
        <text
          x={15}
          y={height / 2}
          textAnchor="middle"
          className="text-xs fill-current"
          transform={`rotate(-90, 15, ${height / 2})`}
        >
          {yLabel}
        </text>
      </svg>
    </div>
  );
};

export default RetroGraph;