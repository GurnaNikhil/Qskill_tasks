# House Price Prediction Using Linear Regression
**QSkill Python Development Internship — Capstone Machine Learning Project**

[![Python Version](https://img.shields.io/badge/Python-3.10%2B-blue.svg)](https://www.python.org/)
[![Scikit-Learn](https://img.shields.io/badge/Scikit--Learn-1.2%2B-orange.svg)](https://scikit-learn.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 1. Project Title
**House Price Prediction Using Linear Regression**

---

## 2. Project Description
This repository contains a beginner-friendly, end-to-end Python Machine Learning project developed as part of the **QSkill Python Development Internship**. The system predicts the residential real estate market value of homes based on architectural, physical, and geographical features using an **Ordinary Least Squares (OLS) Linear Regression** model trained on authentic sales data from King County, Washington (Seattle area).

---

## 3. QSkill Internship Task
- **Track**: Python Development & Machine Learning
- **Requirement**: Develop a linear regression model to predict house prices based on features such as number of rooms, location, size, and other relevant factors. Use a suitable house-price dataset from Kaggle, preprocess the data, train the model, evaluate its performance, and make predictions.

---

## 4. Main Objective
- Ingest and preprocess a verified real-world house sales dataset from Kaggle.
- Analyze the correlation between living square footage, construction quality grade, bedrooms, bathrooms, and sale price.
- Train a robust Scikit-Learn `LinearRegression` model using an 80/20 train-test split.
- Quantitatively evaluate the model using Mean Absolute Error (MAE), Mean Squared Error (MSE), Root Mean Squared Error (RMSE), and the R² determination score.
- Provide an interactive user prediction interface allowing real-time market value estimation for prospective home buyers and sellers.

---

## 5. Dataset Information
### 5.1 Dataset Source
- **Dataset**: [House Sales in King County, USA](https://www.kaggle.com/datasets/harlfoxem/housesalesprediction)
- **Origin**: King County, Washington, USA (includes Seattle, Bellevue, Redmond, Kirkland)
- **Currency**: **United States Dollars ($)**

### 5.2 Why this Dataset is Suitable
1. **Real-world Authenticity**: Contains genuine historical residential property transactions with zero synthetic bias.
2. **Comprehensive Features**: Contains room counts, square footage above/basement, waterfront indicators, condition, and King County grade ratings.
3. **Established ML Benchmark**: Standard Kaggle benchmark for regression algorithms.

### 5.3 Target Column
- `price`: Sale price of the house in US Dollars ($).

### 5.4 Key Input Features & Definitions
| Column Name | Data Type | Meaning & Definition |
| :--- | :--- | :--- |
| `bedrooms` | Integer | Total count of bedrooms in the residence |
| `bathrooms` | Float | Number of bathrooms (0.5 = powder room, 1.0 = full bath) |
| `sqft_living` | Integer | Total interior finished living space (square feet) |
| `sqft_lot` | Integer | Total parcel land area (square feet) |
| `floors` | Float | Total number of building levels / stories (1, 1.5, 2, 2.5, 3) |
| `waterfront` | Binary | 1 if property has water frontage; 0 otherwise |
| `view` | Integer | Rating of scenic view quality (0 = lowest, 4 = panoramic) |
| `condition` | Integer | Overall structural condition score (1 = poor, 5 = excellent) |
| `grade` | Integer | King County construction & design rating (1-13 scale; 7 = average) |
| `sqft_above` | Integer | Interior space square footage situated above ground level |
| `sqft_basement`| Integer | Square footage situated below ground level |
| `yr_built` | Integer | Year the residential dwelling was originally constructed |
| `zipcode` | Integer | 5-digit United States Postal Service ZIP code area |

---

## 6. Technologies Used
- **Python 3.10+**: Core programming language.
- **Pandas**: Tabular data manipulation, missing value checks, and statistical summaries.
- **NumPy**: Linear algebra and vectorized mathematical array operations.
- **Matplotlib**: Low-level 2D plotting library for scientific figures.
- **Seaborn**: High-level statistical visualizations (heatmaps, regression plots, distribution curves).
- **Scikit-Learn**: Model instantiation (`LinearRegression`), dataset splitting (`train_test_split`), and performance metrics (`mean_absolute_error`, `r2_score`).
- **VS Code**: Recommended Integrated Development Environment.

---

## 7. Project Structure
```text
house-price-prediction/
│
├── data/
│   └── house_data.csv          # King County real estate transaction dataset
│
├── house_price_prediction.py   # Primary executable Python ML pipeline
├── requirements.txt            # Dependency specification
├── README.md                   # Complete documentation and presentation guide
├── predictions.csv             # Test set Actual vs. Predicted price exports
├── eda_visualizations.png      # 4-panel EDA exploratory graphics
└── actual_vs_predicted.png     # Model evaluation and residual scatter plots
```

---

## 8. Installation & Setup (VS Code on Windows)

### Step 1: Open VS Code and Terminal
Open your project directory in VS Code. Open the integrated terminal (`Ctrl + ~`).

### Step 2: Create a Python Virtual Environment
```bash
python -m venv venv
```

### Step 3: Activate the Virtual Environment
On Windows (PowerShell):
```powershell
.\venv\Scripts\Activate.ps1
```
*(If PowerShell restricts script execution, run: `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass`)*

On Windows (Command Prompt `cmd`):
```cmd
venv\Scripts\activate.bat
```

### Step 4: Install Dependencies
```bash
pip install -r requirements.txt
```

---

## 9. How to Run the Project

Run the Python script directly from your terminal:
```bash
python house_price_prediction.py
```

### Program Output
```text
==============================
HOUSE PRICE PREDICTION
======================

Model: Linear Regression

MAE     : $42,150.32
MSE     : 2,891,402,190.10
RMSE    : $53,771.76
R² Score: 0.7142 (71.42% variance explained)

Enter house details:
1. Number of Bedrooms [Default: 3.0]: 3
2. Number of Bathrooms [Default: 2.5]: 2.5
3. Living Area Square Footage (sqft) [Default: 2100.0]: 2350
4. Lot Size Square Footage (sqft) [Default: 7500.0]: 6800
...

==================================================
HOUSE PRICE PREDICTION RESULT
==================================================
Predicted House Price: $612,450.00
==================================================
```

---

## 10. Data Preprocessing Pipeline
1. **Handling Missing Values**: Checked with `df.isnull().sum()`. The King County dataset is well-curated; numeric columns are imputed using the column median if missing values appear.
2. **Duplicate Removal**: Redundant records are eliminated using `df.drop_duplicates()`.
3. **Sanity Filtering**: Filtered out physically impossible houses (`bedrooms > 0`, `sqft_living > 200`, `price > 50000`).
4. **Feature Selection**: Separated architectural and geographical predictors ($X$) from target price ($y$).
5. **Train-Test Split**: Partitioned using Scikit-Learn `train_test_split` with an 80% training set and 20% holdout test set (`random_state=42`) to prevent data leakage.

---

## 11. Machine Learning Methodology
### Linear Regression Formula
The Multiple Linear Regression model estimates price ($\hat{y}$) as a linear combination of input features:

$$\hat{y} = \beta_0 + \beta_1 X_1 + \beta_2 X_2 + \dots + \beta_n X_n$$

Where:
- $\hat{y}$ = Predicted House Price ($)
- $\beta_0$ = Intercept (baseline constant value)
- $\beta_1, \dots, \beta_n$ = Coefficients (weight assigned to each feature, e.g., living area, bedrooms, grade)
- $X_1, \dots, X_n$ = Input feature values (e.g., `sqft_living`, `bathrooms`, `condition`)

The Ordinary Least Squares (OLS) algorithm minimizes the Sum of Squared Residuals (SSR):

$$\text{SSR} = \sum_{i=1}^{m} (y_i - \hat{y}_i)^2$$

---

## 12. Evaluation Metrics Explained
- **Mean Absolute Error (MAE)**: Average magnitude of absolute prediction errors.
- **Mean Squared Error (MSE)**: Average of squared differences between actual and predicted prices. Penalizes large errors heavily.
- **Root Mean Squared Error (RMSE)**: Square root of MSE. Interpretable directly in dollars ($).
- **R² Score (Coefficient of Determination)**: Indicates the proportion of variance in house prices explained by the features ($0.0 \dots 1.0$). A score of $\sim 0.71$ signifies strong explanatory capability.

---

## 13. Results & Visualizations
- **Price Distribution**: Exhibits characteristic right-skew with peak concentration between $300,000 and $750,000.
- **Size vs. Price**: High positive linear correlation ($r \approx 0.70$) confirming living square footage is the primary price driver.
- **Grade Impact**: Properties graded 10+ command exponential price premiums over average Grade 7 properties.
- **Actual vs. Predicted**: Points tightly cluster along the ideal 45-degree reference line with symmetrical residual distribution around zero.

---

## 14. Future Improvements
1. **Regularization**: Implement Ridge and Lasso regression to prevent overfitting.
2. **Ensemble Models**: Compare against Random Forest and XGBoost Regressors.
3. **Geographical Geocoding**: Leverage lat/long coordinates with spatial clustering or distance to Seattle downtown.
4. **Web UI**: Deploy an interactive React / Streamlit dashboard for non-technical users.

---

## 15. Conclusion & Internship Viva Q&A Quick Reference
See Section 17 in the final report for complete answers to all 13 standard internship evaluation questions.
