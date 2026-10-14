# Student Performance Data Analysis and Visualization

**QSkill Python Developer Internship Project**  
**Author:** Python Developer Intern  
**Domain:** Exploratory Data Analysis (EDA) & Data Visualization  

---

## 📌 Project Overview
This project is an end-to-end Python data analysis and visualization tool developed for the **QSkill Python Developer Internship**. It ingests student performance records from a CSV file, validates the data integrity, performs rigorous descriptive statistical analysis using **Pandas**, renders publication-grade visualizations using **Matplotlib**, and automatically synthesizes data-backed academic observations.

---

## 🚀 Key Functional Features
1. **Automated Data Ingestion**: Loads student performance records from `student_data.csv`.
2. **Structural Inspection**: Automatically displays shape, column names, data types, and initial records (`head()`).
3. **Data Quality & Hygiene Audit**: Scans for missing/null values and duplicate rows with automatic remediation.
4. **Descriptive Statistics**: Computes Mean, Median, Min, Max, and Standard Deviation for Math, Science, and English.
5. **Subject Average Comparison**: Computes subject-level averages and visualizes them using a customized Matplotlib Bar Chart.
6. **Correlation & Trend Analysis**: Generates a Scatter Plot with linear regression line ($y = mx + b$) showing Math vs. Science correlation.
7. **Pure Matplotlib Correlation Heatmap**: Computes Pearson correlation matrix and plots a color-coded heatmap with direct cell annotations without needing Seaborn.
8. **Dynamic Insight Engine**: Synthesizes real-time analytical observations based on calculated statistics (no hardcoded conclusions).
9. **Automated Asset Export**: Exports high-resolution PNG charts (`300 DPI`) directly into the `outputs/` folder.
10. **Robust Error Handling**: Safely manages missing files, corrupted columns, and data conversion anomalies.

---

## 📂 Project Architecture & Directory Structure
```text
student_performance_analysis/
│
├── student_data.csv          # Source student performance dataset
├── main.py                   # Main Python analysis and visualization script
├── requirements.txt          # Python dependencies (Pandas, Matplotlib, NumPy)
├── README.md                 # Complete documentation and setup guide
├── project_report.md         # Formal Internship Project Report
├── viva_questions.md         # Top Viva / Interview questions & answers
│
└── outputs/                  # Auto-generated visualization outputs
    ├── average_marks_bar_chart.png
    ├── math_science_scatter_plot.png
    └── subject_correlation_heatmap.png
```

---

## 🛠️ Technology Stack
- **Language**: Python 3.8+ (Compatible with Python 3.10 / 3.11 / 3.12)
- **Data Manipulation**: `pandas`
- **Data Visualization**: `matplotlib`
- **Numerical Computing**: `numpy`
- **IDE / Development Environment**: Visual Studio Code (VS Code) on Windows / macOS / Linux

---

## 💻 Step-by-Step Installation & Setup (VS Code on Windows)

### Step 1: Clone or Place Project Files in a Directory
Create a dedicated folder (e.g., `C:\Projects\StudentPerformanceAnalysis`) and verify that `main.py`, `student_data.csv`, and `requirements.txt` are present.

### Step 2: Open in VS Code
1. Launch **Visual Studio Code**.
2. Click **File** > **Open Folder...** and select the project directory.
3. Open the integrated terminal using ``Ctrl + ` `` (Backtick) or **Terminal** > **New Terminal**.

### Step 3: Create a Virtual Environment (Recommended)
In the VS Code terminal (PowerShell or Command Prompt), run:
```powershell
python -m venv venv
```

### Step 4: Activate the Virtual Environment
- **On Windows (PowerShell)**:
  ```powershell
  .\venv\Scripts\Activate.ps1
  ```
  *(Note: If you receive a script execution policy error, run `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` in PowerShell once).*

- **On Windows (Command Prompt - cmd)**:
  ```cmd
  venv\Scripts\activate.bat
  ```

- **On macOS / Linux**:
  ```bash
  source venv/bin/activate
  ```

### Step 5: Install Required Packages
```bash
pip install -r requirements.txt
```

Verify installation:
```bash
python -c "import pandas, matplotlib, numpy; print('All dependencies installed successfully!')"
```

---

## 🏃 Running the Application
Execute the primary script:
```bash
python main.py
```

---

## 📊 Expected Console Output
```text
======================================================================
 QSKILL INTERNSHIP: STUDENT PERFORMANCE DATA ANALYSIS
======================================================================
Starting automated end-to-end data processing pipeline...
[INFO] Created output directory: 'outputs/'

======================================================================
 STEP 1: LOADING DATASET
======================================================================
[SUCCESS] Dataset 'student_data.csv' successfully loaded.

======================================================================
 STEP 2: INSPECTING DATASET STRUCTURE
======================================================================
Total Rows (Records):    35
Total Columns (Fields):  8

Column Names (8):
  1. Student_ID (dtype: object)
  2. Name (dtype: object)
  3. Gender (dtype: object)
  4. Math (dtype: int64)
  5. Science (dtype: int64)
  6. English (dtype: int64)
  7. Study_Hours (dtype: int64)
  8. Attendance_Percentage (dtype: int64)

First 5 Records (df.head()):
Student_ID         Name Gender  Math  Science  English  Study_Hours  Attendance_Percentage
    STU001 Aarav Sharma   Male    78       82       75           14                     92
    STU002   Diya Patel Female    92       95       88           20                     96
    STU003  Rohan Verma   Male    65       70       62           10                     85
    STU004 Ananya Gupta Female    85       88       91           16                     94
    STU005 Vikram Singh   Male    55       58       60            8                     78

======================================================================
 STEP 3: DATA QUALITY CHECK & CLEANING
======================================================================
Missing Values per Column:
  - Student_ID               : OK
  - Name                     : OK
  - Gender                   : OK
  - Math                     : OK
  - Science                  : OK
  - English                  : OK
  - Study_Hours              : OK
  - Attendance_Percentage    : OK

[VERIFIED] No missing values found in the dataset.
Duplicate Records Found: 0
[VERIFIED] All rows are unique. No duplicates detected.

======================================================================
 STEP 4: STATISTICAL ANALYSIS
======================================================================
Subject   Mean  Median   Min   Max  Std Dev
   Math  77.29    79.0  48.0  96.0    14.07
Science  80.20    82.0  52.0  98.0    13.06
English  78.34    79.0  55.0  96.0    12.18

Average Marks Breakdown:
  - Average Math       Marks: 77.29
  - Average Science    Marks: 80.20
  - Average English    Marks: 78.34

======================================================================
 STEP 6: GENERATING & SAVING VISUALIZATIONS
======================================================================
[SAVED] Bar chart saved to: outputs/average_marks_bar_chart.png
[SAVED] Scatter plot saved to: outputs/math_science_scatter_plot.png
[SAVED] Heatmap saved to: outputs/subject_correlation_heatmap.png

======================================================================
 STEP 5: DYNAMIC DATA-DRIVEN INSIGHTS
======================================================================
1. Top Academic Domain: Students demonstrated highest overall proficiency in Science with an average of 80.20/100, outperforming Math (77.29/100) by a margin of 2.91 points.

2. Score Distribution & Consistency: English exhibited the lowest standard deviation (std = 12.18), indicating the most homogeneous student comprehension. In contrast, Math had the widest spread (std = 14.07), highlighting greater performance disparity.

3. STEM Inter-Subject Synergy: A strong positive linear correlation (r = 0.98) was observed between Math and Science marks. This quantitatively indicates that analytical skills developed in Mathematics strongly reinforce conceptual success in Scientific disciplines.

4. Cross-Curricular Transfer: English correlation with STEM subjects averaged r = 0.88 (Math: 0.86, Science: 0.90), demonstrating healthy holistic cognitive development across both verbal and quantitative tracks.

5. Effort vs. Outcome Correlation: Weekly study hours positively correlate with performance (r = 0.97 with Math), verifying that structured study habits directly translate to academic achievement.

======================================================================
 PROJECT EXECUTION COMPLETE
======================================================================
```

---

## 📈 Visualizations Generated
1. **Average Marks Bar Chart (`average_marks_bar_chart.png`)**:
   - Compares Math, Science, and English mean marks.
   - Distinct color-coded bars with exact floating-point data labels.
2. **Math vs. Science Scatter Plot (`math_science_scatter_plot.png`)**:
   - Plots individual student performances.
   - Includes linear regression fitline and calculated correlation coefficient $r$.
3. **Subject Correlation Heatmap (`subject_correlation_heatmap.png`)**:
   - Built with pure `matplotlib.pyplot.imshow` (zero Seaborn dependency).
   - Features a colorbar, dual-axis subject labels, and contrast-aware text overlays.

---

## 🛡️ Error Handling Strategies
- **Missing File Protection**: Verifies `os.path.exists()` before calling `pd.read_csv()` to prevent unhandled crashes.
- **Type Coercion**: Automatically casts subject columns with `pd.to_numeric(..., errors='coerce')`.
- **Directory Safety**: Automatically invokes `os.makedirs(..., exist_ok=True)` for output storage.
- **Missing Value Imputation**: Dynamically replaces null values with column medians if detected.

---

## 📜 Internship Deliverables Checklist
- [x] Complete source code (`main.py`)
- [x] Sample CSV dataset (`student_data.csv`)
- [x] Three Matplotlib charts saved to `outputs/`
- [x] Empirical descriptive statistics computed
- [x] Automatically generated dynamic observations
- [x] Comprehensive documentation (`README.md`)
- [x] Dependency specification (`requirements.txt`)
- [x] Formal Internship Project Report (`project_report.md`)
- [x] Viva & Technical Interview Q&A (`viva_questions.md`)
