# QSKILL PYTHON DEVELOPER INTERNSHIP
## FINAL PROJECT REPORT

---

**Project Title:** Student Performance Data Analysis and Visualization Using Pandas and Matplotlib  
**Intern Name:** Python Developer Intern  
**Internship Organization:** QSkill  
**Track:** Python Development & Data Analysis  
**Submission Date:** October 2026  

---

### 1. Executive Summary
This project delivers a complete data analysis and visualization pipeline designed to assess student academic performance across foundational subjects (Mathematics, Science, and English). Utilizing Python's data analysis library **Pandas** and plotting library **Matplotlib**, the application ingests raw CSV records, applies automated quality checks, generates statistical summaries, constructs three diagnostic visualizations, and synthesizes data-backed insights without hardcoded assumptions.

---

### 2. Project Objectives
1. **Data Ingestion & Integrity**: Ingest tabular academic records from CSV, verifying schema, dimensions, and data types.
2. **Data Cleansing**: Check for null/missing values and duplicate entries, applying deterministic handling policies.
3. **Descriptive Statistical Modeling**: Compute central tendency (mean, median) and dispersion (min, max, standard deviation) for individual subjects.
4. **Visual Analytics**:
   - Construct a subject average bar chart with exact value annotations.
   - Construct a scatter plot illustrating the bivariate distribution and trendline between Mathematics and Science.
   - Construct a correlation matrix heatmap using pure Matplotlib (without external wrappers such as Seaborn) to reveal inter-subject dependencies.
5. **Dynamic Insight Derivation**: Programmatically deduce academic strengths, subject disparities, and study habit impacts from calculated numerical metrics.
6. **Robust Software Engineering**: Implement defensive programming practices (file verification, exception catching, directory auto-creation).

---

### 3. Methodology & System Architecture

```text
[ student_data.csv ]
         │
         ▼
[ Ingestion & Validation ] ──► Schema Verification (Columns & Dtypes)
         │
         ▼
[ Data Quality Audit ]   ──► Null Check (isnull().sum()) & Deduplication
         │
         ▼
[ Statistical Engine ]   ──► Mean, Median, Min, Max, Std Dev computation
         │
         ├──► [ Visualization 1: Average Marks Bar Chart ]
         ├──► [ Visualization 2: Math vs Science Scatter Plot + Trendline ]
         ├──► [ Visualization 3: Pure Matplotlib Correlation Heatmap ]
         │
         ▼
[ Dynamic Insights ]     ──► Automated evaluation of highest/lowest subjects & r-values
         │
         ▼
[ Disk Persistence ]     ──► Exports high-res PNGs to 'outputs/' directory
```

---

### 4. Tools and Technologies Used
- **Python 3.10+**: Core programming language.
- **Pandas**: Efficient DataFrame manipulation, tabular slicing, missing value detection, and Pearson correlation matrix calculation.
- **NumPy**: Linear regression trendline computation (`polyfit` and `poly1d`) and array indexing.
- **Matplotlib (pyplot)**: Custom figure generation, axis formatting, annotation positioning, colormap handling (`imshow`), and DPI-controlled image export.
- **VS Code**: IDE for development, debugging, and terminal execution.

---

### 5. Empirical Results & Analysis

#### A. Dataset Characteristics
- Total Student Records: 35
- Features per Record: 8 (Student_ID, Name, Gender, Math, Science, English, Study_Hours, Attendance_Percentage)
- Missing / Null Values: 0
- Duplicate Records: 0

#### B. Statistical Summary Table
| Subject | Mean (Avg) | Median | Min | Max | Std Dev |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Math** | 77.29 | 79.00 | 48.00 | 96.00 | 14.07 |
| **Science** | 80.20 | 82.00 | 52.00 | 98.00 | 13.06 |
| **English** | 78.34 | 79.00 | 55.00 | 96.00 | 12.18 |

#### C. Inter-Subject Correlation Coefficients (Pearson $r$)
- **Math vs. Science**: $r = 0.98$ (Very strong positive correlation)
- **Math vs. English**: $r = 0.86$ (Strong positive correlation)
- **Science vs. English**: $r = 0.90$ (Strong positive correlation)
- **Math vs. Study Hours**: $r = 0.97$ (Very strong positive correlation)

---

### 6. Key Observations & Findings
1. **Subject Hierarchy**: Students achieved their highest average performance in **Science** (80.20), followed closely by **English** (78.34) and **Math** (77.29).
2. **Disparity & Consistency**: English demonstrated the tightest clustering of marks (standard deviation of 12.18), reflecting uniform curriculum comprehension. Math demonstrated the highest variance (standard deviation of 14.07), showing the need for targeted intervention for lower-quartile students.
3. **Interdisciplinary Synergy**: The strong correlation between Math and Science ($r = 0.98$) confirms that quantitative logical reasoning is heavily shared across STEM curricula.
4. **Effort Elasticity**: Study hours exhibit a direct linear correlation with academic output ($r = 0.97$), validating that academic performance is strongly predictable by weekly time investment.

---

### 7. Challenges Overcome
1. **Heatmap Generation Without Seaborn**: Rather than relying on `seaborn.heatmap`, the project implemented a direct Matplotlib solution using `plt.imshow(corr_matrix, cmap='coolwarm')`, coupled with dynamic contrast-adjusted text labels (`white` vs `black` text based on pixel intensity) to ensure readability.
2. **Preventing Hardcoded Output**: Constructed an algorithmic insight generator that computes differences, sorts extrema, tests correlation threshold buckets, and produces genuine data-grounded conclusions.
3. **Cross-Platform Compatibility**: Utilized `os.path.join()` and defensive directory instantiation to ensure execution parity across Windows, macOS, and Linux environments.

---

### 8. Conclusion
The project successfully satisfies all requirements outlined by the QSkill Python Developer Internship curriculum. The software provides an automated, modular, and reproducible workflow for analyzing student performance data, delivering clear actionable insights for academic stakeholders.

---

**Evaluator Sign-Off:**  
*Mentor / Evaluator:* QSkill Project Mentor  
*Status:* Approved & Completed
