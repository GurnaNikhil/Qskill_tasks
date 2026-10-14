# QSkill Python Developer Internship
## Viva & Technical Interview Preparation Guide

This guide contains the most critical viva and interview questions related to the **Student Performance Data Analysis and Visualization Project**, covering Pandas, Matplotlib, exploratory data analysis, and Python fundamentals.

---

### Question 1: What is the difference between a Pandas Series and a Pandas DataFrame? How did you use both in this project?
**Answer:**
- **Pandas Series:** A 1-dimensional labeled array capable of holding any data type (integers, strings, floats, Python objects). It represents a single column or single row of data.
- **Pandas DataFrame:** A 2-dimensional size-mutable, potentially heterogeneous tabular data structure with labeled axes (rows and columns). It is essentially a dictionary of Series sharing the same index.
- **Project Application:**
  - In our project, the loaded dataset `df = pd.read_csv('student_data.csv')` is a **DataFrame**.
  - When extracting individual subject marks for statistical calculations—such as `df['Math']` or computing `df['Math'].mean()`—we are working with a **Series**.

---

### Question 2: How did you implement a correlation heatmap using pure Matplotlib without relying on Seaborn?
**Answer:**
- Seaborn's `heatmap()` is built on top of Matplotlib, but Seaborn is an external wrapper. In our project, we achieved a native, dependency-free heatmap using Matplotlib directly:
  1. We computed the Pearson correlation matrix via Pandas: `corr_matrix = df[['Math', 'Science', 'English']].corr()`.
  2. We rendered the matrix color image using `ax.imshow(corr_matrix.values, cmap='coolwarm', vmin=-1, vmax=1)`.
  3. We added a color scale indicator using `fig.colorbar(cax)`.
  4. We configured axis ticks and labels with `ax.set_xticks()`, `ax.set_yticks()`, and `ax.set_xticklabels()`.
  5. Finally, we iterated through each cell using nested loops (`for i in range(n): for j in range(n):`) and placed the numerical text value inside each cell using `ax.text(j, i, f"{val:.2f}", ha='center', va='center')`, setting contrasting text color (white on dark backgrounds, black on light backgrounds) for readability.

---

### Question 3: Why is it important to calculate both Mean and Median? What does it indicate if the Mean is significantly different from the Median?
**Answer:**
- **Mean (Arithmetic Average):** Sum of all values divided by the total number of observations. It takes every data point into account but is highly sensitive to extreme values (outliers) and skewed distributions.
- **Median (50th Percentile):** The middle value when the data is sorted. It is robust and resistant to outliers.
- **Significance of Difference:**
  - If $\text{Mean} \approx \text{Median}$, the distribution is roughly symmetrical (normal bell curve).
  - If $\text{Mean} > \text{Median}$, the distribution is **positively skewed** (right-skewed), pulled up by high-performing outliers.
  - If $\text{Mean} < \text{Median}$, the distribution is **negatively skewed** (left-skewed), dragged down by low scores.
  - In our student dataset, Math had a Mean of 77.29 and Median of 79.00, demonstrating a slight left skew due to a few students scoring below 60.

---

### Question 4: What is the Pearson Correlation Coefficient ($r$), and what does an $r$ value of 0.98 between Math and Science signify?
**Answer:**
- The **Pearson Correlation Coefficient ($r$)** measures the strength and direction of a linear relationship between two continuous variables on a scale from $-1.0$ to $+1.0$:
  - $+1.0$: Perfect positive linear correlation.
  - $0.0$: No linear correlation.
  - $-1.0$: Perfect negative linear correlation.
- **Significance in the Project:**
  - Our calculated correlation between Math and Science was $r = 0.98$.
  - This indicates an **extremely strong positive linear relationship**: students who score high in Mathematics consistently score high in Science as well.
  - In academic context, it suggests that quantitative problem-solving and analytical reasoning skills are foundational across both STEM disciplines.

---

### Question 5: What defensive programming practices and error handling techniques did you incorporate into `main.py`?
**Answer:**
1. **File Existence Validation**: We used `os.path.exists(file_path)` before attempting to read the CSV file. If missing, the program catches this gracefully and prints a descriptive error message instead of throwing an unhandled `FileNotFoundError`.
2. **Empty / Corrupt File Handling**: We wrapped `pd.read_csv()` in try-except blocks catching `pd.errors.EmptyDataError` and `pd.errors.ParserError`.
3. **Schema & Column Verification**: We validated that required subject columns (`Math`, `Science`, `English`) actually exist in `df.columns` before attempting calculations.
4. **Data Type Coercion**: We applied `pd.to_numeric(df[col], errors='coerce')` to gracefully convert string or corrupted numeric data.
5. **Dynamic Directory Management**: We utilized `os.makedirs(output_dir, exist_ok=True)` so that the script runs seamlessly on any fresh machine without requiring manual folder creation.
6. **Data Quality Audit**: We audited null counts (`df.isnull().sum()`) and duplicate rows (`df.duplicated().sum()`), with automatic remediation routines.

---

### Bonus Question: Why did you use `plt.tight_layout()` and `plt.close()` in your visualization pipeline?
**Answer:**
- `plt.tight_layout()` automatically adjusts subplot parameters and padding so that titles, axis labels, tick labels, and legends do not overlap or get clipped at the edges of the saved figure.
- `plt.close()` explicitly closes the figure window and deallocates memory. In automated batch data pipelines, failing to call `plt.close()` causes Matplotlib to keep figure instances in memory, triggering warnings and consuming excessive RAM.
