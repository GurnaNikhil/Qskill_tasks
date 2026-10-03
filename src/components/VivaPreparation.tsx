import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Copy, Check, Search, BookOpen, Lightbulb } from 'lucide-react';
import { VIVA_QUESTIONS } from '../data/houseDataset';

export const VivaPreparation: React.FC = () => {
  const [search, setSearch] = useState('');
  const [expandedIndices, setExpandedIndices] = useState<number[]>(VIVA_QUESTIONS.map((_, i) => i));
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const toggleExpand = (idx: number) => {
    if (expandedIndices.includes(idx)) {
      setExpandedIndices(expandedIndices.filter((i) => i !== idx));
    } else {
      setExpandedIndices([...expandedIndices, idx]);
    }
  };

  const expandAll = () => setExpandedIndices(VIVA_QUESTIONS.map((_, i) => i));
  const collapseAll = () => setExpandedIndices([]);

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 1800);
  };

  const filteredQuestions = VIVA_QUESTIONS.filter(
    (item) =>
      item.q.toLowerCase().includes(search.toLowerCase()) ||
      item.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="text-xs uppercase tracking-wider text-blue-400 font-semibold mb-1">
              Machine Learning Viva & Presentation Preparation
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">Technical Evaluation Q&A Guide</h2>
            <p className="text-xs text-slate-400">
              Clear, technically rigorous answers to 13 fundamental Machine Learning regression questions.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={expandAll}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              Expand All
            </button>
            <button
              onClick={collapseAll}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              Collapse All
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="mt-4 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search viva questions (e.g. RMSE, R² score, features, limitations)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-800/80 border border-slate-700 text-slate-200 text-xs rounded-lg pl-9 pr-3 py-2 outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-3">
        {filteredQuestions.map((item, idx) => {
          const isExpanded = expandedIndices.includes(idx);
          const isCopied = copiedIndex === idx;

          return (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm transition-colors"
            >
              <button
                onClick={() => toggleExpand(idx)}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-800/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-mono text-xs font-bold shrink-0">
                    {idx + 1}
                  </div>
                  <h3 className="text-sm font-semibold text-white tracking-tight">{item.q}</h3>
                </div>

                <div className="flex items-center gap-2 text-slate-400">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-slate-800/60 bg-slate-950/40">
                  <div className="flex items-start justify-between gap-3 text-xs leading-relaxed text-slate-300 pt-2">
                    <p className="flex-1 text-[13px]">{item.a}</p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy(`Q: ${item.q}\nA: ${item.a}`, idx);
                      }}
                      className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors shrink-0"
                      title="Copy Q&A"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
