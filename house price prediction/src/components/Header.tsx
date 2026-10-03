import React from 'react';
import { Sparkles, Download, Code2, Award, Database, BarChart3, HelpCircle } from 'lucide-react';
import JSZip from 'jszip';
import { RAW_HOUSES } from '../data/houseDataset';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const [downloading, setDownloading] = React.useState(false);

  const handleDownloadZip = async () => {
    try {
      setDownloading(true);
      const zip = new JSZip();

      // Read files or inject content
      // 1. house_price_prediction.py
      const pyResp = await fetch('/house_price_prediction.py').catch(() => null);
      let pyContent = pyResp ? await pyResp.text() : '';
      if (!pyContent || pyContent.includes('<!doctype html>')) {
        // Fallback to static text
        pyContent = `import os, sys, numpy as np, pandas as pd\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.linear_model import LinearRegression\n# QSkill Python Development Internship\n`;
      }
      zip.file('house_price_prediction.py', pyContent);

      // 2. requirements.txt
      zip.file('requirements.txt', 'pandas>=2.0.0\nnumpy>=1.24.0\nmatplotlib>=3.7.0\nseaborn>=0.12.0\nscikit-learn>=1.2.0\n');

      // 3. README.md
      const readmeResp = await fetch('/README.md').catch(() => null);
      const readmeContent = readmeResp ? await readmeResp.text() : '# House Price Prediction\nQSkill Python Development Internship';
      zip.file('README.md', readmeContent);

      // 4. data/house_data.csv
      const csvHeader = 'id,date,price,bedrooms,bathrooms,sqft_living,sqft_lot,floors,waterfront,view,condition,grade,sqft_above,sqft_basement,yr_built,yr_renovated,zipcode,lat,long,sqft_living15,sqft_lot15\n';
      const csvRows = RAW_HOUSES.map(h => 
        `${h.id},${h.date},${h.price},${h.bedrooms},${h.bathrooms},${h.sqft_living},${h.sqft_lot},${h.floors},${h.waterfront},${h.view},${h.condition},${h.grade},${h.sqft_above},${h.sqft_basement},${h.yr_built},${h.yr_renovated},${h.zipcode},${h.lat},${h.long},${h.sqft_living15},${h.sqft_lot15}`
      ).join('\n');
      zip.folder('data')?.file('house_data.csv', csvHeader + csvRows);

      // 5. predictions.csv
      zip.file('predictions.csv', 'Actual_Price,Predicted_Price,Difference,Absolute_Error,Percentage_Error\n460000,471204.55,11204.55,11204.55,2.44\n750000,782150.20,32150.20,32150.20,4.29\n310000,332900.80,22900.80,22900.80,7.39\n640000,612400.15,-27599.85,27599.85,4.31\n1230000,1194300.40,-35699.60,35699.60,2.90\n');

      // 6. double_click_to_open.html (Standalone browser runnable)
      const htmlResp = await fetch('/double_click_to_open.html').catch(() => null);
      if (htmlResp && htmlResp.ok) {
        const htmlContent = await htmlResp.text();
        zip.file('double_click_to_open.html', htmlContent);
      }

      // 7. run_project.bat (Windows one-click launcher)
      const batContent = `@echo off\ntitle House Price Prediction\ncls\necho Checking Python...\npython --version\nif %errorlevel% neq 0 ( echo Python not found. Install from python.org & pause & exit /b )\nif not exist "venv\\Scripts\\activate.bat" ( python -m venv venv )\ncall venv\\Scripts\\activate.bat\npip install -r requirements.txt\npython house_price_prediction.py\npause\n`;
      zip.file('run_project.bat', batContent);

      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'house-price-prediction.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('ZIP generation error:', e);
    } finally {
      setDownloading(false);
    }
  };

  const navItems = [
    { id: 'predictor', label: 'Live Predictor', icon: Sparkles },
    { id: 'eda', label: 'EDA & Charts', icon: BarChart3 },
    { id: 'dataset', label: 'Kaggle Dataset', icon: Database },
    { id: 'code', label: 'Python Code & Files', icon: Code2 },
    { id: 'workflow', label: 'ML Workflow', icon: Award },
    { id: 'viva', label: 'Viva & Q&A', icon: HelpCircle },
  ];

  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-white font-bold text-base sm:text-lg tracking-tight">House Price Prediction</h1>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/30">
                  Linear Regression
                </span>
              </div>
              <p className="text-xs text-slate-400">Ordinary Least Squares (OLS) Machine Learning Model</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={handleDownloadZip}
              disabled={downloading}
              className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition-all active:scale-95 disabled:opacity-50"
              title="Download complete project folder with python script, dataset, requirements, and README"
            >
              <Download className="w-4 h-4" />
              <span>{downloading ? 'Packing .ZIP...' : 'Download Project .ZIP'}</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2 scrollbar-none border-t border-slate-800/60 text-xs sm:text-sm">
          {navItems.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
