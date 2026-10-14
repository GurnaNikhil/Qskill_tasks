import React, { useState, useEffect } from 'react';
import JSZip from 'jszip';
import { Navbar } from './components/Navbar';
import { AnalyticsTab } from './components/AnalyticsTab';
import { PythonTerminalTab } from './components/PythonTerminalTab';
import { CodeExplorerTab } from './components/CodeExplorerTab';
import { VisualizationsTab } from './components/VisualizationsTab';
import { VSCodeGuideTab } from './components/VSCodeGuideTab';
import { ProjectReportTab } from './components/ProjectReportTab';
import { VivaPrepTab } from './components/VivaPrepTab';
import { StudentRecord, SubjectStat, CorrelationMatrix } from './types';
import { 
  parseCSV, 
  computeStats, 
  computeCorrelationMatrix 
} from './utils/dataProcessor';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('analytics');
  const [records, setRecords] = useState<StudentRecord[]>([]);
  const [stats, setStats] = useState<SubjectStat[]>([]);
  const [corrMatrix, setCorrMatrix] = useState<CorrelationMatrix>({ columns: [], matrix: [] });
  const [files, setFiles] = useState<Record<string, string>>({});
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [terminalOutput, setTerminalOutput] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Fetch project files from backend on mount
  const fetchFiles = async () => {
    try {
      const res = await fetch('/api/files');
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.files) {
          setFiles(data.files);
          if (data.files['student_data.csv']) {
            loadCsvData(data.files['student_data.csv']);
          }
        }
      }
    } catch (err) {
      console.warn('Backend /api/files fetch error, using client fallback', err);
    }
  };

  const loadCsvData = (csvContent: string) => {
    const parsed = parseCSV(csvContent);
    setRecords(parsed);
    const computed = computeStats(parsed);
    setStats(computed);
    const matrix = computeCorrelationMatrix(parsed);
    setCorrMatrix(matrix);
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  // Run python script on backend
  const handleRunPython = async () => {
    setIsRunning(true);
    showToast('Executing python3 main.py on server...');
    try {
      const res = await fetch('/api/run-python', { method: 'POST' });
      const data = await res.json();
      
      const combined = [data.stdout, data.stderr].filter(Boolean).join('\n');
      setTerminalOutput(combined);

      if (data.success) {
        showToast('Python execution finished successfully! Outputs saved.');
        setActiveTab('terminal');
      } else {
        showToast('Execution finished with warnings/errors. Check terminal.');
        setActiveTab('terminal');
      }

      // Refresh files to ensure sync
      fetchFiles();
    } catch (err: any) {
      setTerminalOutput(`[ERROR] Failed to communicate with server: ${err.message}`);
      showToast('Error executing Python script.');
    } finally {
      setIsRunning(false);
    }
  };

  // Update records (e.g. adding student or editing)
  const handleUpdateRecord = async (updated: StudentRecord[]) => {
    setRecords(updated);
    const computed = computeStats(updated);
    setStats(computed);
    const matrix = computeCorrelationMatrix(updated);
    setCorrMatrix(matrix);

    // Generate CSV string
    const headers = ['Student_ID', 'Name', 'Gender', 'Math', 'Science', 'English', 'Study_Hours', 'Attendance_Percentage'];
    const csvLines = [headers.join(',')];
    for (const r of updated) {
      csvLines.push(`${r.Student_ID},${r.Name},${r.Gender},${r.Math},${r.Science},${r.English},${r.Study_Hours},${r.Attendance_Percentage}`);
    }
    const newCsv = csvLines.join('\n');

    setFiles(prev => ({ ...prev, 'student_data.csv': newCsv }));

    // Persist to backend
    try {
      await fetch('/api/save-csv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ csvContent: newCsv }),
      });
      showToast('Records updated & student_data.csv saved');
    } catch (e) {
      console.error('Failed to save CSV to server', e);
    }
  };

  // Reset to initial sample records
  const handleResetData = async () => {
    fetchFiles();
    showToast('Reset dataset to initial 35 sample records');
  };

  // Download complete project as ZIP
  const handleDownloadZip = async () => {
    showToast('Preparing complete project ZIP archive...');
    try {
      const zip = new JSZip();

      // Add text/code files
      for (const [filename, content] of Object.entries(files)) {
        if (content) {
          zip.file(filename, content);
        }
      }

      // Add outputs folder
      const outputsFolder = zip.folder('outputs');
      if (outputsFolder) {
        const imageFiles = [
          'average_marks_bar_chart.png',
          'math_science_scatter_plot.png',
          'subject_correlation_heatmap.png',
        ];

        for (const imgName of imageFiles) {
          try {
            const imgRes = await fetch(`/outputs/${imgName}`);
            if (imgRes.ok) {
              const blob = await imgRes.blob();
              outputsFolder.file(imgName, blob);
            }
          } catch (e) {
            console.warn(`Could not include ${imgName} in zip`, e);
          }
        }
      }

      // Generate zip and trigger download
      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'QSkill_Student_Performance_Analysis_Project.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('Project ZIP downloaded successfully!');
    } catch (err: any) {
      showToast(`ZIP generation failed: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-blue-500/50 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
          {toastMessage}
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onRunPython={handleRunPython}
        isRunning={isRunning}
        onDownloadZip={handleDownloadZip}
        studentCount={records.length}
      />

      {/* Main Tab View */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'analytics' && (
          <AnalyticsTab
            records={records}
            stats={stats}
            corrMatrix={corrMatrix}
            onUpdateRecord={handleUpdateRecord}
            onResetData={handleResetData}
            onRunPython={handleRunPython}
          />
        )}

        {activeTab === 'terminal' && (
          <PythonTerminalTab
            onRunPython={handleRunPython}
            isRunning={isRunning}
            terminalOutput={terminalOutput}
            onClearOutput={() => setTerminalOutput('')}
          />
        )}

        {activeTab === 'code' && (
          <CodeExplorerTab files={files} />
        )}

        {activeTab === 'visualizations' && (
          <VisualizationsTab
            stats={stats}
            corrMatrix={corrMatrix}
          />
        )}

        {activeTab === 'vscode' && (
          <VSCodeGuideTab />
        )}

        {activeTab === 'report' && (
          <ProjectReportTab
            reportContent={files['project_report.md'] || ''}
          />
        )}

        {activeTab === 'viva' && (
          <VivaPrepTab />
        )}
      </main>
    </div>
  );
}
