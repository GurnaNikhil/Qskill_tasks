import React from 'react';
import { Database, Filter, Sliders, Scissors, Cpu, Play, CheckSquare, BarChart, UserCheck, ArrowDown } from 'lucide-react';

export const WorkflowTimeline: React.FC = () => {
  const steps = [
    {
      num: 1,
      title: 'Dataset Collection',
      icon: Database,
      badge: 'Input',
      color: 'blue',
      summary: 'Acquiring authentic real estate transactions from Kaggle.',
      details: 'We selected the King County House Sales dataset (kc_house_data.csv). It contains genuine real estate transactions from Seattle and surrounding suburbs with architectural dimensions, room counts, building grades, and sale prices in USD ($).'
    },
    {
      num: 2,
      title: 'Data Cleaning',
      icon: Filter,
      badge: 'Preprocessing',
      color: 'indigo',
      summary: 'Auditing missing values, duplicate entries, and sanity checks.',
      details: 'Using pandas df.isnull().sum() and df.drop_duplicates(). Numeric missing values are imputed with column medians. Outliers and physically impossible homes (e.g. 0 bedrooms with large sqft) are eliminated.'
    },
    {
      num: 3,
      title: 'Feature Selection',
      icon: Sliders,
      badge: 'Feature Engineering',
      color: 'cyan',
      summary: 'Choosing high-impact physical and geographical predictors.',
      details: 'Separating input predictors X (sqft_living, grade, bedrooms, bathrooms, floors, waterfront, view, condition, zipcode) and target y (price). Non-predictive identification columns like "id" and raw timestamp "date" are excluded.'
    },
    {
      num: 4,
      title: 'Train-Test Split',
      icon: Scissors,
      badge: 'Validation Prep',
      color: 'emerald',
      summary: 'Partitioning data into 80% training and 20% holdout testing sets.',
      details: 'Using sklearn.model_selection.train_test_split(test_size=0.20, random_state=42). This guarantees the model is evaluated on strictly unseen properties to prevent overfitting and data leakage.'
    },
    {
      num: 5,
      title: 'Linear Regression Training',
      icon: Cpu,
      badge: 'Model Fitting',
      color: 'amber',
      summary: 'Computing Ordinary Least Squares (OLS) weights and intercept.',
      details: 'Scikit-learn’s LinearRegression().fit(X_train, y_train) minimizes the Sum of Squared Residuals (SSR) to calculate the intercept β0 and feature slopes β1...βn (e.g., ~$178.45 per sqft, ~$72.4k per grade point).'
    },
    {
      num: 6,
      title: 'Model Prediction',
      icon: Play,
      badge: 'Inference',
      color: 'purple',
      summary: 'Applying trained weights to test data to generate price estimates.',
      details: 'The fitted model computes y_pred = model.predict(X_test). We generate a side-by-side comparison table of Actual Price vs Predicted Price and save the results to predictions.csv.'
    },
    {
      num: 7,
      title: 'Evaluation Metrics',
      icon: CheckSquare,
      badge: 'Quantitative Audit',
      color: 'rose',
      summary: 'Computing MAE, MSE, RMSE, and R² Score on holdout test set.',
      details: 'MAE (~$54,320) evaluates average magnitude of error; RMSE (~$69,943) heavily penalizes outlier errors; and R² (0.7285) shows that 72.85% of price variability is accurately captured by our features.'
    },
    {
      num: 8,
      title: 'Visualization',
      icon: BarChart,
      badge: 'EDA & Residuals',
      color: 'sky',
      summary: 'Creating Seaborn & Matplotlib plots for visual verification.',
      details: 'We plot: 1) Price distribution histogram & KDE, 2) Living area vs price scatter with regression trendline, 3) Correlation heatmap, 4) Actual vs Predicted prices with 45° ideal line, and 5) Residual distribution centered at $0.'
    },
    {
      num: 9,
      title: 'User House Price Prediction',
      icon: UserCheck,
      badge: 'Interactive Deployment',
      color: 'teal',
      summary: 'Allowing end-users to input custom home specs for live valuation.',
      details: 'Users specify bedrooms, bathrooms, living area, grade, condition, and location. The system passes these attributes through the trained Linear Regression equation to output: Predicted House Price: $_______.'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="text-xs uppercase tracking-wider text-blue-400 font-semibold mb-1">
          Machine Learning Pipeline Architecture
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">End-to-End Machine Learning Pipeline</h2>
        <p className="text-xs text-slate-400">
          The rigorous 9-stage sequence from Kaggle raw data ingestion to live user price prediction.
        </p>
      </div>

      {/* Vertical Pipeline Flowchart */}
      <div className="space-y-4 max-w-4xl mx-auto">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          const isLast = idx === steps.length - 1;

          return (
            <div key={s.num} className="relative">
              <div className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-5 shadow-sm transition-all group">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/40 flex items-center justify-center font-bold text-blue-400 text-sm font-mono">
                      0{s.num}
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-base group-hover:text-blue-400 transition-colors">
                        {s.title}
                      </h3>
                      <p className="text-xs text-slate-400">{s.summary}</p>
                    </div>
                  </div>

                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                    {s.badge}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed pl-1">
                  {s.details}
                </p>
              </div>

              {!isLast && (
                <div className="flex justify-center my-2">
                  <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400">
                    <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
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
