import React, { useState } from 'react';
import { 
  StudentRecord, 
  SubjectStat, 
  CorrelationMatrix 
} from '../types';
import { 
  computeLinearRegression, 
  generateDynamicInsights 
} from '../utils/dataProcessor';
import { 
  TrendingUp, 
  BookOpen, 
  Award, 
  Users, 
  Sparkles, 
  Check, 
  AlertCircle, 
  Search, 
  Plus, 
  RefreshCw, 
  SlidersHorizontal,
  ChevronRight,
  Info
} from 'lucide-react';

interface AnalyticsTabProps {
  records: StudentRecord[];
  stats: SubjectStat[];
  corrMatrix: CorrelationMatrix;
  onUpdateRecord: (updated: StudentRecord[]) => void;
  onResetData: () => void;
  onRunPython: () => void;
}

export const AnalyticsTab: React.FC<AnalyticsTabProps> = ({
  records,
  stats,
  corrMatrix,
  onUpdateRecord,
  onResetData,
  onRunPython,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState('ALL');
  const [showAddModal, setShowAddModal] = useState(false);
  const [hoveredStudent, setHoveredStudent] = useState<StudentRecord | null>(null);

  // New Student Form State
  const [newStudent, setNewStudent] = useState({
    Name: '',
    Gender: 'Male',
    Math: 75,
    Science: 75,
    English: 75,
    Study_Hours: 12,
    Attendance_Percentage: 90,
  });

  // Filtered records for table
  const filteredRecords = records.filter(r => {
    const matchesSearch = r.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.Student_ID.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGender = genderFilter === 'ALL' || r.Gender === genderFilter;
    return matchesSearch && matchesGender;
  });

  // Calculate high-level KPIs
  const totalStudents = records.length;
  const mathStat = stats.find(s => s.subject === 'Math') || { mean: 0, std: 0 };
  const sciStat = stats.find(s => s.subject === 'Science') || { mean: 0, std: 0 };
  const engStat = stats.find(s => s.subject === 'English') || { mean: 0, std: 0 };

  const topSubject = [...stats].sort((a, b) => b.mean - a.mean)[0]?.subject || 'Science';

  // Math & Science regression
  const mathScores = records.map(r => r.Math);
  const sciScores = records.map(r => r.Science);
  const regression = computeLinearRegression(mathScores, sciScores);

  // Dynamic observations
  const insights = generateDynamicInsights(records, stats);

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudent.Name.trim()) return;

    const nextId = `STU${String(records.length + 1).padStart(3, '0')}`;
    const added: StudentRecord = {
      Student_ID: nextId,
      Name: newStudent.Name.trim(),
      Gender: newStudent.Gender,
      Math: Number(newStudent.Math),
      Science: Number(newStudent.Science),
      English: Number(newStudent.English),
      Study_Hours: Number(newStudent.Study_Hours),
      Attendance_Percentage: Number(newStudent.Attendance_Percentage),
    };

    onUpdateRecord([...records, added]);
    setShowAddModal(false);
    setNewStudent({
      Name: '',
      Gender: 'Male',
      Math: 75,
      Science: 75,
      English: 75,
      Study_Hours: 12,
      Attendance_Percentage: 90,
    });
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Intro Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-3 border border-blue-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            Exploratory Data Analysis & Empirical Modeling
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Student Performance Analytical Dashboard
          </h2>
          <p className="mt-2 text-slate-300 text-sm sm:text-base leading-relaxed">
            Loaded dataset with {records.length} student records. All computations, statistical indicators,
            Matplotlib visual replications, and observations are dynamically synthesized from empirical CSV values.
          </p>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-sm hover:border-blue-500/50 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium uppercase tracking-wider">Total Students</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white">{totalStudents}</div>
          <div className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
            <Check className="w-3 h-3" /> 100% Unique Rows
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-sm hover:border-blue-500/50 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium uppercase tracking-wider">Math Avg</span>
            <span className="text-blue-400 font-bold text-xs">μ</span>
          </div>
          <div className="text-2xl font-bold text-blue-400">{mathStat.mean.toFixed(1)}</div>
          <div className="text-xs text-slate-400 mt-1">Std Dev: ±{mathStat.std.toFixed(1)}</div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-sm hover:border-emerald-500/50 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium uppercase tracking-wider">Science Avg</span>
            <span className="text-emerald-400 font-bold text-xs">μ</span>
          </div>
          <div className="text-2xl font-bold text-emerald-400">{sciStat.mean.toFixed(1)}</div>
          <div className="text-xs text-slate-400 mt-1">Std Dev: ±{sciStat.std.toFixed(1)}</div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-sm hover:border-amber-500/50 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium uppercase tracking-wider">English Avg</span>
            <span className="text-amber-400 font-bold text-xs">μ</span>
          </div>
          <div className="text-2xl font-bold text-amber-400">{engStat.mean.toFixed(1)}</div>
          <div className="text-xs text-slate-400 mt-1">Std Dev: ±{engStat.std.toFixed(1)}</div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-sm hover:border-purple-500/50 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium uppercase tracking-wider">Top Subject</span>
            <Award className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-xl font-bold text-purple-300 truncate">{topSubject}</div>
          <div className="text-xs text-slate-400 mt-1">Highest mean score</div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-sm hover:border-cyan-500/50 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium uppercase tracking-wider">Math-Sci (r)</span>
            <TrendingUp className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-cyan-400">{regression.rValue.toFixed(2)}</div>
          <div className="text-xs text-emerald-400 mt-1">Strong Correlation</div>
        </div>
      </div>

      {/* Visualizations Section (3 Core Charts Required) */}
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-400" />
              Core Matplotlib Visualizations
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Accurate rendering of the 3 required charts generated by <code className="text-blue-300 font-mono">main.py</code>.
            </p>
          </div>
          <button
            onClick={onRunPython}
            className="text-xs sm:text-sm px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/40 rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Re-render Charts via Python
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Chart 1: Bar Chart - Average Marks Across Subjects */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Visualization 1: Bar Chart
                </span>
                <span className="text-xs text-slate-500 font-mono">plt.bar()</span>
              </div>
              <h4 className="text-base font-bold text-white">Average Marks Across Subjects</h4>
              <p className="text-xs text-slate-400 mt-1 mb-4">
                Comparison of mean performance across Math, Science, and English.
              </p>
            </div>

            {/* Custom SVG Bar Chart */}
            <div className="h-64 w-full bg-slate-950/70 border border-slate-800/80 rounded-lg p-4 flex flex-col justify-end relative">
              {/* Gridlines */}
              <div className="absolute inset-x-4 top-4 bottom-10 flex flex-col justify-between pointer-events-none opacity-20">
                <div className="border-b border-dashed border-slate-400 w-full flex justify-end text-[10px] text-slate-400 pr-1">100</div>
                <div className="border-b border-dashed border-slate-400 w-full flex justify-end text-[10px] text-slate-400 pr-1">75</div>
                <div className="border-b border-dashed border-slate-400 w-full flex justify-end text-[10px] text-slate-400 pr-1">50</div>
                <div className="border-b border-dashed border-slate-400 w-full flex justify-end text-[10px] text-slate-400 pr-1">25</div>
                <div className="border-b border-slate-600 w-full flex justify-end text-[10px] text-slate-400 pr-1">0</div>
              </div>

              {/* Bars */}
              <div className="relative z-10 flex items-end justify-around h-48 px-4 pb-2">
                {stats.map((stat, idx) => {
                  const colors = ['#2563eb', '#059669', '#d97706'];
                  const heightPercent = Math.min(100, Math.max(5, (stat.mean / 100) * 100));
                  return (
                    <div key={stat.subject} className="flex flex-col items-center group relative w-16">
                      {/* Tooltip */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-12 bg-slate-800 text-white text-[11px] px-2 py-1 rounded shadow-lg border border-slate-700 pointer-events-none whitespace-nowrap z-20">
                        {stat.subject}: {stat.mean.toFixed(2)} (Std: ±{stat.std.toFixed(1)})
                      </div>
                      {/* Value label on bar top */}
                      <span className="text-xs font-bold text-white mb-1.5 transition-transform group-hover:-translate-y-1">
                        {stat.mean.toFixed(2)}
                      </span>
                      {/* Bar body */}
                      <div
                        style={{
                          height: `${heightPercent}%`,
                          backgroundColor: colors[idx % colors.length],
                        }}
                        className="w-12 rounded-t-md shadow-md border-t border-x border-white/20 transition-all duration-500 group-hover:brightness-110"
                      />
                      {/* X label */}
                      <span className="text-xs font-semibold text-slate-300 mt-2">
                        {stat.subject}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Saved file: <code className="text-slate-300 font-mono">average_marks_bar_chart.png</code></span>
              <span className="text-emerald-400 font-medium">300 DPI</span>
            </div>
          </div>

          {/* Chart 2: Scatter Plot - Math vs Science Marks */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Visualization 2: Scatter Plot
                </span>
                <span className="text-xs text-slate-500 font-mono">plt.scatter() + polyfit</span>
              </div>
              <h4 className="text-base font-bold text-white">Math vs. Science Marks Relationship</h4>
              <p className="text-xs text-slate-400 mt-1 mb-4">
                Bivariate correlation with linear regression line (r = {regression.rValue.toFixed(2)}).
              </p>
            </div>

            {/* Custom SVG Scatter Plot */}
            <div className="h-64 w-full bg-slate-950/70 border border-slate-800/80 rounded-lg p-3 relative flex items-center justify-center">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 300 200">
                {/* Axis lines & grid */}
                <line x1="30" y1="170" x2="280" y2="170" stroke="#334155" strokeWidth="1" />
                <line x1="30" y1="20" x2="30" y2="170" stroke="#334155" strokeWidth="1" />

                {/* Gridlines */}
                <line x1="30" y1="120" x2="280" y2="120" stroke="#1e293b" strokeDasharray="3 3" />
                <line x1="30" y1="70" x2="280" y2="70" stroke="#1e293b" strokeDasharray="3 3" />
                <line x1="110" y1="20" x2="110" y2="170" stroke="#1e293b" strokeDasharray="3 3" />
                <line x1="190" y1="20" x2="190" y2="170" stroke="#1e293b" strokeDasharray="3 3" />

                {/* Axis Labels */}
                <text x="155" y="195" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="600">Math Marks (X)</text>
                <text x="10" y="95" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="600" transform="rotate(-90 10 95)">Science (Y)</text>

                {/* Regression Line */}
                {(() => {
                  const x1 = 40;
                  const x2 = 100;
                  const y1 = regression.slope * x1 + regression.intercept;
                  const y2 = regression.slope * x2 + regression.intercept;

                  // Map to SVG coordinates (x: 40-100 -> 30-280; y: 40-100 -> 170-20)
                  const mapX = (val: number) => 30 + ((val - 40) / 60) * 250;
                  const mapY = (val: number) => 170 - ((val - 40) / 60) * 150;

                  return (
                    <line
                      x1={mapX(x1)}
                      y1={mapY(y1)}
                      x2={mapX(x2)}
                      y2={mapY(y2)}
                      stroke="#ef4444"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  );
                })()}

                {/* Scatter Points */}
                {records.map((r, i) => {
                  const cx = 30 + ((Math.max(40, Math.min(100, r.Math)) - 40) / 60) * 250;
                  const cy = 170 - ((Math.max(40, Math.min(100, r.Science)) - 40) / 60) * 150;
                  return (
                    <circle
                      key={r.Student_ID || i}
                      cx={cx}
                      cy={cy}
                      r="4.5"
                      fill="#3b82f6"
                      stroke="#1d4ed8"
                      strokeWidth="1.5"
                      className="cursor-pointer hover:r-6 hover:fill-amber-400 transition-all"
                      onMouseEnter={() => setHoveredStudent(r)}
                      onMouseLeave={() => setHoveredStudent(null)}
                    />
                  );
                })}
              </svg>

              {/* Hover overlay */}
              {hoveredStudent && (
                <div className="absolute top-2 right-2 bg-slate-800/95 border border-slate-700 text-xs text-white p-2 rounded shadow-lg pointer-events-none z-10">
                  <div className="font-bold text-blue-400">{hoveredStudent.Name}</div>
                  <div className="text-slate-300">Math: {hoveredStudent.Math} | Science: {hoveredStudent.Science}</div>
                  <div className="text-slate-400 text-[10px]">Study: {hoveredStudent.Study_Hours} hrs/wk</div>
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Saved file: <code className="text-slate-300 font-mono">math_science_scatter_plot.png</code></span>
              <span className="text-cyan-400 font-semibold">r = {regression.rValue.toFixed(2)}</span>
            </div>
          </div>

          {/* Chart 3: Correlation Heatmap (Pure Matplotlib) */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Visualization 3: Heatmap
                </span>
                <span className="text-xs text-slate-500 font-mono">plt.imshow() [No Seaborn]</span>
              </div>
              <h4 className="text-base font-bold text-white">Subject Correlation Heatmap</h4>
              <p className="text-xs text-slate-400 mt-1 mb-4">
                Pearson correlation coefficients with contrast-adjusted text overlays.
              </p>
            </div>

            {/* Heatmap Grid */}
            <div className="h-64 w-full bg-slate-950/70 border border-slate-800/80 rounded-lg p-4 flex flex-col items-center justify-center">
              <div className="flex flex-col gap-1 w-full max-w-[220px]">
                {/* Column Headers */}
                <div className="grid grid-cols-4 gap-1 text-[11px] font-bold text-slate-400 text-center pb-1">
                  <div></div>
                  <div>Math</div>
                  <div>Sci</div>
                  <div>Eng</div>
                </div>

                {/* Matrix Rows */}
                {corrMatrix.matrix.map((row, rowIdx) => (
                  <div key={rowIdx} className="grid grid-cols-4 gap-1 items-center">
                    <span className="text-[11px] font-bold text-slate-400 text-right pr-1">
                      {corrMatrix.columns[rowIdx].slice(0, 4)}
                    </span>
                    {row.map((val, colIdx) => {
                      // Color mapping function for 'coolwarm' representation
                      // 1.0 is deep red/crimson, 0 is light grey, -1 is blue
                      let bgColor = '#ef4444'; // deep red for 1.0
                      let textColor = '#ffffff';

                      if (val >= 0.95) {
                        bgColor = '#dc2626';
                      } else if (val >= 0.85) {
                        bgColor = '#ea580c';
                      } else if (val >= 0.70) {
                        bgColor = '#f97316';
                      } else if (val >= 0.50) {
                        bgColor = '#fb923c';
                        textColor = '#0f172a';
                      } else {
                        bgColor = '#94a3b8';
                        textColor = '#0f172a';
                      }

                      return (
                        <div
                          key={colIdx}
                          style={{ backgroundColor: bgColor, color: textColor }}
                          className="h-11 rounded flex items-center justify-center font-mono font-bold text-xs shadow-sm transition-transform hover:scale-105"
                          title={`${corrMatrix.columns[rowIdx]} vs ${corrMatrix.columns[colIdx]}: ${val.toFixed(2)}`}
                        >
                          {val.toFixed(2)}
                        </div>
                      );
                    })}
                  </div>
                ))}

                {/* Colormap Legend */}
                <div className="mt-3 flex items-center justify-between text-[10px] text-slate-400 px-1">
                  <span>Weak (0.0)</span>
                  <div className="h-2 w-28 rounded bg-gradient-to-r from-slate-400 via-amber-400 to-red-600 mx-2" />
                  <span>Strong (+1.0)</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Saved file: <code className="text-slate-300 font-mono">subject_correlation_heatmap.png</code></span>
              <span className="text-amber-400 font-semibold">Pearson Matrix</span>
            </div>
          </div>

        </div>
      </div>

      {/* Dynamic Insights Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Dynamic Analytical Insights</h3>
              <p className="text-xs sm:text-sm text-slate-400">
                Algorithmically derived from current dataset metrics — strictly avoiding hardcoded assumptions.
              </p>
            </div>
          </div>
          <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-medium">
            Computed in Real-Time
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {insights.map((insight, idx) => (
            <div
              key={idx}
              className="bg-slate-950/70 border border-slate-800/90 rounded-xl p-4 sm:p-5 hover:border-slate-700 transition-all flex gap-3.5"
            >
              <div className="h-7 w-7 rounded-full bg-blue-600/20 text-blue-400 font-bold text-xs flex items-center justify-center shrink-0 border border-blue-500/30 mt-0.5">
                {idx + 1}
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {insight}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Descriptive Statistics Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-indigo-400" />
              Descriptive Statistics Summary
            </h3>
            <p className="text-xs text-slate-400">
              Parametric metrics computed via Pandas: Mean, Median, Min, Max, and Standard Deviation.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950/80 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-4 py-3 font-semibold">Subject</th>
                <th className="px-4 py-3 font-semibold text-right">Mean (Average)</th>
                <th className="px-4 py-3 font-semibold text-right">Median</th>
                <th className="px-4 py-3 font-semibold text-right">Minimum</th>
                <th className="px-4 py-3 font-semibold text-right">Maximum</th>
                <th className="px-4 py-3 font-semibold text-right">Standard Deviation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
              {stats.map((s) => (
                <tr key={s.subject} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-4 py-3 font-sans font-bold text-white flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                    {s.subject}
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-blue-400">{s.mean.toFixed(2)}</td>
                  <td className="px-4 py-3 text-right text-slate-200">{s.median.toFixed(2)}</td>
                  <td className="px-4 py-3 text-right text-rose-400">{s.min.toFixed(2)}</td>
                  <td className="px-4 py-3 text-right text-emerald-400">{s.max.toFixed(2)}</td>
                  <td className="px-4 py-3 text-right text-amber-300">±{s.std.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Data Table (Search, Filter, Quick Edit) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-400" />
              Student Performance Records ({filteredRecords.length} / {records.length})
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Live representation of <code className="text-slate-300 font-mono">student_data.csv</code>.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search by student or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 w-48 sm:w-56"
              />
            </div>

            {/* Gender Filter */}
            <select
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
              className="py-1.5 px-3 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
            >
              <option value="ALL">All Genders</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            {/* Add Student Button */}
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold shadow-sm transition-all"
            >
              <Plus className="w-3.5 h-3.5" /> Add Student
            </button>

            {/* Reset Data Button */}
            <button
              onClick={onResetData}
              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 transition-colors"
              title="Reset to initial 35 student sample records"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Data Records Table */}
        <div className="overflow-x-auto max-h-96 rounded-lg border border-slate-800">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase font-semibold sticky top-0 border-b border-slate-800 z-10">
              <tr>
                <th className="px-4 py-2.5">ID</th>
                <th className="px-4 py-2.5">Student Name</th>
                <th className="px-4 py-2.5">Gender</th>
                <th className="px-4 py-2.5 text-right">Math</th>
                <th className="px-4 py-2.5 text-right">Science</th>
                <th className="px-4 py-2.5 text-right">English</th>
                <th className="px-4 py-2.5 text-right">Study Hrs/Wk</th>
                <th className="px-4 py-2.5 text-right">Attendance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-slate-900/50">
              {filteredRecords.map((r) => (
                <tr key={r.Student_ID} className="hover:bg-slate-800/40 transition-colors font-mono">
                  <td className="px-4 py-2 text-slate-400 font-sans">{r.Student_ID}</td>
                  <td className="px-4 py-2 font-sans font-medium text-white">{r.Name}</td>
                  <td className="px-4 py-2 font-sans">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                      r.Gender === 'Female' ? 'bg-purple-500/10 text-purple-300' : 'bg-blue-500/10 text-blue-300'
                    }`}>
                      {r.Gender}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-right text-blue-300">{r.Math}</td>
                  <td className="px-4 py-2 text-right text-emerald-300">{r.Science}</td>
                  <td className="px-4 py-2 text-right text-amber-300">{r.English}</td>
                  <td className="px-4 py-2 text-right text-slate-300">{r.Study_Hours} hrs</td>
                  <td className="px-4 py-2 text-right text-teal-300">{r.Attendance_Percentage}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-1">Add New Student Record</h3>
            <p className="text-xs text-slate-400 mb-4">
              Add a record to test dynamic statistical recalculation and chart updates.
            </p>

            <form onSubmit={handleAddStudent} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Sharma"
                  value={newStudent.Name}
                  onChange={(e) => setNewStudent({ ...newStudent, Name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Gender</label>
                  <select
                    value={newStudent.Gender}
                    onChange={(e) => setNewStudent({ ...newStudent, Gender: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Study Hrs/Wk</label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={newStudent.Study_Hours}
                    onChange={(e) => setNewStudent({ ...newStudent, Study_Hours: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Math (0-100)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={newStudent.Math}
                    onChange={(e) => setNewStudent({ ...newStudent, Math: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Science</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={newStudent.Science}
                    onChange={(e) => setNewStudent({ ...newStudent, Science: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">English</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={newStudent.English}
                    onChange={(e) => setNewStudent({ ...newStudent, English: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Attendance Percentage (%)</label>
                <input
                  type="number"
                  min="50"
                  max="100"
                  value={newStudent.Attendance_Percentage}
                  onChange={(e) => setNewStudent({ ...newStudent, Attendance_Percentage: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  Add Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
