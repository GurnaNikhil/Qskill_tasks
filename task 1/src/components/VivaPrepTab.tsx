import React, { useState } from 'react';
import { 
  GraduationCap, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  CheckCircle2, 
  Award, 
  BookOpen, 
  Lightbulb, 
  Check, 
  Copy
} from 'lucide-react';

interface VivaQuestion {
  id: number;
  question: string;
  category: string;
  answer: string;
  keyPoints: string[];
  codeSnippet?: string;
}

export const VivaPrepTab: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(1);
  const [masteredIds, setMasteredIds] = useState<number[]>([]);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const questions: VivaQuestion[] = [
    {
      id: 1,
      category: 'Pandas Core',
      question: 'What is the distinction between a Pandas Series and a Pandas DataFrame? How were both used in this project?',
      answer: 'A Pandas Series is a one-dimensional labeled array capable of holding any data type. In contrast, a DataFrame is a two-dimensional labeled tabular data structure containing rows and columns, similar to a spreadsheet or SQL table. In this project, `df = pd.read_csv("student_data.csv")` instantiates a DataFrame. When we extract an individual subject column like `df["Math"]` to calculate its mean or pass it to a plotting function, that individual column is represented as a Series.',
      keyPoints: [
        'Series = 1D labeled array (single column or row).',
        'DataFrame = 2D size-mutable tabular container of multiple Series.',
        'Project usage: df is a DataFrame; df["Math"] is a Series.',
      ],
      codeSnippet: '# DataFrame creation\ndf = pd.read_csv("student_data.csv")\n\n# Series extraction & aggregation\nmath_series = df["Math"]\nmath_mean = math_series.mean()',
    },
    {
      id: 2,
      category: 'Matplotlib Architecture',
      question: 'How did you create the correlation heatmap using pure Matplotlib without importing Seaborn?',
      answer: 'Seaborn is merely a high-level wrapper around Matplotlib. To render the correlation heatmap natively, we computed the Pearson correlation matrix via Pandas (`df[cols].corr()`), and then invoked Matplotlib\'s `ax.imshow(corr_matrix.values, cmap="coolwarm", vmin=-1, vmax=1)`. We appended a colorbar with `fig.colorbar(cax)`, mapped axis ticks to subject labels using `ax.set_xticks()` and `ax.set_xticklabels()`, and nested loops to draw exact float values inside each cell using `ax.text(j, i, f"{val:.2f}")` with dynamic font color contrast (white text on dark backgrounds, black text on light backgrounds).',
      keyPoints: [
        'Used ax.imshow() with the "coolwarm" colormap and vmin=-1, vmax=1.',
        'fig.colorbar() adds the legend scale.',
        'Nested loops over matrix cells with ax.text() to print values directly.',
        'Contrast-aware font color logic for readable overlays.',
      ],
      codeSnippet: 'cax = ax.imshow(corr, cmap="coolwarm", vmin=-1, vmax=1)\nfig.colorbar(cax)\nfor i in range(n):\n    for j in range(n):\n        color = "white" if abs(corr[i, j]) > 0.65 else "black"\n        ax.text(j, i, f"{corr[i, j]:.2f}", ha="center", va="center", color=color)',
    },
    {
      id: 3,
      category: 'Exploratory Statistics',
      question: 'Why is it critical to compute both Mean and Median? What does it signify if Mean and Median diverge?',
      answer: 'The Mean provides the arithmetic center by taking all data points into account, but it is vulnerable to distortion by extreme outliers. The Median is the 50th percentile (middle value when sorted), which is resilient to outliers. If Mean is roughly equal to Median, the score distribution is symmetrical. If Mean is significantly greater than Median, the distribution is right-skewed by high performers. If Mean is noticeably lower than Median, the distribution is left-skewed by low-scoring outliers. In our dataset, Math had a Mean of 77.34 and Median of 80.00, revealing a slight left skew due to a few students scoring below 60.',
      keyPoints: [
        'Mean reflects sum / N; highly sensitive to extreme outliers.',
        'Median is the middle value; robust against outliers.',
        'Mean < Median = left-skewed (low outliers dragging average down).',
        'Mean > Median = right-skewed (high outliers pulling average up).',
      ],
    },
    {
      id: 4,
      category: 'Correlation & Modeling',
      question: 'What is Pearson Correlation Coefficient (r) and what does an r value of ~0.98 between Math and Science signify?',
      answer: 'The Pearson correlation coefficient (r) measures the strength and direction of a linear relationship between two continuous variables on a scale from -1.0 to +1.0. A value of +1.0 indicates a perfect positive linear correlation, 0 means no linear association, and -1.0 is a perfect inverse relationship. In this analysis, the calculated correlation between Math and Science is r = 0.99 (or 0.98 depending on sample additions). This signifies an exceptionally strong positive linear relationship: students who excel in quantitative mathematical reasoning reliably exhibit high achievement in scientific problem solving.',
      keyPoints: [
        'Pearson r bounds: -1.0 <= r <= +1.0.',
        'r = 0.98 represents an exceptionally strong positive linear association.',
        'Quantifies educational synergy across STEM subjects.',
        'Linear trendline computed with np.polyfit(x, y, 1).',
      ],
    },
    {
      id: 5,
      category: 'Defensive Programming',
      question: 'What error handling and defensive coding strategies were implemented in main.py?',
      answer: 'The project implements several defensive techniques: 1) File existence is checked using `os.path.exists()` before calling `pd.read_csv()` to prevent unhandled FileNotFoundError crashes. 2) CSV reading is wrapped in try-except blocks handling EmptyDataError and ParserError. 3) Output folders are created safely with `os.makedirs(exist_ok=True)`. 4) Required columns are checked explicitly in `df.columns` before indexing. 5) Numeric type coercion is applied via `pd.to_numeric(errors="coerce")` to avoid crashes on dirty strings. 6) Missing values and duplicate rows are explicitly inspected and handled with median imputation or deduplication.',
      keyPoints: [
        'os.path.exists() prevents raw FileNotFoundError.',
        'Schema column presence validation.',
        'pd.to_numeric(errors="coerce") sanitizes unexpected string tokens.',
        'os.makedirs(exist_ok=True) ensures directory safety on any machine.',
        'Data quality checks with isnull().sum() and duplicated().sum().',
      ],
    },
    {
      id: 6,
      category: 'Matplotlib Memory Management',
      question: 'Bonus: Why is calling plt.close() essential in automated batch data analysis scripts?',
      answer: 'When Matplotlib figures are created, they remain loaded in memory in the global Pyplot state until explicitly closed. In headless scripts or automated batch jobs where multiple figures are generated, omitting `plt.close()` causes figures to accumulate in RAM, generating warnings (such as "More than 20 figures have been opened") and causing memory leaks. Calling `plt.close()` deallocates the figure memory immediately after saving.',
      keyPoints: [
        'Matplotlib keeps active figures in Pyplot internal memory.',
        'Omitting plt.close() leads to memory leaks in automated pipelines.',
        'plt.tight_layout() ensures labels and legends are never clipped.',
      ],
    },
  ];

  const toggleMastered = (id: number) => {
    setMasteredIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleCopyQuestion = (q: VivaQuestion) => {
    const text = `Q: ${q.question}\n\nAnswer: ${q.answer}\n\nKey Takeaways:\n${q.keyPoints.map(p => `• ${p}`).join('\n')}`;
    navigator.clipboard.writeText(text);
    setCopiedId(q.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold mb-2 border border-emerald-500/20">
            <GraduationCap className="w-3.5 h-3.5" />
            Internship Evaluation &amp; Interview Prep
          </div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-emerald-400" />
            Viva &amp; Technical Interview Masterclass
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            In-depth questions and expert answers designed to prepare you for your QSkill internship viva,
            technical review, or data analysis developer interviews.
          </p>
        </div>

        {/* Progress Tracker */}
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs text-slate-400 font-medium">Preparedness</div>
            <div className="text-base font-bold text-emerald-400">
              {masteredIds.length} / {questions.length} Mastered
            </div>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-emerald-500/40 flex items-center justify-center font-bold text-xs text-white">
            {Math.round((masteredIds.length / questions.length) * 100)}%
          </div>
        </div>
      </div>

      {/* Questions Accordion List */}
      <div className="space-y-4 max-w-4xl mx-auto">
        {questions.map((q) => {
          const isOpen = openId === q.id;
          const isMastered = masteredIds.includes(q.id);

          return (
            <div
              key={q.id}
              className={`bg-slate-900 border rounded-2xl transition-all overflow-hidden shadow-lg ${
                isOpen ? 'border-emerald-500/50 ring-1 ring-emerald-500/20' : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Question Header Button */}
              <div
                onClick={() => setOpenId(isOpen ? null : q.id)}
                className="w-full text-left p-5 flex items-start justify-between gap-4 cursor-pointer select-none"
              >
                <div className="flex items-start gap-3.5">
                  <span className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                    isMastered
                      ? 'bg-emerald-500 text-white shadow-sm'
                      : 'bg-slate-800 text-slate-300 border border-slate-700'
                  }`}>
                    {isMastered ? <Check className="w-4 h-4" /> : q.id}
                  </span>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {q.category}
                      </span>
                      {isMastered && (
                        <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Mastered
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-white leading-snug">
                      {q.question}
                    </h3>
                  </div>
                </div>

                <div className="text-slate-400 shrink-0 mt-1">
                  {isOpen ? <ChevronUp className="w-5 h-5 text-emerald-400" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </div>

              {/* Collapsible Answer Body */}
              {isOpen && (
                <div className="px-5 pb-6 pt-2 border-t border-slate-800/80 space-y-4 text-xs sm:text-sm">
                  {/* Detailed Answer Text */}
                  <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 text-slate-300 leading-relaxed">
                    <div className="text-xs font-bold uppercase text-emerald-400 mb-1 flex items-center gap-1.5">
                      <Lightbulb className="w-3.5 h-3.5" />
                      Comprehensive Technical Answer:
                    </div>
                    <p>{q.answer}</p>
                  </div>

                  {/* Code Snippet if applicable */}
                  {q.codeSnippet && (
                    <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-xs text-blue-300 overflow-x-auto whitespace-pre">
                      {q.codeSnippet}
                    </div>
                  )}

                  {/* Key Takeaways */}
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold text-white uppercase tracking-wider block">
                      Quick Interview Bullet Points to Recite:
                    </span>
                    <ul className="space-y-1">
                      {q.keyPoints.map((point, i) => (
                        <li key={i} className="text-slate-400 text-xs flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions footer */}
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between flex-wrap gap-2">
                    <button
                      onClick={() => toggleMastered(q.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        isMastered
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      {isMastered ? 'Marked as Mastered' : 'Mark as Mastered'}
                    </button>

                    <button
                      onClick={() => handleCopyQuestion(q)}
                      className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
                    >
                      {copiedId === q.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedId === q.id ? 'Copied Q&A' : 'Copy Q&A'}</span>
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
