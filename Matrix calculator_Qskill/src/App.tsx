/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import {
  Terminal,
  Calculator,
  ShieldCheck,
  FolderCode,
  GraduationCap,
  Download,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { InteractiveTerminal } from "./components/InteractiveTerminal";
import { VisualCalculator } from "./components/VisualCalculator";
import { TestRunner } from "./components/TestRunner";
import { CodeExplorer } from "./components/CodeExplorer";
import { VivaGuide } from "./components/VivaGuide";
import { downloadProjectZip } from "./data/projectFiles";

export default function App() {
  const [activeTab, setActiveTab] = useState<
    "terminal" | "calculator" | "tests" | "code" | "viva"
  >("terminal");
  const [isZipping, setIsZipping] = useState(false);

  const handleDownload = async () => {
    setIsZipping(true);
    try {
      await downloadProjectZip();
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center shadow-md shadow-blue-500/20 font-bold text-white text-base">
              [M]
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-slate-100 text-sm sm:text-base tracking-tight">
                  Matrix Operations Tool
                </h1>
                <span className="text-[10px] uppercase font-mono font-semibold px-2 py-0.5 rounded-full bg-blue-950 text-blue-400 border border-blue-800/80">
                  NumPy
                </span>
              </div>
              <p className="text-xs text-slate-400">
                QSkill Python Development Internship Project
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 px-2.5 py-1 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Assignment Ready</span>
            </div>

            <button
              onClick={handleDownload}
              disabled={isZipping}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium px-3.5 py-1.5 rounded-lg text-xs transition shadow-sm"
              title="Download standalone Python project files in a ZIP archive"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isZipping ? "Exporting..." : "Download Project .zip"}</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto border-t border-slate-800/60 no-scrollbar">
          <button
            onClick={() => setActiveTab("terminal")}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium border-b-2 transition whitespace-nowrap ${
              activeTab === "terminal"
                ? "border-blue-500 text-blue-400 bg-slate-800/40"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Interactive CLI Simulator</span>
          </button>

          <button
            onClick={() => setActiveTab("calculator")}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium border-b-2 transition whitespace-nowrap ${
              activeTab === "calculator"
                ? "border-blue-500 text-blue-400 bg-slate-800/40"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>Visual Matrix Calculator</span>
          </button>

          <button
            onClick={() => setActiveTab("tests")}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium border-b-2 transition whitespace-nowrap ${
              activeTab === "tests"
                ? "border-blue-500 text-blue-400 bg-slate-800/40"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Test Suite Verification (8/8)</span>
          </button>

          <button
            onClick={() => setActiveTab("code")}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium border-b-2 transition whitespace-nowrap ${
              activeTab === "code"
                ? "border-blue-500 text-blue-400 bg-slate-800/40"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <FolderCode className="w-4 h-4" />
            <span>Project Files &amp; Code</span>
          </button>

          <button
            onClick={() => setActiveTab("viva")}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium border-b-2 transition whitespace-nowrap ${
              activeTab === "viva"
                ? "border-blue-500 text-blue-400 bg-slate-800/40"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Viva &amp; Submission Guide</span>
          </button>
        </div>
      </header>

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === "terminal" && (
          <div className="h-[640px]">
            <InteractiveTerminal />
          </div>
        )}

        {activeTab === "calculator" && <VisualCalculator />}

        {activeTab === "tests" && <TestRunner />}

        {activeTab === "code" && <CodeExplorer />}

        {activeTab === "viva" && <VivaGuide />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            QSkill Python Development Internship Capstone Project &bull; Python 3 &amp; NumPy
          </span>
          <span className="font-mono text-slate-500 text-[11px]">
            matrix_operations_tool/ v1.0.0
          </span>
        </div>
      </footer>
    </div>
  );
}
