import React, { useState } from 'react';
import LeakageCurrentVsVoltageChart from './LeakageCurrentVsVoltageChart';
import ThicknessVsLeakageCurrentChart from './ThicknessVsLeakageCurrentChart';
import AnnealingTemperatureVsSurfaceRoughnessChart from './AnnealingTemperatureVsSurfaceRoughnessChart';
import EthanolQuantityVsParticleUniformityChart from './EthanolQuantityVsParticleUniformityChart';
import AnnealingTemperatureVsCrystallinityIndexChart from './AnnealingTemperatureVsCrystallinityIndexChart';
import GrainSizeVsLeakageCurrentChart from './GrainSizeVsLeakageCurrentChart';

import axios from 'axios';

async function generateGraphData(params: any) {
  const prompt = `Respond ONLY with valid JSON for the following chart data, no explanation or extra text.\nGiven these experiment parameters:\n- Annealing Temperature: ${params.temperature} °C\n- Film Thickness: ${params.thickness} nm\n- Stirring Duration: ${params.stirringDuration} min\n- Ethanol Amount: ${params.ethanolAmount} mL\n- Coating Substance Amount: ${params.coatingAmount} mg\n\nPredict the data for the following graphs as JSON:\n{\n  "leakageCurrentVsVoltage": { "labels": [...], "data": [...] },\n  "thicknessVsLeakageCurrent": { "points": [{ "x": ..., "y": ... }, ...] },\n  "annealingTemperatureVsSurfaceRoughness": { "labels": [...], "data": [...] },\n  "ethanolQuantityVsParticleUniformity": { "labels": [...], "data": [...] },\n  "annealingTemperatureVsCrystallinityIndex": { "labels": [...], "data": [...] },\n  "grainSizeVsLeakageCurrent": { "points": [{ "x": ..., "y": ... }, ...] }\n}`;

  const response = await axios.post(
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCoqwrMd54QYXHOuQqd5FcYTYovvksSjeg',
    {
      contents: [{ parts: [{ text: prompt }] }]
    }
  );

  const text = response.data.candidates[0].content.parts[0].text;
  const jsonMatch = text.match(/{[\s\S]*}/);
  if (jsonMatch) {
    try {
      return { parsed: JSON.parse(jsonMatch[0]), raw: text };
    } catch (e) {
      return { parsed: null, raw: text };
    }
  }
  return { parsed: null, raw: text };
}


const ResultsChartsAI: React.FC = () => {
  const [params, setParams] = useState({
    temperature: '',
    thickness: '',
    stirringDuration: '',
    ethanolAmount: '',
    coatingAmount: '',
  });
  const [graphData, setGraphData] = useState<any>(null);
  const [rawResponse, setRawResponse] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParams({ ...params, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setRawResponse('');
    try {
      const result = await generateGraphData(params);
      setRawResponse(result.raw);
      if (result.parsed) {
        setGraphData(result.parsed);
      } else {
        setGraphData(null);
        setError('AI failed to generate valid JSON. See raw response below.');
      }
    } catch (err) {
      setError('AI request failed.');
      setGraphData(null);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-white rounded shadow" onSubmit={handleSubmit}>
        <input name="temperature" type="number" step="any" placeholder="Annealing Temperature (°C)" value={params.temperature} onChange={handleChange} className="border rounded px-2 py-1" />
        <input name="thickness" type="number" step="any" placeholder="Film Thickness (nm)" value={params.thickness} onChange={handleChange} className="border rounded px-2 py-1" />
        <input name="stirringDuration" type="number" step="any" placeholder="Stirring Duration (min)" value={params.stirringDuration} onChange={handleChange} className="border rounded px-2 py-1" />
        <input name="ethanolAmount" type="number" step="any" placeholder="Ethanol Amount (mL)" value={params.ethanolAmount} onChange={handleChange} className="border rounded px-2 py-1" />
        <input name="coatingAmount" type="number" step="any" placeholder="Coating Substance Amount (mg)" value={params.coatingAmount} onChange={handleChange} className="border rounded px-2 py-1" />
        <button type="submit" className="bg-green-500 text-white px-3 py-1 rounded col-span-1 md:col-span-2" disabled={loading}>{loading ? 'Generating...' : 'Generate Graphs'}</button>
      </form>
      {error && <div className="text-red-500 font-semibold mb-4">{error}</div>}
      {rawResponse && (
        <div className="bg-gray-100 p-4 rounded mb-4">
          <div className="font-bold mb-2">Raw Gemini Response:</div>
          <pre className="text-xs whitespace-pre-wrap">{rawResponse}</pre>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {graphData && (
          <>
            <LeakageCurrentVsVoltageChart labels={graphData.leakageCurrentVsVoltage.labels} data={graphData.leakageCurrentVsVoltage.data} />
            <ThicknessVsLeakageCurrentChart points={graphData.thicknessVsLeakageCurrent.points} />
            <AnnealingTemperatureVsSurfaceRoughnessChart labels={graphData.annealingTemperatureVsSurfaceRoughness.labels} data={graphData.annealingTemperatureVsSurfaceRoughness.data} />
            <EthanolQuantityVsParticleUniformityChart labels={graphData.ethanolQuantityVsParticleUniformity.labels} data={graphData.ethanolQuantityVsParticleUniformity.data} />
            <AnnealingTemperatureVsCrystallinityIndexChart labels={graphData.annealingTemperatureVsCrystallinityIndex.labels} data={graphData.annealingTemperatureVsCrystallinityIndex.data} />
            <GrainSizeVsLeakageCurrentChart points={graphData.grainSizeVsLeakageCurrent.points} />
          </>
        )}
      </div>
    </div>
  );
};

export default ResultsChartsAI;
