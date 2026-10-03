import React, { useState } from 'react';
import { Terminal, Copy, Check, CheckCircle2, AlertTriangle, Monitor, Play, FileCode } from 'lucide-react';

export const WindowsSetupGuide: React.FC = () => {
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  const copyCommand = (cmd: string, stepIdx: number) => {
    navigator.clipboard.writeText(cmd);
    setCopiedStep(stepIdx);
    setTimeout(() => setCopiedStep(null), 1800);
  };

  const steps = [
    {
      title: 'Option A: Double-Click Standalone HTML (Easiest)',
      desc: 'Just double-click "double_click_to_open.html" in your project folder. Opens instantly in Chrome/Edge without installing anything!',
      cmd: 'start double_click_to_open.html'
    },
    {
      title: 'Option B: Run One-Click Windows Batch File',
      desc: 'Double-click "run_project.bat" in your folder. Automatically activates Python, installs requirements, and runs the ML model!',
      cmd: 'run_project.bat'
    },
    {
      title: 'Option C1: Run Python ML in VS Code',
      desc: 'Open VS Code terminal and run Python directly with all metrics, evaluations, and terminal prompts.',
      cmd: 'pip install -r requirements.txt\npython house_price_prediction.py'
    },
    {
      title: 'Option C2: Run Web Studio in VS Code',
      desc: 'Vite React apps cannot run via file:/// directly on index.html. In VS Code terminal, start the local server with one command:',
      cmd: 'npm install\nnpm run dev'
    }
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Monitor className="w-5 h-5 text-blue-400" />
          <div>
            <h3 className="text-white font-bold text-base">How to Run in VS Code or Windows Folder</h3>
            <p className="text-xs text-slate-400">Choose the method that fits your preferred workflow</p>
          </div>
        </div>

        <div className="px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-1.5">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Why did index.html appear blank on double-click?</span>
        </div>
      </div>

      {/* Explanation Banner */}
      <div className="bg-slate-800/60 p-3.5 rounded-lg border border-slate-700/60 text-xs text-slate-300 space-y-1.5">
        <div className="font-semibold text-white flex items-center gap-1.5">
          <FileCode className="w-4 h-4 text-cyan-400" />
          <span>Why modern React/Vite index.html requires a server vs. standalone:</span>
        </div>
        <p className="text-[11px] leading-relaxed text-slate-300">
          Modern web apps use TypeScript (<code className="text-cyan-300 font-mono">/src/main.tsx</code>). Web browsers block TypeScript imports when opened directly through Windows Explorer (<code className="text-amber-300 font-mono">file:///index.html</code>) due to security policies.
        </p>
        <p className="text-[11px] leading-relaxed text-emerald-300 font-medium">
          ✅ <strong>Solution:</strong> We included <code className="text-white font-mono bg-slate-900 px-1.5 py-0.5 rounded">double_click_to_open.html</code> in your folder which works <strong>instantly by double-clicking</strong> without any server! Or run <code className="text-white font-mono bg-slate-900 px-1.5 py-0.5 rounded">npm run dev</code> in VS Code.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {steps.map((s, idx) => (
          <div key={idx} className="bg-slate-800/60 p-3.5 rounded-lg border border-slate-700/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">{s.title}</span>
              <span className="text-[10px] font-mono text-slate-400">0{idx + 1}</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">{s.desc}</p>
            {s.cmd && (
              <div className="flex items-center justify-between bg-slate-950 p-2 rounded border border-slate-800 font-mono text-[11px] text-blue-300">
                <span className="truncate mr-2">{s.cmd.split('\n')[0]}</span>
                <button
                  onClick={() => copyCommand(s.cmd, idx)}
                  className="p-1 hover:text-white text-slate-400 transition-colors"
                  title="Copy command"
                >
                  {copiedStep === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
