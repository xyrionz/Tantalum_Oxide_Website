import React from 'react';
import axios from 'axios';
import LeakageCurrentVsVoltageChart from './LeakageCurrentVsVoltageChart';
import ThicknessVsLeakageCurrentChart from './ThicknessVsLeakageCurrentChart';
import AnnealingTemperatureVsSurfaceRoughnessChart from './AnnealingTemperatureVsSurfaceRoughnessChart';
import EthanolQuantityVsParticleUniformityChart from './EthanolQuantityVsParticleUniformityChart';
import AnnealingTemperatureVsCrystallinityIndexChart from './AnnealingTemperatureVsCrystallinityIndexChart';
import GrainSizeVsLeakageCurrentChart from './GrainSizeVsLeakageCurrentChart';

async function generateGraphDataWithGemini(params) {
  const prompt = `Dont explain, just respond with valid JSON for the following chart data.\nGiven these experiment parameters:\n- Annealing Temperature: ${params.temperature} °C\n- Film Thickness: ${params.thickness} nm\n- Stirring Duration: ${params.stirringDuration} min\n- Ethanol Amount: ${params.ethanolAmount} mL\n- Coating Substance Amount: ${params.coatingAmount} mg\n\nPredict the data for the following graphs as JSON:\n{\n  "leakageCurrentVsVoltage": { "labels": [...], "data": [...] },\n  "thicknessVsLeakageCurrent": { "points": [{ "x": ..., "y": ... }, ...] },\n  "annealingTemperatureVsSurfaceRoughness": { "labels": [...], "data": [...] },\n  "ethanolQuantityVsParticleUniformity": { "labels": [...], "data": [...] },\n  "annealingTemperatureVsCrystallinityIndex": { "labels": [...], "data": [...] },\n  "grainSizeVsLeakageCurrent": { "points": [{ "x": ..., "y": ... }, ...] }\n}`;

  const response = await axios.post(
    'https://openrouter.ai/api/v1/chat/completions',
    {
      model: 'mistralai/mistral-small-3.2-24b-instruct:free',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    },
    {
      headers: {
        'Authorization': 'Bearer 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',
        'Content-Type': 'application/json'
      }
    }
  );

  const text = response.data.choices[0].message.content;
  const jsonMatch = text.match(/{[\s\S]*}/);
  if (jsonMatch) {
    return JSON.parse(jsonMatch[0]);
  }
  throw new Error('No valid JSON found in OpenRouter response');
}

const ResultsCharts: React.FC = () => {
  const [params, setParams] = React.useState({
    temperature: '',
    thickness: '',
    stirringDuration: '',
    ethanolAmount: '',
    coatingAmount: '',
  });
  const [graphData, setGraphData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParams({ ...params, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await generateGraphDataWithGemini(params);
      setGraphData(data);
    } catch (err) {
      setError('AI failed to generate graph data.');
    }
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      <form className="bg-white p-6 rounded-lg shadow mb-6 grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
        {/* ...input fields as before... */}
        <div>
          <label className="block font-semibold mb-1">Annealing Temperature (°C)</label>
          <input type="number" name="temperature" value={params.temperature} onChange={handleChange} className="border rounded px-2 py-1 w-full" />
        </div>
        <div>
          <label className="block font-semibold mb-1">Film Thickness (nm)</label>
          <input type="number" name="thickness" value={params.thickness} onChange={handleChange} className="border rounded px-2 py-1 w-full" />
        </div>
        <div>
          <label className="block font-semibold mb-1">Stirring Duration (min)</label>
          <input type="number" name="stirringDuration" value={params.stirringDuration} onChange={handleChange} className="border rounded px-2 py-1 w-full" />
        </div>
        <div>
          <label className="block font-semibold mb-1">Ethanol Amount (mL)</label>
          <input type="number" name="ethanolAmount" value={params.ethanolAmount} onChange={handleChange} className="border rounded px-2 py-1 w-full" />
        </div>
        <div>
          <label className="block font-semibold mb-1">Coating Substance Amount (mg)</label>
          <input type="number" name="coatingAmount" value={params.coatingAmount} onChange={handleChange} className="border rounded px-2 py-1 w-full" />
        </div>
        <div className="flex items-end">
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded" disabled={loading}>
            {loading ? 'Generating...' : 'Generate Graphs'}
          </button>
        </div>
      </form>
      {error && <div className="text-red-500 font-semibold mb-4">{error}</div>}
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

export default ResultsCharts;