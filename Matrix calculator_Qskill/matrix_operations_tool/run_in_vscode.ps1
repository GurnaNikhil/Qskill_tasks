# PowerShell Launcher for Matrix Operations Tool
# QSkill Python Development Internship

Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "   MATRIX OPERATIONS TOOL USING PYTHON AND NUMPY" -ForegroundColor Cyan
Write-Host "   QSkill Python Development Internship" -ForegroundColor Yellow
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host ""

# Check Python
try {
    $pyVersion = python --version 2>&1
    Write-Host "[OK] Detected: $pyVersion" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Python was not found in your system PATH." -ForegroundColor Red
    Write-Host "Please download Python 3 from https://python.org and check 'Add Python to PATH'." -ForegroundColor Yellow
    pause
    exit
}

# Activate virtual environment if present
if (Test-Path ".\venv\Scripts\Activate.ps1") {
    Write-Host "[INFO] Activating virtual environment 'venv'..." -ForegroundColor Cyan
    & ".\venv\Scripts\Activate.ps1"
}

# Run the program
Write-Host "`nLaunching matrix_operations.py...`n" -ForegroundColor Green
python matrix_operations.py
