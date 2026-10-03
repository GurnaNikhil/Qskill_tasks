@echo off
title House Price Prediction - Python Machine Learning
cls
echo =====================================================================
echo  HOUSE PRICE PREDICTION USING LINEAR REGRESSION (Machine Learning)
echo =====================================================================
echo.

:: Check Python installation
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python is not installed or not added to your Windows PATH.
    echo Please install Python 3.10+ from https://www.python.org/
    echo Make sure to check the box "Add Python to PATH" during installation.
    echo.
    pause
    exit /b
)

echo [1/3] Python found successfully!
python --version
echo.

:: Check/Create Virtual Environment
if not exist "venv\Scripts\activate.bat" (
    echo [2/3] Creating virtual environment 'venv'...
    python -m venv venv
) else (
    echo [2/3] Virtual environment 'venv' already exists.
)

:: Activate virtual environment
call venv\Scripts\activate.bat

:: Install dependencies
echo.
echo Installing required packages (pandas, numpy, scikit-learn, matplotlib, seaborn)...
pip install -r requirements.txt --quiet

echo.
echo [3/3] Launching House Price Prediction Model...
echo =====================================================================
echo.

:: Run Python script
python house_price_prediction.py

echo.
echo =====================================================================
echo Program execution finished.
echo Press any key to close this window.
pause >nul
