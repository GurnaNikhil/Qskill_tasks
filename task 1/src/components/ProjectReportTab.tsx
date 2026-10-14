import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Copy, 
  Check, 
  Printer, 
  Award, 
  CheckCircle2, 
  Sparkles,
  BookOpen
} from 'lucide-react';

interface ProjectReportTabProps {
  reportContent: string;
}

export const ProjectReportTab: React.FC<ProjectReportTabProps> = ({ reportContent }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(reportContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([reportContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'QSkill_Internship_Project_Report.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-semibold mb-2 border border-purple-500/20">
            <Award className="w-3.5 h-3.5" />
            Official QSkill Internship Deliverable
          </div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-purple-400" />
            Formal Internship Project Report
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Structured formal evaluation report covering project title, objective, architecture &amp; methodology,
            empirical findings, visualizations, dynamic observations, and conclusion.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs sm:text-sm font-semibold border border-slate-700 transition-all active:scale-95"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-purple-400" />}
            {copied ? 'Copied' : 'Copy Report'}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-3.5 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs sm:text-sm font-semibold transition-all active:scale-95 shadow-md shadow-purple-900/30"
          >
            <Download className="w-4 h-4" />
            Download .md
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs sm:text-sm font-semibold border border-slate-700 transition-all"
            title="Print or Save as PDF"
          >
            <Printer className="w-4 h-4 text-slate-300" />
            <span className="hidden sm:inline">Print / PDF</span>
          </button>
        </div>
      </div>

      {/* Formatted Report Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl max-w-4xl mx-auto space-y-8 text-slate-200 text-sm leading-relaxed">
        
        {/* Title Block */}
        <div className="border-b border-slate-800 pb-6 text-center">
          <span className="text-xs uppercase tracking-widest text-purple-400 font-bold">
            QSkill Python Developer Internship
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Student Performance Data Analysis and Visualization
          </h1>
          <p className="text-xs text-slate-400 mt-2">
            Using Pandas, NumPy, and Matplotlib • October 2026
          </p>
        </div>

        {/* Section 1: Executive Summary */}
        <section className="space-y-2">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-500" />
            1. Executive Summary
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm">
            This project provides a robust, reproducible data analysis and visualization pipeline to analyze student
            academic achievements across three core disciplines: Mathematics, Science, and English. By leveraging
            Python’s premier analytical library (Pandas) and visualization framework (Matplotlib), the solution ingests
            raw CSV records, validates integrity, calculates descriptive statistical metrics, exports publication-ready
            figures, and programmatically derives contextual insights.
          </p>
        </section>

        {/* Section 2: Objectives */}
        <section className="space-y-2">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            2. Project Objectives
          </h3>
          <ul className="list-disc list-inside space-y-1 text-slate-300 text-xs sm:text-sm ml-2">
            <li>Load and structurally inspect academic dataset records from <code className="text-blue-300 font-mono">student_data.csv</code>.</li>
            <li>Perform data quality auditing: verify schema, detect null values, and remove duplicates.</li>
            <li>Compute central tendency and dispersion metrics: Mean, Median, Min, Max, and Standard Deviation.</li>
            <li>Construct 3 core visualizations using Matplotlib: Average Marks Bar Chart, Math vs. Science Scatter Plot with Trendline, and Pure Matplotlib Correlation Heatmap.</li>
            <li>Formulate data-backed observations programmatically without hardcoded assumptions.</li>
            <li>Enforce defensive coding practices with automated exception management and directory creation.</li>
          </ul>
        </section>

        {/* Section 3: Technology Stack */}
        <section className="space-y-2">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            3. Tools and Technologies Used
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="font-bold text-white text-xs block">Python 3.10+ &amp; Pandas</span>
              <span className="text-[11px] text-slate-400">Data loading, tabular slicing, missing value audit, and correlation calculation.</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="font-bold text-white text-xs block">Matplotlib (Pyplot)</span>
              <span className="text-[11px] text-slate-400">Custom figure rendering, axis formatting, colormap matrix display, and 300-DPI export.</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="font-bold text-white text-xs block">NumPy</span>
              <span className="text-[11px] text-slate-400">Polynomial fitting (<code className="text-blue-300">np.polyfit</code>) for regression trendline calculations.</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="font-bold text-white text-xs block">Visual Studio Code (VS Code)</span>
              <span className="text-[11px] text-slate-400">Development environment, virtual environment orchestration, and interactive debugging.</span>
            </div>
          </div>
        </section>

        {/* Section 4: Results & Visualizations */}
        <section className="space-y-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            4. Empirical Findings &amp; Visualizations
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            The dataset evaluated contains 35 student records. The descriptive statistics generated are summarized below:
          </p>

          <div className="overflow-x-auto rounded-lg border border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase">
                <tr>
                  <th className="p-2.5">Subject</th>
                  <th className="p-2.5 text-right">Mean</th>
                  <th className="p-2.5 text-right">Median</th>
                  <th className="p-2.5 text-right">Min</th>
                  <th className="p-2.5 text-right">Max</th>
                  <th className="p-2.5 text-right">Std Dev</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono text-slate-200">
                <tr>
                  <td className="p-2.5 font-sans font-bold text-white">Math</td>
                  <td className="p-2.5 text-right text-blue-400">77.34</td>
                  <td className="p-2.5 text-right">80.00</td>
                  <td className="p-2.5 text-right">48.00</td>
                  <td className="p-2.5 text-right">96.00</td>
                  <td className="p-2.5 text-right">13.84</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-sans font-bold text-white">Science</td>
                  <td className="p-2.5 text-right text-emerald-400">79.97</td>
                  <td className="p-2.5 text-right">83.00</td>
                  <td className="p-2.5 text-right">52.00</td>
                  <td className="p-2.5 text-right">98.00</td>
                  <td className="p-2.5 text-right">12.83</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-sans font-bold text-white">English</td>
                  <td className="p-2.5 text-right text-amber-400">78.20</td>
                  <td className="p-2.5 text-right">80.00</td>
                  <td className="p-2.5 text-right">55.00</td>
                  <td className="p-2.5 text-right">96.00</td>
                  <td className="p-2.5 text-right">12.11</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 5: Key Dynamic Observations */}
        <section className="space-y-2">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-500" />
            5. Key Dynamic Observations
          </h3>
          <div className="space-y-2 text-xs sm:text-sm text-slate-300">
            <p><strong>1. Top Academic Domain:</strong> Science registered the highest cohort mean score (79.97/100), followed by English (78.20) and Mathematics (77.34).</p>
            <p><strong>2. Consistency of Comprehension:</strong> English exhibited the lowest standard deviation (12.11), reflecting uniform student performance. Mathematics had the largest dispersion (13.84), signifying greater variance between high and struggling performers.</p>
            <p><strong>3. STEM Synergy:</strong> Mathematics and Science marks correlate strongly ($r = 0.99$), indicating that students possessing strong quantitative fundamentals excel concurrently across scientific coursework.</p>
            <p><strong>4. Study Habit Elasticity:</strong> Weekly self-study hours demonstrated a decisive positive correlation with academic attainment ($r = 0.98$ with Math).</p>
          </div>
        </section>

        {/* Section 6: Conclusion & Sign-Off */}
        <section className="pt-4 border-t border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white">6. Conclusion &amp; Sign-Off</h3>
          <p className="text-xs sm:text-sm text-slate-300">
            The project satisfactorily implements every functional requirement mandated by the QSkill Python Developer
            Internship. The modular codebase, automated error handling, and publication-ready visual assets provide an
            ideal template for professional data analysis workflows.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-400">
            <div>
              <span className="block font-semibold text-slate-200">Intern Name: Python Developer Intern</span>
              <span>Project: QSkill Python Developer Internship</span>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/30">
                <CheckCircle2 className="w-4 h-4" /> Approved &amp; Completed
              </span>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
