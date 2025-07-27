import React, { useState } from 'react';
import axios from 'axios';

async function callGeminiApi(params: any) {
  const prompt = `Dont explain, just respond with valid JSON for the following chart data.\nGiven these experiment parameters:\n- Annealing Temperature: ${params.temperature} °C\n- Film Thickness: ${params.thickness} nm\n- Stirring Duration: ${params.stirringDuration} min\n- Ethanol Amount: ${params.ethanolAmount} mL\n- Coating Substance Amount: ${params.coatingAmount} mg\n\nPredict the data for the following graphs as JSON:\n{\n  "leakageCurrentVsVoltage": { "labels": [...], "data": [...] },\n  "thicknessVsLeakageCurrent": { "points": [{ "x": ..., "y": ... }, ...] },\n  "annealingTemperatureVsSurfaceRoughness": { "labels": [...], "data": [...] },\n  "ethanolQuantityVsParticleUniformity": { "labels": [...], "data": [...] },\n  "annealingTemperatureVsCrystallinityIndex": { "labels": [...], "data": [...] },\n  "grainSizeVsLeakageCurrent": { "points": [{ "x": ..., "y": ... }, ...] }\n}`;

  const response = await axios.post(
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCoqwrMd54QYXHOuQqd5FcYTYovvksSjeg',
    {
      contents: [{ parts: [{ text: prompt }] }]
    }
  );

  return response.data.candidates[0].content.parts[0].text;
}

const GeminiApiTest: React.FC = () => {
  const [params, setParams] = useState({
    temperature: '500',
    thickness: '100',
    stirringDuration: '30',
    ethanolAmount: '5',
    coatingAmount: '50',
  });
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParams({ ...params, [e.target.name]: e.target.value });
  };

  const handleRun = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setOutput('');
    try {
      const result = await callGeminiApi(params);
      setOutput(result);
    } catch (err) {
      setError('API call failed.');
    }
    setLoading(false);
  };

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">Gemini API Raw Output Test</h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4" onSubmit={handleRun}>
        <input name="temperature" type="number" placeholder="Annealing Temperature (°C)" value={params.temperature} onChange={handleChange} className="border rounded px-2 py-1" />
        <input name="thickness" type="number" placeholder="Film Thickness (nm)" value={params.thickness} onChange={handleChange} className="border rounded px-2 py-1" />
        <input name="stirringDuration" type="number" placeholder="Stirring Duration (min)" value={params.stirringDuration} onChange={handleChange} className="border rounded px-2 py-1" />
        <input name="ethanolAmount" type="number" placeholder="Ethanol Amount (mL)" value={params.ethanolAmount} onChange={handleChange} className="border rounded px-2 py-1" />
        <input name="coatingAmount" type="number" placeholder="Coating Substance Amount (mg)" value={params.coatingAmount} onChange={handleChange} className="border rounded px-2 py-1" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded col-span-1 md:col-span-2" disabled={loading}>{loading ? 'Running...' : 'Run Gemini API'}</button>
      </form>
      {error && <div className="text-red-500 font-semibold mb-4">{error}</div>}
      {output && (
        <div className="bg-gray-100 p-4 rounded">
          <div className="font-bold mb-2">Raw Gemini Response:</div>
          <pre className="text-xs whitespace-pre-wrap">{output}</pre>
        </div>
      )}
    </div>
  );
};

export default GeminiApiTest;
