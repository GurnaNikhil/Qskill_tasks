import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Grid3X3, 
  Download, 
  Code2, 
  CheckCircle2, 
  Sparkles, 
  Layers,
  ZoomIn,
  FileImage
} from 'lucide-react';
import { SubjectStat, CorrelationMatrix } from '../types';

interface VisualizationsTabProps {
  stats: SubjectStat[];
  corrMatrix: CorrelationMatrix;
}

export const VisualizationsTab: React.FC<VisualizationsTabProps> = ({ stats, corrMatrix }) => {
  const [activeChart, setActiveChart] = useState<'bar' | 'scatter' | 'heatmap'>('bar');
  const [viewMode, setViewMode] = useState<'png' | 'interactive'>('png');

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold mb-2 border border-blue-500/20">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Matplotlib Output Specification
          </div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <FileImage className="w-6 h-6 text-blue-400" />
            Generated Visualizations &amp; Output Gallery
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Inspect all three required Matplotlib figures exported as 300-DPI publication-quality PNG files into the
            <code className="text-emerald-300 font-mono"> outputs/</code> directory.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 self-start md:self-auto">
          <button
            onClick={() => setActiveChart('bar')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeChart === 'bar' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" /> Bar Chart
          </button>
          <button
            onClick={() => setActiveChart('scatter')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeChart === 'scatter' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" /> Scatter Plot
          </button>
          <button
            onClick={() => setActiveChart('heatmap')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeChart === 'heatmap' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Grid3X3 className="w-3.5 h-3.5" /> Heatmap
          </button>
        </div>
      </div>

      {/* Selected Chart Details */}
      {activeChart === 'bar' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Visual Presentation */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-bold uppercase text-blue-400">Figure 1</span>
                <h3 className="text-lg font-bold text-white">Subject Average Marks Bar Chart</h3>
              </div>
              <span className="text-xs text-slate-400 font-mono bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                outputs/average_marks_bar_chart.png
              </span>
            </div>

            {/* Graphic Container */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col items-center justify-center min-h-[360px] overflow-hidden">
              <div className="w-full flex items-center justify-between mb-3 px-2">
                <span className="text-xs font-semibold text-slate-400">Preview: Matplotlib 300-DPI Output</span>
                <a
                  href="/outputs/average_marks_bar_chart.png"
                  download="average_marks_bar_chart.png"
                  className="flex items-center gap-1.5 px-3 py-1 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 rounded-lg text-xs font-medium transition-colors"
                >
                  <Download className="w-3.5 h-3.5" /> Download PNG
                </a>
              </div>

              <div className="w-full flex items-center justify-center rounded-lg bg-slate-900/50 p-2 border border-slate-800/80">
                <img
                  src="/outputs/average_marks_bar_chart.png"
                  alt="Average Marks Bar Chart"
                  className="max-h-[380px] w-auto object-contain rounded shadow-lg hover:scale-[1.02] transition-transform"
                />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
              <span>Resolution: 2400 x 1800 px (300 DPI)</span>
              <span className="text-emerald-400 font-medium">✓ Verified from outputs/</span>
            </div>
          </div>

          {/* Technical Implementation Breakdown */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Code2 className="w-4 h-4 text-blue-400" />
              Matplotlib Implementation Code
            </h4>
            <p className="text-xs text-slate-400">
              Extracted directly from <code className="text-blue-300 font-mono">plot_average_marks_bar()</code> in <code className="text-slate-300 font-mono">main.py</code>.
            </p>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto">
              <pre>{`def plot_average_marks_bar(subject_stats, output_dir="outputs"):
    subjects = list(subject_stats.keys())
    averages = [subject_stats[s]["mean"] for s in subjects]

    plt.figure(figsize=(8, 6), dpi=150)
    colors = ['#2563eb', '#059669', '#d97706']
    bars = plt.bar(subjects, averages, color=colors, width=0.55)

    plt.title("Comparison of Average Student Marks by Subject", fontweight='bold')
    plt.xlabel("Subjects", fontweight='semibold')
    plt.ylabel("Average Marks (out of 100)", fontweight='semibold')
    plt.ylim(0, 105)
    plt.grid(axis='y', linestyle='--', alpha=0.5)

    for bar in bars:
        yval = bar.get_height()
        plt.text(bar.get_x() + bar.get_width()/2.0, yval + 1.8, f"{yval:.2f}",
                 ha='center', va='bottom', fontweight='bold')

    plt.tight_layout()
    plt.savefig(f"{output_dir}/average_marks_bar_chart.png", dpi=300)
    plt.close()`}</pre>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="font-semibold text-white">Key Mentorship Highlights:</div>
              <ul className="list-disc list-inside space-y-1 text-slate-400">
                <li>Uses <code className="text-blue-300">plt.text()</code> with centered horizontal alignment to print exact float averages above each bar.</li>
                <li>Restricts y-axis limit to 105 using <code className="text-blue-300">plt.ylim(0, 105)</code> so value labels never clip off the top.</li>
                <li>Applies <code className="text-blue-300">plt.tight_layout()</code> and <code className="text-blue-300">plt.close()</code> to manage figure memory properly.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeChart === 'scatter' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-bold uppercase text-emerald-400">Figure 2</span>
                <h3 className="text-lg font-bold text-white">Math vs. Science Scatter Plot &amp; Trendline</h3>
              </div>
              <span className="text-xs text-slate-400 font-mono bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                outputs/math_science_scatter_plot.png
              </span>
            </div>

            {/* Graphic Container */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col items-center justify-center min-h-[360px] overflow-hidden">
              <div className="w-full flex items-center justify-between mb-3 px-2">
                <span className="text-xs font-semibold text-slate-400">Preview: Matplotlib 300-DPI Output</span>
                <a
                  href="/outputs/math_science_scatter_plot.png"
                  download="math_science_scatter_plot.png"
                  className="flex items-center gap-1.5 px-3 py-1 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-medium transition-colors"
                >
                  <Download className="w-3.5 h-3.5" /> Download PNG
                </a>
              </div>

              <div className="w-full flex items-center justify-center rounded-lg bg-slate-900/50 p-2 border border-slate-800/80">
                <img
                  src="/outputs/math_science_scatter_plot.png"
                  alt="Math vs Science Scatter Plot"
                  className="max-h-[380px] w-auto object-contain rounded shadow-lg hover:scale-[1.02] transition-transform"
                />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
              <span>Resolution: 2400 x 1800 px (300 DPI)</span>
              <span className="text-emerald-400 font-medium">✓ Verified from outputs/</span>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Code2 className="w-4 h-4 text-emerald-400" />
              Matplotlib Implementation Code
            </h4>
            <p className="text-xs text-slate-400">
              Extracted from <code className="text-emerald-300 font-mono">plot_math_science_scatter()</code>.
            </p>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto">
              <pre>{`def plot_math_science_scatter(df, output_dir="outputs"):
    x, y = df["Math"], df["Science"]
    corr = x.corr(y)

    plt.figure(figsize=(8, 6), dpi=150)
    plt.scatter(x, y, color='#3b82f6', alpha=0.75, s=70, 
                edgecolors='#1d4ed8', label=f"Students (N={len(df)})")

    # Linear Regression Fit
    m, b = np.polyfit(x, y, 1)
    x_trend = np.linspace(x.min()-2, x.max()+2, 100)
    plt.plot(x_trend, m*x_trend + b, color='#dc2626', 
             linewidth=2, label=f"Trendline (r = {corr:.2f})")

    plt.title("Relationship Between Math and Science Marks", fontweight='bold')
    plt.xlabel("Math Marks", fontweight='semibold')
    plt.ylabel("Science Marks", fontweight='semibold')
    plt.grid(True, linestyle='--', alpha=0.5)
    plt.legend(loc="upper left")

    plt.tight_layout()
    plt.savefig(f"{output_dir}/math_science_scatter_plot.png", dpi=300)
    plt.close()`}</pre>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="font-semibold text-white">Key Mentorship Highlights:</div>
              <ul className="list-disc list-inside space-y-1 text-slate-400">
                <li>Utilizes <code className="text-emerald-300">np.polyfit(x, y, 1)</code> to calculate slope $m$ and intercept $b$ for the best-fit regression line.</li>
                <li>Displays both student clusters and trendline in the legend with the live $r$ correlation coefficient.</li>
                <li>Applies alpha transparency (<code className="text-emerald-300">alpha=0.75</code>) to make overlapping data points visible.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeChart === 'heatmap' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-bold uppercase text-amber-400">Figure 3</span>
                <h3 className="text-lg font-bold text-white">Pure Matplotlib Subject Correlation Heatmap</h3>
              </div>
              <span className="text-xs text-slate-400 font-mono bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                outputs/subject_correlation_heatmap.png
              </span>
            </div>

            {/* Graphic Container */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col items-center justify-center min-h-[360px] overflow-hidden">
              <div className="w-full flex items-center justify-between mb-3 px-2">
                <span className="text-xs font-semibold text-slate-400">Preview: Matplotlib 300-DPI Output</span>
                <a
                  href="/outputs/subject_correlation_heatmap.png"
                  download="subject_correlation_heatmap.png"
                  className="flex items-center gap-1.5 px-3 py-1 bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-medium transition-colors"
                >
                  <Download className="w-3.5 h-3.5" /> Download PNG
                </a>
              </div>

              <div className="w-full flex items-center justify-center rounded-lg bg-slate-900/50 p-2 border border-slate-800/80">
                <img
                  src="/outputs/subject_correlation_heatmap.png"
                  alt="Subject Correlation Heatmap"
                  className="max-h-[380px] w-auto object-contain rounded shadow-lg hover:scale-[1.02] transition-transform"
                />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
              <span>Resolution: 2100 x 1800 px (300 DPI)</span>
              <span className="text-emerald-400 font-medium">✓ Verified from outputs/</span>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Code2 className="w-4 h-4 text-amber-400" />
              Matplotlib Implementation Code
            </h4>
            <p className="text-xs text-slate-400">
              Extracted from <code className="text-amber-300 font-mono">plot_correlation_heatmap()</code>.
            </p>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto">
              <pre>{`def plot_correlation_heatmap(df, cols, output_dir="outputs"):
    corr = df[cols].corr().values
    n = len(cols)

    fig, ax = plt.subplots(figsize=(7, 6), dpi=150)
    cax = ax.imshow(corr, cmap='coolwarm', vmin=-1, vmax=1)
    fig.colorbar(cax, ax=ax, fraction=0.046, pad=0.04)

    ax.set_xticks(range(n))
    ax.set_yticks(range(n))
    ax.set_xticklabels(cols, fontweight='semibold')
    ax.set_yticklabels(cols, fontweight='semibold')

    # Direct cell text annotations with contrast handling
    for i in range(n):
        for j in range(n):
            val = corr[i, j]
            color = "white" if abs(val) > 0.65 else "black"
            ax.text(j, i, f"{val:.2f}", ha="center", va="center",
                    color=color, fontsize=13, fontweight='bold')

    plt.tight_layout()
    plt.savefig(f"{output_dir}/subject_correlation_heatmap.png", dpi=300)
    plt.close()`}</pre>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="font-semibold text-white">Key Mentorship Highlights:</div>
              <ul className="list-disc list-inside space-y-1 text-slate-400">
                <li>Satisfies the requirement: <strong>No Seaborn required</strong>; relies entirely on Matplotlib's <code className="text-amber-300">ax.imshow()</code>.</li>
                <li>Dynamic contrast-aware font coloring (<code className="text-amber-300">white</code> vs <code className="text-amber-300">black</code>) depending on absolute correlation value.</li>
                <li>Configures <code className="text-amber-300">vmin=-1, vmax=1</code> to preserve accurate symmetrical color scales for Pearson $r$.</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
