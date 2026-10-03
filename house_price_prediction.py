"""
=============================================================================
QSkill Python Development Internship - Final Capstone Project
Project Title : House Price Prediction Using Linear Regression
Dataset Source : Kaggle - House Sales in King County, USA (kc_house_data.csv)
Target Column  : price (House sale price in US Dollars $)
Model          : Ordinary Least Squares (OLS) Linear Regression
=============================================================================
"""

import os
import sys
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score


# =============================================================================
# STEP 1 & 2: EXPLANATION OF LIBRARIES & PATH CONSTANTS
# =============================================================================
"""
LIBRARY EXPLANATIONS (Beginner Friendly):
1. pandas (pd): Used to load, inspect, clean, and manipulate tabular CSV data.
2. numpy (np): Provides fast numerical operations, array handling, and math tools (like sqrt).
3. matplotlib.pyplot (plt): Fundamental plotting library to create charts, figures, and plots.
4. seaborn (sns): Statistical data visualization library built on top of Matplotlib for beautiful graphics.
5. sklearn (Scikit-learn): The premier machine learning library in Python for model training, splitting, and evaluation.
"""

DATA_PATH = os.path.join(os.path.dirname(__file__), "data", "house_data.csv")
PREDICTIONS_PATH = os.path.join(os.path.dirname(__file__), "predictions.csv")

# Selected numerical and structural features from King County Kaggle dataset
FEATURE_COLUMNS = [
    "bedrooms",
    "bathrooms",
    "sqft_living",
    "sqft_lot",
    "floors",
    "waterfront",
    "view",
    "condition",
    "grade",
    "sqft_above",
    "sqft_basement",
    "yr_built",
    "zipcode",
]

TARGET_COLUMN = "price"


# =============================================================================
# STEP 3: LOAD AND INSPECT DATASET
# =============================================================================
def load_and_inspect_dataset(file_path: str) -> pd.DataFrame:
    """
    Loads the house dataset from CSV and prints structural information.
    Handles FileNotFoundError gracefully.
    """
    print("=" * 70)
    print("STEP 3: LOADING DATASET")
    print("=" * 70)

    if not os.path.exists(file_path):
        print(f"[ERROR] The dataset file was not found at: {file_path}")
        print("Please ensure 'house_data.csv' is placed inside the 'data/' folder.")
        sys.exit(1)

    df = pd.read_csv(file_path)
    print(f"✓ Dataset loaded successfully from: {file_path}")
    print(f"✓ Dataset Dimensions: {df.shape[0]} rows and {df.shape[1]} columns\n")

    print("--- First 5 Rows of the Dataset ---")
    print(df.head())
    print("\n--- Column Names & Data Types ---")
    print(df.dtypes)

    print("\n--- Summary Statistics of Target & Key Features ---")
    summary_cols = ["price", "bedrooms", "bathrooms", "sqft_living", "grade", "yr_built"]
    existing_summary_cols = [c for c in summary_cols if c in df.columns]
    print(df[existing_summary_cols].describe().round(2))

    return df


# =============================================================================
# STEP 4: DATA PREPROCESSING
# =============================================================================
def preprocess_data(df: pd.DataFrame):
    """
    Cleans data, checks for missing values, verifies column presence,
    separates features (X) and target (y), and splits into Train/Test sets.
    """
    print("\n" + "=" * 70)
    print("STEP 4: DATA PREPROCESSING")
    print("=" * 70)

    # 1. Missing Value Check
    missing_counts = df.isnull().sum()
    print(f"Checking for missing values across columns:")
    total_missing = missing_counts.sum()
    if total_missing == 0:
        print("✓ Zero missing values detected in the dataset.")
    else:
        print(f"! Found {total_missing} missing values. Filling numeric columns with median...")
        df = df.fillna(df.median(numeric_only=True))

    # 2. Duplicate Check
    initial_len = len(df)
    df = df.drop_duplicates()
    duplicates_removed = initial_len - len(df)
    print(f"✓ Duplicate rows removed: {duplicates_removed}")

    # 3. Verify Required Columns
    missing_features = [col for col in FEATURE_COLUMNS + [TARGET_COLUMN] if col not in df.columns]
    if missing_features:
        print(f"[ERROR] Missing required columns in CSV: {missing_features}")
        sys.exit(1)

    # 4. Outlier & Sanity Filtering
    # Realistic King County constraints (e.g., bedrooms > 0 and sqft_living > 200)
    clean_df = df[(df["bedrooms"] > 0) & (df["sqft_living"] > 200) & (df["price"] > 50000)].copy()
    print(f"✓ Cleaned dataset retained {len(clean_df)} records after sanity filtering.")

    # 5. Feature Matrix (X) and Target Vector (y)
    X = clean_df[FEATURE_COLUMNS]
    y = clean_df[TARGET_COLUMN]

    print(f"✓ Feature matrix X shape: {X.shape}")
    print(f"✓ Target vector y shape : {y.shape}")

    # 6. Train-Test Split (80% Training, 20% Testing)
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.20, random_state=42
    )

    print(f"✓ Train-Test Split (80/20 split, random_state=42):")
    print(f"   • Training samples : {X_train.shape[0]}")
    print(f"   • Testing samples  : {X_test.shape[0]}")

    return X_train, X_test, y_train, y_test, clean_df


# =============================================================================
# STEP 5: EXPLORATORY DATA ANALYSIS (EDA)
# =============================================================================
def perform_eda(df: pd.DataFrame, show_plots: bool = False):
    """
    Generates key exploratory visualizations using Matplotlib & Seaborn:
    1. Distribution of House Prices
    2. Living Area (sqft_living) vs Price Scatter with Regression Trend
    3. Correlation Heatmap
    4. Boxplot of Price by Number of Bedrooms
    """
    print("\n" + "=" * 70)
    print("STEP 5: EXPLORATORY DATA ANALYSIS (EDA)")
    print("=" * 70)
    print("Observations:")
    print("1. Price Distribution: Right-skewed distribution; majority of homes fall between $300k and $800k.")
    print("2. Living Area vs Price: Strong positive linear trend. Larger sqft living translates directly to higher prices.")
    print("3. Correlation: 'sqft_living' and 'grade' exhibit the highest positive correlation with price (~0.70+).")
    print("4. Bedrooms vs Price: Price increases steadily with bedrooms up to 5; beyond that, location and lot size dominate.")

    try:
        # Create 2x2 EDA subplot figure
        fig, axes = plt.subplots(2, 2, figsize=(16, 12))
        fig.suptitle("King County House Sales - Exploratory Data Analysis (EDA)", fontsize=16, fontweight="bold")

        # 1. Price Distribution
        sns.histplot(df["price"], kde=True, ax=axes[0, 0], color="#2563eb", bins=30)
        axes[0, 0].set_title("1. Distribution of House Prices", fontweight="bold")
        axes[0, 0].set_xlabel("Price ($)")
        axes[0, 0].set_ylabel("Frequency")

        # 2. Living Area vs Price
        sns.regplot(data=df, x="sqft_living", y="price", ax=axes[0, 1],
                    scatter_kws={"alpha": 0.5, "color": "#059669"}, line_kws={"color": "#dc2626", "linewidth": 2})
        axes[0, 1].set_title("2. Living Area (sqft) vs Price ($)", fontweight="bold")
        axes[0, 1].set_xlabel("Living Area (Square Feet)")
        axes[0, 1].set_ylabel("Sale Price ($)")

        # 3. Correlation Heatmap
        corr_cols = ["price", "bedrooms", "bathrooms", "sqft_living", "grade", "floors", "yr_built"]
        corr_matrix = df[corr_cols].corr()
        sns.heatmap(corr_matrix, annot=True, fmt=".2f", cmap="coolwarm", ax=axes[1, 0], cbar=True)
        axes[1, 0].set_title("3. Feature Correlation Heatmap", fontweight="bold")

        # 4. Bedrooms vs Price Boxplot
        sns.boxplot(data=df, x="bedrooms", y="price", ax=axes[1, 1], palette="Blues")
        axes[1, 1].set_title("4. House Price by Number of Bedrooms", fontweight="bold")
        axes[1, 1].set_xlabel("Bedrooms")
        axes[1, 1].set_ylabel("Price ($)")

        plt.tight_layout()
        eda_img_path = os.path.join(os.path.dirname(__file__), "eda_visualizations.png")
        plt.savefig(eda_img_path, dpi=150)
        print(f"✓ EDA charts saved successfully to '{eda_img_path}'.")

        if show_plots and "DISPLAY" in os.environ:
            plt.show()
        plt.close()
    except Exception as e:
        print(f"[Note] Visual plotting skipped in headless terminal mode: {e}")


# =============================================================================
# STEP 6: TRAIN LINEAR REGRESSION MODEL
# =============================================================================
def train_linear_regression(X_train: pd.DataFrame, y_train: pd.Series) -> LinearRegression:
    """
    Initializes and fits Ordinary Least Squares Linear Regression.
    Linear Regression Equation: y = b0 + b1*x1 + b2*x2 + ... + bn*xn
    """
    print("\n" + "=" * 70)
    print("STEP 6: TRAINING LINEAR REGRESSION MODEL")
    print("=" * 70)

    model = LinearRegression()
    model.fit(X_train, y_train)

    print("✓ Model fitted successfully using Scikit-Learn 'LinearRegression()'.")
    print(f"• Intercept (b0): ${model.intercept_:,.2f}")
    print("• Learned Feature Coefficients (Slopes):")
    for feature, coef in zip(X_train.columns, model.coef_):
        sign = "+" if coef >= 0 else "-"
        print(f"   - {feature:<15}: {sign} ${abs(coef):>12,.2f} per unit")

    return model


# =============================================================================
# STEP 7 & 8: MODEL PREDICTION & EVALUATION
# =============================================================================
def evaluate_and_predict(model: LinearRegression, X_test: pd.DataFrame, y_test: pd.Series):
    """
    Generates predictions for the test dataset, saves comparisons to CSV,
    and computes regression evaluation metrics (MAE, MSE, RMSE, R²).
    """
    print("\n" + "=" * 70)
    print("STEP 7 & 8: MODEL PREDICTION & EVALUATION")
    print("=" * 70)

    y_pred = model.predict(X_test)

    # 1. Calculate Regression Metrics
    mae = mean_absolute_error(y_test, y_pred)
    mse = mean_squared_error(y_test, y_pred)
    rmse = np.sqrt(mse)
    r2 = r2_score(y_test, y_pred)

    print("\n==============================")
    print("HOUSE PRICE PREDICTION RESULTS")
    print("==============================")
    print("Model: Linear Regression")
    print(f"MAE     : ${mae:,.2f}")
    print(f"MSE     : {mse:,.2f}")
    print(f"RMSE    : ${rmse:,.2f}")
    print(f"R² Score: {r2:.4f} ({r2 * 100:.2f}% variance explained)")
    print("==============================\n")

    print("Metric Explanations (Beginner Friendly):")
    print(f"• MAE  (Mean Absolute Error)     : On average, predictions deviate by ${mae:,.2f} from actual prices.")
    print(f"• MSE  (Mean Squared Error)      : Average of squared residuals ({mse:,.0f}); penalizes large outliers.")
    print(f"• RMSE (Root Mean Squared Error) : Standard deviation of residuals (${rmse:,.2f}). Same unit as house price.")
    print(f"• R²   (Coefficient of Determ.)  : {r2:.4f}. Explains approximately {r2 * 100:.1f}% of price variance.")

    # 2. Side-by-side comparison table
    comparison_df = pd.DataFrame({
        "Actual_Price": y_test.values,
        "Predicted_Price": np.round(y_pred, 2),
        "Difference": np.round(y_pred - y_test.values, 2),
        "Absolute_Error": np.round(np.abs(y_pred - y_test.values), 2),
        "Percentage_Error": np.round((np.abs(y_pred - y_test.values) / y_test.values) * 100, 2)
    })

    print("\n--- Side-by-Side Comparison Sample (First 5 Test Predictions) ---")
    print(comparison_df.head())

    # 3. Export predictions to CSV
    comparison_df.to_csv(PREDICTIONS_PATH, index=False)
    print(f"\n✓ Full predictions saved to: '{PREDICTIONS_PATH}'")

    return y_pred, mae, mse, rmse, r2


# =============================================================================
# STEP 9: VISUALIZE ACTUAL VS PREDICTED PRICES
# =============================================================================
def plot_actual_vs_predicted(y_test: pd.Series, y_pred: np.ndarray, show_plots: bool = False):
    """
    Plots Actual vs. Predicted House Prices with ideal diagonal reference line.
    """
    print("\n" + "=" * 70)
    print("STEP 9: PREDICTION VISUALIZATION")
    print("=" * 70)

    try:
        fig, axes = plt.subplots(1, 2, figsize=(15, 6))

        # 1. Actual vs Predicted Scatter
        axes[0].scatter(y_test, y_pred, alpha=0.6, color="#4f46e5", edgecolors="k", s=50)
        min_val = min(y_test.min(), y_pred.min())
        max_val = max(y_test.max(), y_pred.max())
        axes[0].plot([min_val, max_val], [min_val, max_val], "r--", lw=2, label="Ideal 1:1 Prediction")
        axes[0].set_title("Actual vs. Predicted House Prices", fontweight="bold")
        axes[0].set_xlabel("Actual Price ($)")
        axes[0].set_ylabel("Predicted Price ($)")
        axes[0].legend()
        axes[0].grid(True, linestyle="--", alpha=0.5)

        # 2. Residual Distribution (Residuals = Actual - Predicted)
        residuals = y_test - y_pred
        sns.histplot(residuals, kde=True, ax=axes[1], color="#0284c7", bins=25)
        axes[1].axvline(0, color="red", linestyle="--", lw=2, label="Zero Error")
        axes[1].set_title("Residuals (Prediction Errors) Distribution", fontweight="bold")
        axes[1].set_xlabel("Residual ($)")
        axes[1].set_ylabel("Count")
        axes[1].legend()
        axes[1].grid(True, linestyle="--", alpha=0.5)

        plt.tight_layout()
        pred_img_path = os.path.join(os.path.dirname(__file__), "actual_vs_predicted.png")
        plt.savefig(pred_img_path, dpi=150)
        print(f"✓ Prediction evaluation graphs saved to '{pred_img_path}'.")

        if show_plots and "DISPLAY" in os.environ:
            plt.show()
        plt.close()
    except Exception as e:
        print(f"[Note] Visual plotting skipped in headless terminal mode: {e}")


# =============================================================================
# STEP 10: INTERACTIVE USER HOUSE PRICE PREDICTION
# =============================================================================
def interactive_user_prediction(model: LinearRegression):
    """
    Allows user to enter custom house features through terminal prompts
    and calculates estimated market price using the trained model.
    """
    print("\n" + "=" * 70)
    print("STEP 10 & 11: USER PREDICTION FEATURE")
    print("=" * 70)
    print("Enter house details to predict the estimated price (King County, WA):\n")

    def get_user_float(prompt_text: str, default_val: float, min_val: float, max_val: float) -> float:
        """Helper to collect and validate numeric user inputs with fallback defaults."""
        while True:
            try:
                user_val = input(f"{prompt_text} [Default: {default_val}]: ").strip()
                if not user_val:
                    return default_val
                val = float(user_val)
                if min_val <= val <= max_val:
                    return val
                print(f"  [Warning] Value should be between {min_val} and {max_val}. Try again.")
            except ValueError:
                print("  [Error] Please enter a valid numeric value.")

    try:
        bedrooms = get_user_float("1. Number of Bedrooms", 3.0, 1.0, 10.0)
        bathrooms = get_user_float("2. Number of Bathrooms (e.g., 2.5)", 2.5, 0.5, 8.0)
        sqft_living = get_user_float("3. Living Area Square Footage (sqft)", 2100.0, 300.0, 15000.0)
        sqft_lot = get_user_float("4. Lot Size Square Footage (sqft)", 7500.0, 500.0, 500000.0)
        floors = get_user_float("5. Number of Floors (1.0, 1.5, 2.0)", 1.5, 1.0, 3.5)
        waterfront = get_user_float("6. Waterfront View (0 for No, 1 for Yes)", 0.0, 0.0, 1.0)
        view = get_user_float("7. View Rating Quality (0 to 4)", 0.0, 0.0, 4.0)
        condition = get_user_float("8. Overall Condition Rating (1 to 5)", 3.0, 1.0, 5.0)
        grade = get_user_float("9. King County Grade Rating (1 to 13, 7=avg)", 7.0, 1.0, 13.0)
        sqft_above = get_user_float("10. Sqft Above Ground", sqft_living * 0.8, 300.0, 15000.0)
        sqft_basement = sqft_living - sqft_above if sqft_living > sqft_above else 0.0
        yr_built = get_user_float("11. Year Built (e.g., 1995)", 1995.0, 1900.0, 2025.0)
        zipcode = get_user_float("12. King County Zipcode (e.g., 98052)", 98052.0, 98001.0, 98199.0)

        input_data = pd.DataFrame([{
            "bedrooms": bedrooms,
            "bathrooms": bathrooms,
            "sqft_living": sqft_living,
            "sqft_lot": sqft_lot,
            "floors": floors,
            "waterfront": waterfront,
            "view": view,
            "condition": condition,
            "grade": grade,
            "sqft_above": sqft_above,
            "sqft_basement": sqft_basement,
            "yr_built": yr_built,
            "zipcode": zipcode
        }])[FEATURE_COLUMNS]

        predicted_price = model.predict(input_data)[0]
        usd_to_inr = 85.0
        predicted_inr = predicted_price * usd_to_inr

        if predicted_inr >= 10000000:
            inr_words = f"₹{predicted_inr / 10000000:.2f} Crore"
        elif predicted_inr >= 100000:
            inr_words = f"₹{predicted_inr / 100000:.2f} Lakh"
        else:
            inr_words = f"₹{predicted_inr:,.2f}"

        print("\n" + "=" * 50)
        print("HOUSE PRICE PREDICTION RESULT")
        print("=" * 50)
        print(f"Bedrooms     : {bedrooms}")
        print(f"Bathrooms    : {bathrooms}")
        print(f"Living Area  : {sqft_living:,.0f} sqft")
        print(f"Floors       : {floors}")
        print(f"Grade (1-13) : {grade}")
        print(f"Year Built   : {int(yr_built)}")
        print(f"Zipcode      : {int(zipcode)}")
        print("-" * 50)
        print(f"Predicted House Price (INR): {inr_words} (₹{predicted_inr:,.2f})")
        print(f"Original Dataset Valuation : ${predicted_price:,.2f} USD")
        print("=" * 50)

    except (KeyboardInterrupt, EOFError):
        print("\nInteractive prediction ended.")


# =============================================================================
# MAIN PIPELINE EXECUTION
# =============================================================================
def main():
    print("""
    =======================================================
     QSkill Python Development Internship Capstone Project
     HOUSE PRICE PREDICTION USING LINEAR REGRESSION
    =======================================================
    """)

    # 1. Load Data
    df = load_and_inspect_dataset(DATA_PATH)

    # 2. Preprocess Data & Split
    X_train, X_test, y_train, y_test, clean_df = preprocess_data(df)

    # 3. Exploratory Data Analysis
    perform_eda(clean_df, show_plots=False)

    # 4. Train Model
    model = train_linear_regression(X_train, y_train)

    # 5. Evaluate and Predict
    y_pred, mae, mse, rmse, r2 = evaluate_and_predict(model, X_test, y_test)

    # 6. Plot Results
    plot_actual_vs_predicted(y_test, y_pred, show_plots=False)

    # 7. User Custom Prediction Feature (CLI Prompt)
    if sys.stdin.isatty():
        interactive_user_prediction(model)
    else:
        # Default demonstration if run non-interactively
        print("\n--- Non-Interactive Demo Sample Prediction ---")
        sample_house = pd.DataFrame([{
            "bedrooms": 3,
            "bathrooms": 2.5,
            "sqft_living": 2100,
            "sqft_lot": 7500,
            "floors": 2.0,
            "waterfront": 0,
            "view": 0,
            "condition": 3,
            "grade": 8,
            "sqft_above": 2100,
            "sqft_basement": 0,
            "yr_built": 2002,
            "zipcode": 98052
        }])[FEATURE_COLUMNS]

        demo_pred = model.predict(sample_house)[0]
        demo_inr = demo_pred * 85.0
        print(f"Sample House (3 bed, 2.5 bath, 2,100 sqft, Grade 8, Zipcode 98052):")
        print(f"Predicted House Price (INR): ₹{demo_inr / 10000000:.2f} Crore (₹{demo_inr:,.2f})")
        print(f"Original USD Valuation     : ${demo_pred:,.2f}")


if __name__ == "__main__":
    main()
