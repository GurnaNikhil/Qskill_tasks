import React, { useState } from 'react';
import { 
  MonitorPlay, 
  Terminal, 
  Check, 
  Copy, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  FolderCheck, 
  HelpCircle,
  Laptop,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export const VSCodeGuideTab: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const steps = [
    {
      num: 1,
      title: 'Verify Python Installation on Windows',
      desc: 'Check that Python 3.8+ and pip are properly added to your Windows PATH environment variable.',
      cmd: 'python --version\npip --version',
      note: 'If not recognized, download Python from python.org and ensure "Add Python to PATH" is checked during installation.'
    },
    {
      num: 2,
      title: 'Open Project Folder in VS Code',
      desc: 'Launch Visual Studio Code and open the directory containing student_data.csv and main.py.',
      cmd: '# In Windows PowerShell or Command Prompt:\ncd C:\\Projects\\StudentPerformanceAnalysis\ncode .',
      note: 'Alternatively, in VS Code click "File" > "Open Folder..." and pick your project root folder.'
    },
    {
      num: 3,
      title: 'Open Integrated Terminal & Create Virtual Environment',
      desc: 'Isolate project dependencies to avoid conflicts with other system packages.',
      cmd: 'python -m venv venv',
      note: 'This generates a local venv folder with its own isolated Python binary and pip repository.'
    },
    {
      num: 4,
      title: 'Activate the Virtual Environment (Windows)',
      desc: 'Activate the venv inside PowerShell or Command Prompt in the VS Code terminal.',
      cmd: '# For PowerShell:\n.\\venv\\Scripts\\Activate.ps1\n\n# For Command Prompt (cmd):\nvenv\\Scripts\\activate.bat',
      note: 'If you see an ExecutionPolicy error in PowerShell, run: Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass'
    },
    {
      num: 5,
      title: 'Install Required Packages from requirements.txt',
      desc: 'Install Pandas, Matplotlib, and NumPy in one command.',
      cmd: 'pip install -r requirements.txt',
      note: 'This installs pandas>=2.0.0, matplotlib>=3.7.0, and numpy>=1.24.0 into your virtual environment.'
    },
    {
      num: 6,
      title: 'Execute the Main Analysis Script',
      desc: 'Run the complete automated EDA and visualization pipeline.',
      cmd: 'python main.py',
      note: 'The script will validate the CSV, compute all 5 statistics, generate dynamic insights, and populate outputs/.'
    },
    {
      num: 7,
      title: 'Verify Outputs Folder and Assets',
      desc: 'Check that all 3 publication-ready PNG charts were created.',
      cmd: '# In PowerShell:\nGet-ChildItem outputs\n\n# In Command Prompt:\ndir outputs',
      note: 'You will find average_marks_bar_chart.png, math_science_scatter_plot.png, and subject_correlation_heatmap.png.'
    }
  ];

  const troubleshooting = [
    {
      error: "FileNotFoundError: [Errno 2] No such file or directory: 'student_data.csv'",
      cause: "You executed python main.py from a parent or different directory than where the CSV lives.",
      solution: "In the terminal, run 'pwd' or 'cd' to ensure you are in the directory containing both main.py and student_data.csv before running."
    },
    {
      error: "Script Execution Disabled: 'Activate.ps1 cannot be loaded because running scripts is disabled'",
      cause: "Windows PowerShell default security restriction prohibits unsigned scripts.",
      solution: "Run this command in PowerShell: Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass, then re-run .\\venv\\Scripts\\Activate.ps1."
    },
    {
      error: "ModuleNotFoundError: No module named 'pandas' or 'matplotlib'",
      cause: "Packages were installed globally or your virtual environment is not currently active.",
      solution: "Verify that (venv) appears in your terminal prompt, then run pip install -r requirements.txt again."
    },
    {
      error: "Heatmap shows blank or missing annotations",
      cause: "Cell text coordinates transposed or improper color contrast.",
      solution: "Our implementation uses ax.text(j, i, ...) matching [row, col] coordinates and automatically flips text color between white and black."
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold mb-2 border border-blue-500/20">
            <Laptop className="w-3.5 h-3.5" />
            Windows &amp; VS Code Mentor Guide
          </div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <MonitorPlay className="w-6 h-6 text-blue-400" />
            Local Development &amp; Setup Walkthrough
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Complete, beginner-friendly instructions to clone, configure, install, and execute the project on
            Windows using Visual Studio Code and virtual environments.
          </p>
        </div>
      </div>

      {/* Step-by-Step Instructions Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Terminal className="w-5 h-5 text-emerald-400" />
          Step-by-Step Execution Sequence
        </h3>

        <div className="space-y-4">
          {steps.map((step, idx) => (
            <div
              key={step.num}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-md hover:border-slate-700 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-sm">
                    {step.num}
                  </div>
                  <h4 className="text-base font-bold text-white">{step.title}</h4>
                </div>
                <button
                  onClick={() => handleCopy(step.cmd, idx)}
                  className="flex items-center gap-1 text-xs text-slate-400 hover:text-white bg-slate-800 px-2.5 py-1 rounded transition-colors self-start sm:self-auto"
                >
                  {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedIndex === idx ? 'Copied' : 'Copy Commands'}</span>
                </button>
              </div>

              <p className="text-xs text-slate-300 mb-3 ml-10">
                {step.desc}
              </p>

              {/* Code block */}
              <div className="ml-10 bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto whitespace-pre">
                {step.cmd}
              </div>

              <div className="ml-10 mt-2 flex items-start gap-1.5 text-[11px] text-slate-400">
                <Sparkles className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                <span><strong className="text-slate-300">Tip:</strong> {step.note}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Troubleshooting Cheatsheet */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
          Common Errors &amp; Rapid Fix Cheatsheet
        </h3>
        <p className="text-xs text-slate-400">
          Frequently encountered roadblocks when running Python data analysis projects in Windows VS Code and how to resolve them.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {troubleshooting.map((item, i) => (
            <div key={i} className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="text-xs font-mono font-bold text-rose-400 bg-rose-500/10 p-2 rounded border border-rose-500/20">
                {item.error}
              </div>
              <div className="text-xs text-slate-300">
                <span className="font-semibold text-slate-400">Root Cause: </span>
                {item.cause}
              </div>
              <div className="text-xs text-emerald-400 bg-emerald-500/10 p-2 rounded border border-emerald-500/20">
                <span className="font-semibold text-emerald-300">Solution: </span>
                {item.solution}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
