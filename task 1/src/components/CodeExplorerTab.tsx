import React, { useState } from 'react';
import { 
  Code2, 
  FileCode, 
  FileSpreadsheet, 
  FileText, 
  Copy, 
  Check, 
  Download, 
  Sparkles, 
  BookOpen, 
  CheckCircle2,
  HelpCircle
} from 'lucide-react';

interface CodeExplorerTabProps {
  files: Record<string, string>;
}

export const CodeExplorerTab: React.FC<CodeExplorerTabProps> = ({ files }) => {
  const [selectedFile, setSelectedFile] = useState('main.py');
  const [copied, setCopied] = useState(false);

  const fileDefinitions = [
    { 
      name: 'main.py', 
      icon: FileCode, 
      badge: 'Python Script', 
      desc: 'Main application logic with Pandas & Matplotlib analysis pipeline.' 
    },
    { 
      name: 'student_data.csv', 
      icon: FileSpreadsheet, 
      badge: 'CSV Dataset', 
      desc: 'Sample academic dataset with Math, Science, English, and study metrics.' 
    },
    { 
      name: 'requirements.txt', 
      icon: FileText, 
      badge: 'Dependencies', 
      desc: 'Required libraries (Pandas, Matplotlib, NumPy).' 
    },
    { 
      name: 'README.md', 
      icon: BookOpen, 
      badge: 'Documentation', 
      desc: 'Full project architecture, setup guide, and instructions.' 
    },
    { 
      name: 'project_report.md', 
      icon: FileText, 
      badge: 'Internship Report', 
      desc: 'Complete formal internship report for QSkill submission.' 
    },
    { 
      name: 'viva_questions.md', 
      icon: HelpCircle, 
      badge: 'Viva Q&A', 
      desc: 'Essential viva and interview technical questions & answers.' 
    },
  ];

  const currentContent = files[selectedFile] || '';
  const lines = currentContent.split('\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(currentContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([currentContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = selectedFile;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold mb-2 border border-blue-500/20">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Complete Project Repository
          </div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Code2 className="w-6 h-6 text-blue-400" />
            Source Code &amp; Project Files
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Browse and inspect all required deliverable files. Every file is documented with clean,
            beginner-friendly Python best practices, defensive error handling, and structured comments.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs sm:text-sm font-semibold border border-slate-700 transition-all active:scale-95 shadow-sm"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-blue-400" />}
            {copied ? 'Copied to Clipboard' : `Copy ${selectedFile}`}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs sm:text-sm font-semibold transition-all active:scale-95 shadow-md shadow-blue-900/30"
          >
            <Download className="w-4 h-4" />
            Download File
          </button>
        </div>
      </div>

      {/* Main File Explorer Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* File Selector Sidebar */}
        <div className="lg:col-span-1 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 px-2 block mb-2">
            Project Files ({fileDefinitions.length})
          </span>
          {fileDefinitions.map((item) => {
            const Icon = item.icon;
            const isSelected = selectedFile === item.name;
            return (
              <button
                key={item.name}
                onClick={() => setSelectedFile(item.name)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex flex-col gap-1 ${
                  isSelected
                    ? 'bg-blue-600/15 border-blue-500 text-white shadow-md shadow-blue-500/10'
                    : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold">
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-blue-400' : 'text-slate-500'}`} />
                    <span className={isSelected ? 'text-white' : 'text-slate-300'}>{item.name}</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-sans ${
                    isSelected ? 'bg-blue-500 text-white font-medium' : 'bg-slate-800 text-slate-500'
                  }`}>
                    {item.badge}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-sans line-clamp-1 mt-0.5">
                  {item.desc}
                </p>
              </button>
            );
          })}

          {/* Mentorship Architecture Highlight */}
          <div className="mt-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-xs text-slate-400 space-y-2">
            <div className="font-semibold text-slate-200 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Mentor Architecture Note
            </div>
            <p className="text-[11px] leading-relaxed">
              Notice how <code className="text-blue-300 font-mono">main.py</code> separates concerns: Data Loading ➔ Data Quality Audit ➔ Statistical Engine ➔ Matplotlib Visualizations ➔ Dynamic Insight Generation.
            </p>
          </div>
        </div>

        {/* Code Content Viewer */}
        <div className="lg:col-span-3 bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
          {/* File Viewer Toolbar */}
          <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="text-white font-bold">{selectedFile}</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400">{lines.length} lines</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400">{(new Blob([currentContent]).size / 1024).toFixed(1)} KB</span>
            </div>
            <div className="text-slate-500">
              UTF-8 • {selectedFile.endsWith('.py') ? 'Python' : selectedFile.endsWith('.csv') ? 'CSV' : 'Markdown'}
            </div>
          </div>

          {/* Code Viewer Body */}
          <div className="p-4 overflow-x-auto max-h-[650px] font-mono text-xs leading-relaxed text-slate-300">
            <pre className="table w-full">
              {lines.map((line, idx) => (
                <div key={idx} className="table-row hover:bg-slate-900/50">
                  <span className="table-cell select-none pr-4 text-right text-slate-600 text-[11px] w-12">
                    {idx + 1}
                  </span>
                  <span className="table-cell whitespace-pre font-mono">
                    {line}
                  </span>
                </div>
              ))}
            </pre>
          </div>
        </div>

      </div>
    </div>
  );
};
