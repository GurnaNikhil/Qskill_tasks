@echo off
title Matrix Operations Tool - QSkill Python Internship
color 0b
echo ========================================================
echo   MATRIX OPERATIONS TOOL USING PYTHON AND NUMPY
echo   QSkill Python Development Internship
echo ========================================================
echo.

:: Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python is not found in your system PATH!
    echo Please install Python 3 from python.org and check "Add Python to PATH".
    echo.
    pause
    exit /b
)

:: Check if virtual environment exists
if exist venv\Scripts\activate.bat (
    echo [INFO] Activating virtual environment 'venv'...
    call venv\Scripts\activate.bat
) else (
    echo [INFO] Running with system Python...
)

echo.
echo Launching matrix_operations.py...
echo.
python matrix_operations.py

echo.
pause
