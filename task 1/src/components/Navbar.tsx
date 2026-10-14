import React from 'react';
import { 
  BarChart3, 
  Terminal, 
  Code2, 
  Image as ImageIcon, 
  MonitorPlay, 
  FileText, 
  GraduationCap, 
  Download, 
  Play, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onRunPython: () => void;
  isRunning: boolean;
  onDownloadZip: () => void;
  studentCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onRunPython,
  isRunning,
  onDownloadZip,
  studentCount,
}) => {
  const tabs = [
    { id: 'analytics', label: 'Interactive Dashboard', icon: BarChart3 },
    { id: 'terminal', label: 'Python Console', icon: Terminal },
    { id: 'code', label: 'Source Code & Files', icon: Code2 },
    { id: 'visualizations', label: 'Charts & Outputs', icon: ImageIcon },
    { id: 'vscode', label: 'VS Code Setup Guide', icon: MonitorPlay },
    { id: 'report', label: 'Project Report', icon: FileText },
    { id: 'viva', label: 'Viva & Interview Prep', icon: GraduationCap },
  ];

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-50 shadow-md">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white font-bold text-lg">
            🐍
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-xs font-semibold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/30 rounded-full">
                QSkill Python Developer Internship
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-medium">
                <CheckCircle2 className="w-3 h-3" />
                Verified Pipeline
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
              Student Performance Data Analysis & Visualization
            </h1>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={onRunPython}
            disabled={isRunning}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-md ${
              isRunning
                ? 'bg-amber-600 text-white opacity-80 cursor-not-allowed'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/30 active:scale-95'
            }`}
          >
            <Play className={`w-4 h-4 ${isRunning ? 'animate-spin' : 'fill-current'}`} />
            {isRunning ? 'Running main.py...' : 'Run Python Script'}
          </button>

          <button
            onClick={onDownloadZip}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all active:scale-95 shadow-sm"
            title="Download full project archive with main.py, dataset, and documentation"
          >
            <Download className="w-4 h-4 text-blue-400" />
            <span className="hidden sm:inline">Download</span> ZIP
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto no-scrollbar border-t border-slate-800/80">
        <nav className="flex space-x-1 py-1.5" aria-label="Tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
