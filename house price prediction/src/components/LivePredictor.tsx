import React, { useState } from 'react';
import { Home, Sparkles, RotateCcw, Calculator, ArrowRight, IndianRupee, DollarSign, CheckCircle2, AlertCircle, Layers } from 'lucide-react';
import { HouseInput, predictHousePrice, MODEL_METRICS, USD_TO_INR_RATE, convertUSDToINR } from '../data/houseDataset';

export const LivePredictor: React.FC = () => {
  const defaultInput: HouseInput = {
    bedrooms: 3,
    bathrooms: 2.5,
    sqft_living: 2150,
    sqft_lot: 7500,
    floors: 2.0,
    waterfront: 0,
    view: 0,
    condition: 3,
    grade: 8,
    yr_built: 1998,
    zipcode: 98052
  };

  const [input, setInput] = useState<HouseInput>(defaultInput);
  const [activeInput, setActiveInput] = useState<HouseInput>(defaultInput);
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [pendingChanges, setPendingChanges] = useState<boolean>(false);
  const [justUpdated, setJustUpdated] = useState<boolean>(false);

  // Active prediction results evaluated strictly on "Check Result" click
  const [activeResult, setActiveResult] = useState(() => predictHousePrice(defaultInput));

  const handleInputChange = (updatedFields: Partial<HouseInput>) => {
    setInput(prev => ({ ...prev, ...updatedFields }));
    setPendingChanges(true);
  };

  const resetDefaults = () => {
    setInput(defaultInput);
    setActiveInput(defaultInput);
    setActiveResult(predictHousePrice(defaultInput));
    setPendingChanges(false);
    setJustUpdated(true);
    setTimeout(() => setJustUpdated(false), 1500);
  };

  const handleCheckResult = () => {
    setIsCalculating(true);
    // Explicitly compute using the exact current inputs
    const updatedPrediction = predictHousePrice(input);
    setActiveResult(updatedPrediction);
    setActiveInput({ ...input });
    setPendingChanges(false);
    setJustUpdated(true);

    setTimeout(() => {
      setIsCalculating(false);
    }, 200);

    setTimeout(() => {
      setJustUpdated(false);
    }, 2500);
  };

  // Conversions for active results
  const inrResult = convertUSDToINR(activeResult.predictedPrice);
  const rmseINR = convertUSDToINR(MODEL_METRICS.rmse);
  const maeINR = convertUSDToINR(MODEL_METRICS.mae);

  // Price per sqft based on active calculated input
  const pricePerSqftUSD = Math.round(activeResult.predictedPrice / activeInput.sqft_living);
  const pricePerSqftINR = Math.round(inrResult.numericINR / activeInput.sqft_living);

  // Confidence interval
  const lowerUSD = Math.max(100000, Math.round(activeResult.predictedPrice - MODEL_METRICS.rmse));
  const upperUSD = Math.round(activeResult.predictedPrice + MODEL_METRICS.rmse);
  const lowerINR = convertUSDToINR(lowerUSD);
  const upperINR = convertUSDToINR(upperUSD);

  return (
    <div className="space-y-6">
      {/* Console Evaluation Header Output */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-6 shadow-md text-slate-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-4">
          <div>
            <div className="text-xs uppercase tracking-wider text-blue-400 font-semibold mb-1">
              Model Evaluation & Console Output
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white font-mono tracking-tight">
              HOUSE PRICE PREDICTION SYSTEM
            </h2>
            <p className="text-xs text-slate-400">Ordinary Least Squares (OLS) Multiple Linear Regression</p>
          </div>

          {/* Currency Switcher */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
            <span className="text-[11px] text-slate-400 px-2 font-medium">Currency:</span>
            <button
              onClick={() => setCurrency('INR')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-md font-semibold transition-all ${
                currency === 'INR'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <IndianRupee className="w-3.5 h-3.5" />
              <span>INR (₹)</span>
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-md font-semibold transition-all ${
                currency === 'USD'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5" />
              <span>USD ($)</span>
            </button>
          </div>
        </div>

        {/* Evaluation Metrics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-sm">
          <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/50">
            <div className="text-xs text-slate-400 font-sans">Mean Absolute Error (MAE)</div>
            <div className="text-base sm:text-lg font-bold text-cyan-400">
              {currency === 'INR' ? maeINR.wordsINR : `$${MODEL_METRICS.mae.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`}
            </div>
            <div className="text-[10px] text-slate-400 font-sans">
              {currency === 'INR' ? `(${maeINR.formattedINR})` : `INR: ${maeINR.wordsINR}`}
            </div>
          </div>

          <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/50">
            <div className="text-xs text-slate-400 font-sans">Mean Squared Error (MSE)</div>
            <div className="text-base sm:text-lg font-bold text-indigo-400 truncate" title={MODEL_METRICS.mse.toLocaleString()}>
              {MODEL_METRICS.mse.toLocaleString()}
            </div>
            <div className="text-[10px] text-slate-400 font-sans">Penalizes large residuals</div>
          </div>

          <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/50">
            <div className="text-xs text-slate-400 font-sans">Root Mean Squared Error (RMSE)</div>
            <div className="text-base sm:text-lg font-bold text-amber-400">
              {currency === 'INR' ? rmseINR.wordsINR : `$${MODEL_METRICS.rmse.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`}
            </div>
            <div className="text-[10px] text-slate-400 font-sans">
              {currency === 'INR' ? `(${rmseINR.formattedINR})` : `INR: ${rmseINR.wordsINR}`}
            </div>
          </div>

          <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/50">
            <div className="text-xs text-slate-400 font-sans">R² Determination Score</div>
            <div className="text-base sm:text-lg font-bold text-emerald-400">
              {MODEL_METRICS.r2Score.toFixed(4)} ({MODEL_METRICS.r2Percentage}%)
            </div>
            <div className="text-[10px] text-slate-400 font-sans">Variance explained by model</div>
          </div>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Input Parameters Form (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Home className="w-5 h-5 text-blue-400" />
              <div>
                <h3 className="text-white font-bold text-base">Enter Property Attributes</h3>
                <p className="text-[11px] text-slate-400">Adjust sliders below, then click "Check Result"</p>
              </div>
            </div>
            <button
              onClick={resetDefaults}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs border border-slate-700 inline-flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Bedrooms */}
            <div className="space-y-1.5 bg-slate-800/40 p-3 rounded-lg border border-slate-800">
              <div className="flex justify-between text-xs">
                <label className="text-slate-300 font-medium">Bedrooms</label>
                <span className="text-blue-400 font-mono font-bold text-sm">{input.bedrooms} BHK</span>
              </div>
              <input
                type="range"
                min="1"
                max="8"
                step="1"
                value={input.bedrooms}
                onChange={(e) => handleInputChange({ bedrooms: Number(e.target.value) })}
                className="w-full accent-blue-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>1 BHK</span>
                <span>4 BHK</span>
                <span>8 BHK</span>
              </div>
            </div>

            {/* Bathrooms */}
            <div className="space-y-1.5 bg-slate-800/40 p-3 rounded-lg border border-slate-800">
              <div className="flex justify-between text-xs">
                <label className="text-slate-300 font-medium">Bathrooms</label>
                <span className="text-blue-400 font-mono font-bold text-sm">{input.bathrooms} Baths</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="6.0"
                step="0.25"
                value={input.bathrooms}
                onChange={(e) => handleInputChange({ bathrooms: Number(e.target.value) })}
                className="w-full accent-blue-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>1 Bath</span>
                <span>3 Baths</span>
                <span>6 Baths</span>
              </div>
            </div>

            {/* Living Area (sqft) */}
            <div className="space-y-1.5 bg-slate-800/40 p-3 rounded-lg border border-slate-800">
              <div className="flex justify-between text-xs">
                <label className="text-slate-300 font-medium">Living Area (House Size)</label>
                <span className="text-emerald-400 font-mono font-bold text-sm">{input.sqft_living.toLocaleString()} sq ft</span>
              </div>
              <input
                type="range"
                min="500"
                max="6500"
                step="50"
                value={input.sqft_living}
                onChange={(e) => handleInputChange({ sqft_living: Number(e.target.value) })}
                className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>500 sqft</span>
                <span>3,500 sqft</span>
                <span>6,500 sqft</span>
              </div>
            </div>

            {/* Lot Size (sqft) */}
            <div className="space-y-1.5 bg-slate-800/40 p-3 rounded-lg border border-slate-800">
              <div className="flex justify-between text-xs">
                <label className="text-slate-300 font-medium">Plot / Lot Area</label>
                <span className="text-slate-200 font-mono font-bold text-sm">{input.sqft_lot.toLocaleString()} sq ft</span>
              </div>
              <input
                type="range"
                min="1000"
                max="30000"
                step="500"
                value={input.sqft_lot}
                onChange={(e) => handleInputChange({ sqft_lot: Number(e.target.value) })}
                className="w-full accent-slate-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>1,000</span>
                <span>15,000</span>
                <span>30,000 sqft</span>
              </div>
            </div>

            {/* Floors */}
            <div className="space-y-1.5 bg-slate-800/40 p-3 rounded-lg border border-slate-800">
              <div className="flex justify-between text-xs">
                <label className="text-slate-300 font-medium">Number of Floors</label>
                <span className="text-blue-400 font-mono font-bold">{input.floors} Floors</span>
              </div>
              <select
                value={input.floors}
                onChange={(e) => handleInputChange({ floors: Number(e.target.value) })}
                className="w-full bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-lg px-3 py-2 outline-none focus:border-blue-500 font-medium"
              >
                <option value="1.0">1.0 Floor (Ground / Bungalow)</option>
                <option value="1.5">1.5 Floors (1 Floor + Attic / Mezzanine)</option>
                <option value="2.0">2.0 Floors (Duplex / Double Storey)</option>
                <option value="2.5">2.5 Floors</option>
                <option value="3.0">3.0 Floors (Triplex / 3-Storey)</option>
              </select>
            </div>

            {/* Construction Grade */}
            <div className="space-y-1.5 bg-slate-800/40 p-3 rounded-lg border border-slate-800">
              <div className="flex justify-between text-xs">
                <label className="text-slate-300 font-medium">Build Quality & Grade (1-13)</label>
                <span className="text-amber-400 font-mono font-bold">Grade {input.grade}/13</span>
              </div>
              <select
                value={input.grade}
                onChange={(e) => handleInputChange({ grade: Number(e.target.value) })}
                className="w-full bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-lg px-3 py-2 outline-none focus:border-blue-500 font-medium"
              >
                <option value="5">Grade 5 - Low Economy Construction</option>
                <option value="6">Grade 6 - Below Average Construction</option>
                <option value="7">Grade 7 - Standard Average Quality</option>
                <option value="8">Grade 8 - Very Good Design & Quality</option>
                <option value="9">Grade 9 - Superior Premium Finishes</option>
                <option value="10">Grade 10 - High-End Custom Luxury</option>
                <option value="11">Grade 11 - Ultra-Luxury Mansion</option>
                <option value="12">Grade 12 - Elite Architectural Palace</option>
              </select>
            </div>

            {/* Condition */}
            <div className="space-y-1.5 bg-slate-800/40 p-3 rounded-lg border border-slate-800">
              <div className="flex justify-between text-xs">
                <label className="text-slate-300 font-medium">Maintenance Condition (1-5)</label>
                <span className="text-blue-400 font-mono font-bold">{input.condition} / 5</span>
              </div>
              <div className="grid grid-cols-5 gap-1.5">
                {[1, 2, 3, 4, 5].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => handleInputChange({ condition: lvl })}
                    className={`py-1.5 text-xs font-semibold rounded border transition-colors ${
                      input.condition === lvl
                        ? 'bg-blue-600 border-blue-500 text-white shadow-sm'
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Scenic View */}
            <div className="space-y-1.5 bg-slate-800/40 p-3 rounded-lg border border-slate-800">
              <div className="flex justify-between text-xs">
                <label className="text-slate-300 font-medium">Scenic View Score (0-4)</label>
                <span className="text-blue-400 font-mono font-bold">{input.view} / 4</span>
              </div>
              <div className="grid grid-cols-5 gap-1.5">
                {[0, 1, 2, 3, 4].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => handleInputChange({ view: v })}
                    className={`py-1.5 text-xs font-semibold rounded border transition-colors ${
                      input.view === v
                        ? 'bg-blue-600 border-blue-500 text-white shadow-sm'
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Year Built */}
            <div className="space-y-1.5 bg-slate-800/40 p-3 rounded-lg border border-slate-800">
              <div className="flex justify-between text-xs">
                <label className="text-slate-300 font-medium">Year Built (Age)</label>
                <span className="text-slate-200 font-mono font-bold">{input.yr_built}</span>
              </div>
              <input
                type="number"
                min="1900"
                max="2025"
                value={input.yr_built}
                onChange={(e) => handleInputChange({ yr_built: Number(e.target.value) || 1990 })}
                className="w-full bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-lg px-3 py-2 outline-none focus:border-blue-500 font-mono font-medium"
              />
            </div>

            {/* Location / Zipcode */}
            <div className="space-y-1.5 bg-slate-800/40 p-3 rounded-lg border border-slate-800">
              <div className="flex justify-between text-xs">
                <label className="text-slate-300 font-medium">Neighborhood / Postal Zone</label>
                <span className="text-blue-400 font-mono font-bold">{input.zipcode}</span>
              </div>
              <select
                value={input.zipcode}
                onChange={(e) => handleInputChange({ zipcode: Number(e.target.value) })}
                className="w-full bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-lg px-3 py-2 outline-none focus:border-blue-500 font-medium"
              >
                <option value="98052">98052 - Redmond Tech Hub (Microsoft Area)</option>
                <option value="98004">98004 - Bellevue Prime Downtown</option>
                <option value="98040">98040 - Mercer Island Waterfront</option>
                <option value="98039">98039 - Medina Elite Enclave</option>
                <option value="98103">98103 - Green Lake / Urban Seattle</option>
                <option value="98115">98115 - Northeast Seattle Residential</option>
                <option value="98117">98117 - Ballard Seattle</option>
                <option value="98178">98178 - South Seattle Affordable</option>
                <option value="98028">98028 - Kenmore / Lake View</option>
                <option value="98003">98003 - Federal Way Suburb</option>
              </select>
            </div>
          </div>

          {/* Waterfront Checkbox */}
          <div className="pt-2">
            <label className="flex items-center gap-3 p-3.5 bg-slate-800/60 hover:bg-slate-800 rounded-lg border border-slate-700/60 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={input.waterfront === 1}
                onChange={(e) => handleInputChange({ waterfront: e.target.checked ? 1 : 0 })}
                className="w-4 h-4 text-blue-600 rounded bg-slate-700 border-slate-600 focus:ring-blue-500"
              />
              <div className="flex-1">
                <div className="text-xs font-semibold text-slate-200 flex items-center justify-between">
                  <span>Waterfront Adjacency (Puget Sound / Lake Frontage)</span>
                  {input.waterfront === 1 ? (
                    <span className="text-[11px] bg-blue-500/20 text-cyan-300 px-2 py-0.5 rounded font-mono font-bold">
                      + Waterfront Added
                    </span>
                  ) : (
                    <span className="text-[11px] text-slate-500 font-mono">No waterfront</span>
                  )}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Binary feature indicating direct waterfront access (waterfront = 1 in Kaggle dataset)
                </div>
              </div>
            </label>
          </div>

          {/* ACTION BUTTON: Check Prediction Result */}
          <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs">
              {pendingChanges ? (
                <span className="text-amber-400 flex items-center gap-1.5 font-semibold">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
                  Attributes modified! Click button to compute new price.
                </span>
              ) : (
                <span className="text-emerald-400 flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Results updated for current attributes.
                </span>
              )}
            </div>

            <button
              onClick={handleCheckResult}
              disabled={isCalculating}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm shadow-xl transition-all transform active:scale-95 cursor-pointer ${
                pendingChanges
                  ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white shadow-emerald-500/30 animate-pulse'
                  : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-blue-500/25'
              }`}
            >
              <Calculator className={`w-5 h-5 ${isCalculating ? 'animate-spin' : ''}`} />
              <span className="text-base">
                {isCalculating ? 'Calculating Price...' : 'Check Result'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Prediction Results & Feature Breakdown (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Main Price Card */}
          <div className={`bg-gradient-to-b from-slate-900 to-slate-950 rounded-xl p-5 shadow-xl relative overflow-hidden transition-all duration-300 border ${
            justUpdated
              ? 'border-emerald-400 ring-2 ring-emerald-500/40 scale-[1.01]'
              : pendingChanges
              ? 'border-amber-500/60'
              : 'border-blue-500/40'
          }`}>
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex items-center justify-between">
              <div className="text-xs text-blue-400 font-semibold tracking-wider uppercase flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Prediction Result</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-emerald-400 border border-emerald-500/30">
                1 USD = ₹{USD_TO_INR_RATE}
              </span>
            </div>

            {/* Display in Indian Rupees (₹) by default or selected currency */}
            <div className="my-3">
              <div className="text-xs text-slate-400 font-medium mb-1">
                {currency === 'INR' ? 'Estimated Market Value in Indian Rupees:' : 'Estimated Market Value in US Dollars:'}
              </div>

              {currency === 'INR' ? (
                <div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono">
                    {inrResult.wordsINR}
                  </div>
                  <div className="text-base font-mono text-emerald-400 font-bold mt-1">
                    {inrResult.formattedINR}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    Dataset USD Reference: <span className="font-mono text-slate-300 font-semibold">{inrResult.usdFormatted}</span>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono">
                    {inrResult.usdFormatted}
                  </div>
                  <div className="text-base font-mono text-emerald-400 font-bold mt-1">
                    Indian Rupee (INR): {inrResult.wordsINR} ({inrResult.formattedINR})
                  </div>
                </div>
              )}
            </div>

            {/* Calculation Status Notification */}
            <div className="py-2 px-3 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs">
              <div className="flex items-center justify-between font-mono text-[11px] text-slate-300">
                <span>Calculated For:</span>
                <span className="text-cyan-300 font-semibold">
                  {activeInput.bedrooms} BHK • {activeInput.bathrooms} Baths • {activeInput.sqft_living.toLocaleString()} sqft
                </span>
              </div>
              <div className="flex items-center justify-between font-mono text-[10px] text-slate-400 mt-1">
                <span>Quality & Location:</span>
                <span>Grade {activeInput.grade} • Zip {activeInput.zipcode}</span>
              </div>
            </div>

            {/* Property Key Metrics in Rupees / USD */}
            <div className="mt-4 pt-3 border-t border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Rate per Sq Ft:</span>
                <span className="text-white font-mono font-semibold">
                  {currency === 'INR' ? `₹${pricePerSqftINR.toLocaleString('en-IN')} / sq ft` : `$${pricePerSqftUSD.toLocaleString()} / sq ft`}
                </span>
              </div>

              <div className="flex justify-between text-slate-400">
                <span>Confidence Range (±RMSE):</span>
                <span className="text-slate-200 font-mono font-medium">
                  {currency === 'INR' ? `${lowerINR.wordsINR} – ${upperINR.wordsINR}` : `$${lowerUSD.toLocaleString()} – $${upperUSD.toLocaleString()}`}
                </span>
              </div>
            </div>
          </div>

          {/* Feature Decomposition Breakdown in Rupees / USD */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 mb-2.5">
              <h4 className="text-xs uppercase font-bold text-slate-300 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-blue-400" />
                <span>Feature Contribution Breakdown</span>
              </h4>
              <span className="text-[10px] text-slate-500 font-mono">
                {currency === 'INR' ? 'INR (₹)' : 'USD ($)'}
              </span>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1 text-xs font-mono">
              {activeResult.breakdown.map((item, idx) => {
                const converted = convertUSDToINR(item.amount);
                const isPositive = item.amount >= 0;

                return (
                  <div key={idx} className="flex items-center justify-between py-1 border-b border-slate-800/60 last:border-0">
                    <span className="text-slate-400 truncate max-w-[210px] font-sans text-[11px]" title={item.label}>
                      {item.label}
                    </span>
                    <span
                      className={`font-semibold text-xs ${
                        item.impact === 'positive'
                          ? 'text-emerald-400'
                          : item.impact === 'negative'
                          ? 'text-rose-400'
                          : 'text-slate-400'
                      }`}
                    >
                      {currency === 'INR'
                        ? (isPositive ? `+${converted.formattedINR}` : `-${converted.formattedINR}`)
                        : (isPositive ? `+$${Math.round(item.amount).toLocaleString()}` : `-$${Math.round(Math.abs(item.amount)).toLocaleString()}`)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
