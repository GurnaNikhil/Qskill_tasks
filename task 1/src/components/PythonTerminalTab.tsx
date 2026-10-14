import React, { useState } from 'react';
import { 
  Terminal as TerminalIcon, 
  Play, 
  Trash2, 
  CheckCircle2, 
  AlertTriangle, 
  Copy, 
  Check, 
  ArrowRight,
  FolderOpen
} from 'lucide-react';

interface PythonTerminalTabProps {
  onRunPython: () => void;
  isRunning: boolean;
  terminalOutput: string;
  onClearOutput: () => void;
}

export const PythonTerminalTab: React.FC<PythonTerminalTabProps> = ({
  onRunPython,
  isRunning,
  terminalOutput,
  onClearOutput,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(terminalOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold mb-2 border border-emerald-500/20">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Python 3.10+ Execution Environment
          </div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <TerminalIcon className="w-6 h-6 text-blue-400" />
            Live Python Analysis Console
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Trigger <code className="text-blue-300 font-mono">python3 main.py</code> directly. The script performs
            automated data validation, descriptive statistics, Matplotlib chart generation to <code className="text-emerald-300 font-mono">outputs/</code>,
            and dynamic insight calculation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onRunPython}
            disabled={isRunning}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg transition-all ${
              isRunning
                ? 'bg-amber-600 text-white opacity-80 cursor-wait'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-900/30 active:scale-95'
            }`}
          >
            <Play className={`w-4 h-4 ${isRunning ? 'animate-spin' : 'fill-current'}`} />
            {isRunning ? 'Executing main.py...' : 'Run python main.py'}
          </button>
        </div>
      </div>

      {/* Terminal Window */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden font-mono text-xs sm:text-sm">
        {/* Terminal Title Bar */}
        <div className="bg-slate-900/90 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <span className="text-slate-400 text-xs font-semibold ml-2 flex items-center gap-1.5">
              <FolderOpen className="w-3.5 h-3.5 text-slate-500" />
              bash ~ python3 main.py (VS Code Integrated Terminal)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
              title="Copy terminal output"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Output'}</span>
            </button>
            <button
              onClick={onClearOutput}
              className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-rose-400 transition-colors"
              title="Clear terminal"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Terminal Output Body */}
        <div className="p-5 overflow-x-auto min-h-[420px] max-h-[600px] text-slate-300 leading-relaxed font-mono whitespace-pre-wrap selection:bg-blue-500 selection:text-white">
          {terminalOutput ? (
            terminalOutput.split('\n').map((line, idx) => {
              let lineClass = 'text-slate-300';
              if (line.includes('[SUCCESS]') || line.includes('[VERIFIED]')) {
                lineClass = 'text-emerald-400 font-semibold';
              } else if (line.includes('[SAVED]')) {
                lineClass = 'text-cyan-400 font-semibold';
              } else if (line.includes('[ERROR]')) {
                lineClass = 'text-rose-400 font-bold';
              } else if (line.includes('[WARN]') || line.includes('[ACTION]')) {
                lineClass = 'text-amber-400 font-semibold';
              } else if (line.includes('===') || line.includes('STEP')) {
                lineClass = 'text-blue-400 font-bold';
              } else if (line.startsWith('1.') || line.startsWith('2.') || line.startsWith('3.') || line.startsWith('4.') || line.startsWith('5.')) {
                lineClass = 'text-indigo-200 font-medium pl-2';
              }
              return (
                <div key={idx} className={`${lineClass} hover:bg-slate-900/40 px-1 py-0.5 rounded transition-colors`}>
                  {line}
                </div>
              );
            })
          ) : (
            <div className="text-slate-500 italic py-12 text-center">
              Terminal ready. Click &quot;Run python main.py&quot; above to execute the analysis pipeline.
            </div>
          )}
        </div>

        {/* Terminal Status Bar */}
        <div className="bg-slate-900 px-4 py-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Environment Ready
            </span>
            <span>OS: Linux / Windows PowerShell compatible</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Encoding: UTF-8</span>
            <span>Target: main.py</span>
          </div>
        </div>
      </div>

      {/* Helpful Quick Tip Card */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex items-start gap-3 text-xs text-slate-400">
        <ArrowRight className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-slate-200">How this works under the hood:</span> When invoked, the server executes <code className="text-blue-300 font-mono">python3 main.py</code> in the root directory. Pandas loads <code className="text-slate-300 font-mono">student_data.csv</code>, computes all five statistical metrics, constructs the three Matplotlib figures, saves them to <code className="text-slate-300 font-mono">outputs/</code>, and derives non-hardcoded conclusions.
        </div>
      </div>
    </div>
  );
};
