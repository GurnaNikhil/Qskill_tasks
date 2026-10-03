import React, { useState } from 'react';
import { Header } from './components/Header';
import { LivePredictor } from './components/LivePredictor';
import { EdaCharts } from './components/EdaCharts';
import { DatasetExplorer } from './components/DatasetExplorer';
import { CodeStudio } from './components/CodeStudio';
import { WorkflowTimeline } from './components/WorkflowTimeline';
import { VivaPreparation } from './components/VivaPreparation';
import { WindowsSetupGuide } from './components/WindowsSetupGuide';
import { Sparkles, Award, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('predictor');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Header & Navigation */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'predictor' && (
          <div className="space-y-6">
            <LivePredictor />
            <WindowsSetupGuide />
          </div>
        )}

        {activeTab === 'eda' && (
          <div className="space-y-6">
            <EdaCharts />
          </div>
        )}

        {activeTab === 'dataset' && (
          <div className="space-y-6">
            <DatasetExplorer />
          </div>
        )}

        {activeTab === 'code' && (
          <div className="space-y-6">
            <CodeStudio />
          </div>
        )}

        {activeTab === 'workflow' && (
          <div className="space-y-6">
            <WorkflowTimeline />
          </div>
        )}

        {activeTab === 'viva' && (
          <div className="space-y-6">
            <VivaPreparation />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900/90 border-t border-slate-800/80 py-6 mt-12 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 rounded bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold">
              ML
            </div>
            <span>
              <strong>House Price Prediction</strong> — Machine Learning Regression Project
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Model: OLS Linear Regression</span>
            <span>•</span>
            <span>Dataset: King County, WA (Kaggle)</span>
            <span>•</span>
            <span>Evaluation: MAE $54.3k | R² 72.85%</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
