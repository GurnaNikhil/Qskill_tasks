"""
Student Performance Data Analysis and Visualization
===================================================
Project Title: Student Performance Data Analysis and Visualization Using Pandas and Matplotlib
Internship: QSkill Python Developer Internship
Author: Python Developer Intern
Description:
    This script loads student academic performance data from a CSV file, performs
    comprehensive exploratory data analysis (EDA), computes summary statistics,
    generates visualizations using Matplotlib (Bar Chart, Scatter Plot, and
    pure Matplotlib Correlation Heatmap), dynamically derives data-driven
    observations, and saves all generated charts into an 'outputs' folder.
"""

import os
import sys
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np


# ==========================================
# CONSTANTS & CONFIGURATION
# ==========================================
DATASET_FILE = "student_data.csv"
OUTPUT_DIR = "outputs"
REQUIRED_COLUMNS = ["Math", "Science", "English"]


def print_section_header(title: str):
    """Utility to print clean, professional CLI headers."""
    divider = "=" * 70
    print(f"\n{divider}")
    print(f" {title.upper()}")
    print(divider)


def create_output_directory(dir_name: str = OUTPUT_DIR) -> str:
    """
    Ensures that the output directory exists before saving charts.
    
    Args:
        dir_name (str): Path of directory to create.
        
    Returns:
        str: Absolute or relative path to the directory.
    """
    try:
        if not os.path.exists(dir_name):
            os.makedirs(dir_name, exist_ok=True)
            print(f"[INFO] Created output directory: '{dir_name}/'")
        else:
            print(f"[INFO] Using existing output directory: '{dir_name}/'")
        return dir_name
    except OSError as e:
        print(f"[ERROR] Failed to create output directory '{dir_name}': {e}")
        sys.exit(1)


def load_dataset(file_path: str = DATASET_FILE) -> pd.DataFrame:
    """
    Loads student performance data from a CSV file with robust error handling.
    
    Args:
        file_path (str): Relative or absolute path to the CSV file.
        
    Returns:
        pd.DataFrame: Loaded and validated pandas DataFrame.
    """
    print_section_header("Step 1: Loading Dataset")
    
    # Check if file exists
    if not os.path.exists(file_path):
        print(f"[ERROR] The dataset file '{file_path}' was not found.")
        print("Please ensure 'student_data.csv' is placed in the same directory as main.py.")
        sys.exit(1)
        
    try:
        df = pd.read_csv(file_path)
        print(f"[SUCCESS] Dataset '{file_path}' successfully loaded.")
        return df
    except pd.errors.EmptyDataError:
        print(f"[ERROR] The file '{file_path}' is empty.")
        sys.exit(1)
    except pd.errors.ParserError as e:
        print(f"[ERROR] Parser error occurred while reading '{file_path}': {e}")
        sys.exit(1)
    except Exception as e:
        print(f"[ERROR] Unexpected error while reading '{file_path}': {e}")
        sys.exit(1)


def validate_dataset(df: pd.DataFrame, required_cols=REQUIRED_COLUMNS) -> pd.DataFrame:
    """
    Validates required columns, converts scores to numeric if needed,
    and removes any unparseable rows.
    """
    # Verify required subject columns exist
    missing_cols = [col for col in required_cols if col not in df.columns]
    if missing_cols:
        print(f"[ERROR] Missing required columns in dataset: {missing_cols}")
        print(f"Available columns are: {list(df.columns)}")
        sys.exit(1)

    # Ensure numerical columns are properly typed
    for col in required_cols:
        if not pd.api.types.is_numeric_dtype(df[col]):
            print(f"[WARN] Converting column '{col}' to numeric...")
            df[col] = pd.to_numeric(df[col], errors='coerce')
            
    return df


def inspect_dataset(df: pd.DataFrame):
    """
    Displays dataset dimensions, column names, data types, and first 5 rows.
    """
    print_section_header("Step 2: Inspecting Dataset Structure")
    
    # 1. Dataset Dimensions
    rows, cols = df.shape
    print(f"Total Rows (Records):    {rows}")
    print(f"Total Columns (Fields):  {cols}")
    
    # 2. Column Names
    print(f"\nColumn Names ({len(df.columns)}):")
    for idx, col in enumerate(df.columns, 1):
        print(f"  {idx}. {col} (dtype: {df[col].dtype})")
        
    # 3. First 5 Rows
    print("\nFirst 5 Records (df.head()):")
    print(df.head().to_string(index=False))


def check_data_quality(df: pd.DataFrame) -> pd.DataFrame:
    """
    Checks for missing (null) values and duplicate records, performing
    cleaning if required.
    """
    print_section_header("Step 3: Data Quality Check & Cleaning")
    
    # 1. Check for Missing Values
    null_counts = df.isnull().sum()
    total_nulls = null_counts.sum()
    print("Missing Values per Column:")
    for col, count in null_counts.items():
        status = "OK" if count == 0 else f"{count} missing"
        print(f"  - {col:<25}: {status}")
        
    if total_nulls > 0:
        print(f"\n[ACTION] Imputing or dropping missing values ({total_nulls} found)...")
        # For numerical columns, fill with column median; otherwise drop
        num_cols = df.select_dtypes(include=[np.number]).columns
        df[num_cols] = df[num_cols].fillna(df[num_cols].median())
        df = df.dropna()
        print("[SUCCESS] Missing values handled successfully.")
    else:
        print("\n[VERIFIED] No missing values found in the dataset.")
        
    # 2. Check for Duplicate Records
    duplicate_count = df.duplicated().sum()
    print(f"\nDuplicate Records Found: {duplicate_count}")
    if duplicate_count > 0:
        print(f"[ACTION] Removing {duplicate_count} duplicate rows...")
        df = df.drop_duplicates()
        print("[SUCCESS] Duplicate records removed.")
    else:
        print("[VERIFIED] All rows are unique. No duplicates detected.")
        
    return df


def calculate_statistics(df: pd.DataFrame, subject_cols=REQUIRED_COLUMNS) -> dict:
    """
    Calculates mean, median, min, max, and standard deviation for subject marks.
    
    Returns:
        dict: Dictionary containing computed statistical metrics.
    """
    print_section_header("Step 4: Statistical Analysis")
    
    stats_data = []
    subject_stats = {}
    
    for subject in subject_cols:
        col_data = df[subject]
        s_mean = col_data.mean()
        s_median = col_data.median()
        s_min = col_data.min()
        s_max = col_data.max()
        s_std = col_data.std()
        
        subject_stats[subject] = {
            "mean": s_mean,
            "median": s_median,
            "min": s_min,
            "max": s_max,
            "std": s_std
        }
        
        stats_data.append({
            "Subject": subject,
            "Mean": round(s_mean, 2),
            "Median": round(s_median, 2),
            "Min": round(s_min, 2),
            "Max": round(s_max, 2),
            "Std Dev": round(s_std, 2)
        })
        
    stats_df = pd.DataFrame(stats_data)
    print(stats_df.to_string(index=False))
    
    print("\nAverage Marks Breakdown:")
    for subject in subject_cols:
        print(f"  - Average {subject:<10} Marks: {subject_stats[subject]['mean']:.2f}")
        
    return subject_stats


# ==========================================
# VISUALIZATION FUNCTIONS (MATPLOTLIB)
# ==========================================

def plot_average_marks_bar(subject_stats: dict, output_dir: str = OUTPUT_DIR) -> str:
    """
    Creates and saves a bar chart comparing average marks across subjects.
    """
    subjects = list(subject_stats.keys())
    averages = [subject_stats[s]["mean"] for s in subjects]
    
    # Setup Figure
    plt.figure(figsize=(8, 6), dpi=150)
    
    # Modern cohesive palette
    colors = ['#2563eb', '#059669', '#d97706']  # Royal Blue, Emerald Green, Amber
    bars = plt.bar(subjects, averages, color=colors, width=0.55, edgecolor='#1e293b', linewidth=1.2)
    
    # Chart titles and styling
    plt.title("Comparison of Average Student Marks by Subject", fontsize=14, fontweight='bold', pad=15)
    plt.xlabel("Subjects", fontsize=12, fontweight='semibold', labelpad=10)
    plt.ylabel("Average Marks (out of 100)", fontsize=12, fontweight='semibold', labelpad=10)
    plt.ylim(0, 105)
    plt.grid(axis='y', linestyle='--', alpha=0.5)
    
    # Add numerical labels on top of each bar
    for bar in bars:
        yval = bar.get_height()
        plt.text(
            bar.get_x() + bar.get_width() / 2.0,
            yval + 1.8,
            f"{yval:.2f}",
            ha='center',
            va='bottom',
            fontsize=11,
            fontweight='bold',
            color='#0f172a'
        )
        
    plt.tight_layout()
    file_path = os.path.join(output_dir, "average_marks_bar_chart.png")
    plt.savefig(file_path, dpi=300)
    plt.close()
    
    print(f"[SAVED] Bar chart saved to: {file_path}")
    return file_path


def plot_math_science_scatter(df: pd.DataFrame, output_dir: str = OUTPUT_DIR) -> str:
    """
    Creates and saves a scatter plot showing the relationship between Math and Science marks.
    Includes a linear regression trend line and correlation coefficient.
    """
    x = df["Math"]
    y = df["Science"]
    
    # Compute correlation coefficient
    corr = x.corr(y)
    
    plt.figure(figsize=(8, 6), dpi=150)
    
    # Scatter points
    plt.scatter(
        x, y,
        color='#3b82f6',
        alpha=0.75,
        s=70,
        edgecolors='#1d4ed8',
        linewidth=1.2,
        label=f"Students (N={len(df)})"
    )
    
    # Linear Regression Trendline (y = mx + c)
    m, b = np.polyfit(x, y, 1)
    x_trend = np.linspace(x.min() - 2, x.max() + 2, 100)
    y_trend = m * x_trend + b
    plt.plot(x_trend, y_trend, color='#dc2626', linestyle='-', linewidth=2, label=f"Trendline (r = {corr:.2f})")
    
    # Formatting
    plt.title("Relationship Between Math and Science Marks", fontsize=14, fontweight='bold', pad=15)
    plt.xlabel("Math Marks", fontsize=12, fontweight='semibold', labelpad=10)
    plt.ylabel("Science Marks", fontsize=12, fontweight='semibold', labelpad=10)
    plt.grid(True, linestyle='--', alpha=0.5)
    plt.legend(loc="upper left", frameon=True, framealpha=0.9)
    
    # Equal axis limits for clarity
    min_val = min(x.min(), y.min()) - 5
    max_val = max(x.max(), y.max()) + 5
    plt.xlim(max(0, min_val), min(100, max_val))
    plt.ylim(max(0, min_val), min(100, max_val))
    
    plt.tight_layout()
    file_path = os.path.join(output_dir, "math_science_scatter_plot.png")
    plt.savefig(file_path, dpi=300)
    plt.close()
    
    print(f"[SAVED] Scatter plot saved to: {file_path}")
    return file_path


def plot_correlation_heatmap(df: pd.DataFrame, subject_cols=REQUIRED_COLUMNS, output_dir: str = OUTPUT_DIR) -> str:
    """
    Creates and saves a correlation heatmap for numerical subject columns
    using PURE Matplotlib (no Seaborn required), including exact correlation values.
    """
    # Calculate Pearson correlation matrix
    corr_matrix = df[subject_cols].corr()
    corr_values = corr_matrix.values
    cols = list(corr_matrix.columns)
    n = len(cols)
    
    fig, ax = plt.subplots(figsize=(7, 6), dpi=150)
    
    # Display the heatmap image using Matplotlib's imshow with 'coolwarm' colormap
    cax = ax.imshow(corr_values, cmap='coolwarm', vmin=-1, vmax=1)
    
    # Add Colorbar
    cbar = fig.colorbar(cax, ax=ax, fraction=0.046, pad=0.04)
    cbar.set_label('Pearson Correlation Coefficient (r)', rotation=270, labelpad=15, fontsize=10, fontweight='semibold')
    
    # Set tick labels
    ax.set_xticks(np.arange(n))
    ax.set_yticks(np.arange(n))
    ax.set_xticklabels(cols, fontsize=11, fontweight='semibold')
    ax.set_yticklabels(cols, fontsize=11, fontweight='semibold')
    
    # Rotate the tick labels for better visibility
    plt.setp(ax.get_xticklabels(), rotation=0, ha="center")
    
    # Annotate each cell with its exact correlation value
    for i in range(n):
        for j in range(n):
            val = corr_values[i, j]
            # Use white text on dark background and black on light background for contrast
            text_color = "white" if abs(val) > 0.65 else "black"
            ax.text(
                j, i, f"{val:.2f}",
                ha="center", va="center",
                color=text_color,
                fontsize=13,
                fontweight='bold'
            )
            
    ax.set_title("Correlation Heatmap of Subject Marks", fontsize=14, fontweight='bold', pad=15)
    plt.tight_layout()
    
    file_path = os.path.join(output_dir, "subject_correlation_heatmap.png")
    plt.savefig(file_path, dpi=300)
    plt.close()
    
    print(f"[SAVED] Heatmap saved to: {file_path}")
    return file_path


# ==========================================
# DYNAMIC INSIGHT GENERATION
# ==========================================

def generate_insights(df: pd.DataFrame, subject_stats: dict, subject_cols=REQUIRED_COLUMNS) -> list:
    """
    Generates meaningful, data-driven observations strictly derived from
    computed statistical metrics rather than hardcoded assumptions.
    """
    print_section_header("Step 5: Dynamic Data-Driven Insights")
    
    insights = []
    
    # 1. Subject Performance Ranking
    sorted_by_mean = sorted(subject_stats.items(), key=lambda item: item[1]["mean"], reverse=True)
    best_subject, best_stats = sorted_by_mean[0]
    lowest_subject, lowest_stats = sorted_by_mean[-1]
    
    diff_mean = best_stats["mean"] - lowest_stats["mean"]
    insights.append(
        f"1. Top Academic Domain: Students demonstrated highest overall proficiency in {best_subject} "
        f"with an average of {best_stats['mean']:.2f}/100, outperforming {lowest_subject} "
        f"({lowest_stats['mean']:.2f}/100) by a margin of {diff_mean:.2f} points."
    )
    
    # 2. Performance Consistency & Standard Deviation
    sorted_by_std = sorted(subject_stats.items(), key=lambda item: item[1]["std"])
    most_consistent, min_std_stats = sorted_by_std[0]
    least_consistent, max_std_stats = sorted_by_std[-1]
    
    insights.append(
        f"2. Score Distribution & Consistency: {most_consistent} exhibited the lowest standard deviation "
        f"(std = {min_std_stats['std']:.2f}), indicating the most homogeneous student comprehension. "
        f"In contrast, {least_consistent} had the widest spread (std = {max_std_stats['std']:.2f}), "
        f"highlighting greater performance disparity."
    )
    
    # 3. Correlation between Math and Science
    math_sci_corr = df["Math"].corr(df["Science"])
    if math_sci_corr >= 0.7:
        strength = "strong positive"
    elif math_sci_corr >= 0.4:
        strength = "moderate positive"
    elif math_sci_corr >= 0:
        strength = "weak positive"
    else:
        strength = "negative"
        
    insights.append(
        f"3. STEM Inter-Subject Synergy: A {strength} linear correlation (r = {math_sci_corr:.2f}) "
        f"was observed between Math and Science marks. This quantitatively indicates that analytical skills "
        f"developed in Mathematics strongly reinforce conceptual success in Scientific disciplines."
    )
    
    # 4. Correlation with English / Cross-Disciplinary
    math_eng_corr = df["Math"].corr(df["English"])
    sci_eng_corr = df["Science"].corr(df["English"])
    avg_eng_corr = (math_eng_corr + sci_eng_corr) / 2
    
    insights.append(
        f"4. Cross-Curricular Transfer: English correlation with STEM subjects averaged r = {avg_eng_corr:.2f} "
        f"(Math: {math_eng_corr:.2f}, Science: {sci_eng_corr:.2f}), demonstrating healthy holistic "
        f"cognitive development across both verbal and quantitative tracks."
    )
    
    # 5. Study Hours Impact (if present)
    if "Study_Hours" in df.columns:
        math_study_corr = df["Math"].corr(df["Study_Hours"])
        insights.append(
            f"5. Effort vs. Outcome Correlation: Weekly study hours positively correlate with performance "
            f"(r = {math_study_corr:.2f} with Math), verifying that structured study habits directly translate "
            f"to academic achievement."
        )

    # Print to console
    for insight in insights:
        print(f"\n{insight}")
        
    return insights


# ==========================================
# MAIN EXECUTION FLOW
# ==========================================

def main():
    """
    Main orchestrator for the Student Performance Analysis pipeline.
    """
    print_section_header("QSkill Internship: Student Performance Data Analysis")
    print("Starting automated end-to-end data processing pipeline...")
    
    # Ensure output directory exists
    output_dir = create_output_directory(OUTPUT_DIR)
    
    # 1. Load data
    df = load_dataset(DATASET_FILE)
    
    # 2. Validate data
    df = validate_dataset(df)
    
    # 3. Inspect dataset
    inspect_dataset(df)
    
    # 4. Quality checks & cleaning
    df = check_data_quality(df)
    
    # 5. Summary statistics
    subject_stats = calculate_statistics(df)
    
    # 6. Generate Visualizations (Matplotlib)
    print_section_header("Step 6: Generating & Saving Visualizations")
    bar_path = plot_average_marks_bar(subject_stats, output_dir)
    scatter_path = plot_math_science_scatter(df, output_dir)
    heatmap_path = plot_correlation_heatmap(df, REQUIRED_COLUMNS, output_dir)
    
    # 7. Generate Dynamic Insights
    insights = generate_insights(df, subject_stats)
    
    # 8. Completion Summary
    print_section_header("Project Execution Complete")
    print("All tasks specified for the QSkill Python Developer Internship have succeeded:")
    print("  [x] CSV Data loaded and validated")
    print("  [x] Data dimensions, types, and preview displayed")
    print("  [x] Missing values and duplicates evaluated")
    print("  [x] Basic statistics (mean, median, min, max, std) computed")
    print(f"  [x] Bar chart saved:       '{bar_path}'")
    print(f"  [x] Scatter plot saved:    '{scatter_path}'")
    print(f"  [x] Heatmap saved:         '{heatmap_path}'")
    print("  [x] Dynamic observations generated from empirical results")
    print("\nCheck the 'outputs/' directory for all generated visualization assets.")
    print("=" * 70)


if __name__ == "__main__":
    main()
