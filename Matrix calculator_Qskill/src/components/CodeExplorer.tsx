import React, { useState } from "react";
import { PROJECT_FILES, ProjectFile, downloadFile, downloadProjectZip } from "../data/projectFiles";
import {
  FileCode,
  Download,
  Copy,
  Check,
  FolderArchive,
  FileText,
  Settings,
  FolderGit2,
} from "lucide-react";

export const CodeExplorer: React.FC = () => {
  const [activeFile, setActiveFile] = useState<ProjectFile>(PROJECT_FILES[0]);
  const [copied, setCopied] = useState(false);
  const [isZipping, setIsZipping] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(activeFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    setIsZipping(true);
    try {
      await downloadProjectZip();
    } finally {
      setIsZipping(false);
    }
  };

  const getFileIcon = (file: ProjectFile) => {
    switch (file.category) {
      case "core":
      case "gui":
      case "test":
        return <FileCode className="w-4 h-4 text-blue-400" />;
      case "docs":
        return <FileText className="w-4 h-4 text-emerald-400" />;
      case "config":
        return <Settings className="w-4 h-4 text-amber-400" />;
      default:
        return <FolderGit2 className="w-4 h-4 text-slate-400" />;
    }
  };

  // Format line numbers
  const lines = activeFile.content.split("\n");

  return (
    <div className="space-y-6">
      {/* Top Bar with Download All Button */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
            <FolderArchive className="w-5 h-5 text-blue-400" />
            Project File Explorer & Code Export
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            All files are pre-configured according to the QSkill Python Internship specifications. Download individually or as a complete ZIP bundle.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleDownloadZip}
            disabled={isZipping}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium px-4 py-2 rounded-lg transition text-xs sm:text-sm shadow"
          >
            <Download className="w-4 h-4" />
            {isZipping ? "Generating ZIP..." : "Download Full Project (.zip)"}
          </button>
        </div>
      </div>

      {/* Main Grid: File List & Code Display */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Left Sidebar: File Tree */}
        <div className="lg:col-span-1 bg-slate-900 border border-slate-800 rounded-xl p-3 space-y-2">
          <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-800 flex items-center gap-2">
            <FolderGit2 className="w-4 h-4 text-blue-400" />
            <span>matrix_operations_tool/</span>
          </div>

          <div className="space-y-1">
            {PROJECT_FILES.map((file) => {
              const isSelected = activeFile.filename === file.filename;
              return (
                <button
                  key={file.filename}
                  onClick={() => setActiveFile(file)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg border transition flex items-center justify-between text-xs ${
                    isSelected
                      ? "bg-slate-800 border-blue-500/50 text-white shadow-sm font-medium"
                      : "bg-slate-950/40 border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    {getFileIcon(file)}
                    <span className="truncate">{file.filename}</span>
                  </div>
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-500">
                    {file.language}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-800/80 px-2">
            <p className="text-[11px] text-slate-500 leading-tight">
              Tip: Place these files in your GitHub repository root or in a folder named <code className="text-blue-400 font-mono">matrix_operations_tool/</code>.
            </p>
          </div>
        </div>

        {/* Right Code Viewer */}
        <div className="lg:col-span-3 bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-xl flex flex-col font-mono">
          {/* Header */}
          <div className="bg-slate-900 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              {getFileIcon(activeFile)}
              <span className="font-semibold text-slate-200 text-xs sm:text-sm">
                {activeFile.filename}
              </span>
              <span className="text-slate-500 text-xs hidden sm:inline">
                ({lines.length} lines)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded border border-slate-700 transition flex items-center gap-1.5 font-sans"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" /> Copy Code
                  </>
                )}
              </button>

              <button
                onClick={() => downloadFile(activeFile.filename, activeFile.content)}
                className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded border border-slate-700 transition flex items-center gap-1.5 font-sans"
              >
                <Download className="w-3.5 h-3.5 text-slate-400" /> Download
              </button>
            </div>
          </div>

          {/* File description note */}
          <div className="bg-slate-900/60 px-4 py-2 text-[11px] text-slate-400 border-b border-slate-800 font-sans flex items-center gap-1.5">
            <span className="font-semibold text-slate-300">File Purpose:</span>
            <span>{activeFile.description}</span>
          </div>

          {/* Monospace Code Editor View */}
          <div className="p-4 max-h-[520px] overflow-auto text-xs text-slate-300 font-mono leading-relaxed select-text">
            <pre className="table w-full">
              {lines.map((line, idx) => (
                <div key={idx} className="table-row hover:bg-slate-900/50">
                  <span className="table-cell text-right pr-4 select-none text-slate-600 font-mono text-[11px] w-8">
                    {idx + 1}
                  </span>
                  <span className="table-cell whitespace-pre font-mono text-slate-200">
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
