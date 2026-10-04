# Matrix Operations Tool Using Python and NumPy

A beginner-friendly, robust, and interactive linear algebra utility built with **Python 3** and the **NumPy** library. Developed as a capstone submission for the **QSkill Python Development Internship**.

---

## 📌 QSkill Internship Task Overview

- **Internship Track:** Python Development Internship
- **Task Requirement:** Create a "Matrix Operations Tool" using Python and NumPy. The application allows users to input matrices dynamically and perform linear algebra operations: Addition, Subtraction, Multiplication, Transpose, and Determinant calculation. Includes an interactive menu-driven interface with structured output display and defensive error validation.
- **Author / Intern:** Python Intern
- **Status:** Complete & Fully Tested

---

## 🎯 Project Objective

1. Provide an intuitive menu-driven CLI interface for performing core matrix operations.
2. Leverage NumPy’s optimized C-backed array operations (`np.add`, `np.subtract`, `np.matmul`, `np.transpose`, `np.linalg.det`).
3. Enforce strict mathematical dimension constraints before computation to prevent runtime crashes.
4. Deliver structured, easy-to-read matrix outputs in a clean terminal layout.
5. Provide beginner-friendly, modular, and maintainable Python code accompanied by automated test coverage.

---

## ✨ Features & Supported Operations

| Operation | Mathematical Notation | NumPy Function | Shape Requirement |
| :--- | :--- | :--- | :--- |
| **Matrix Addition** | $A + B$ | `np.add(A, B)` | Shapes must be identical: $(m \times n) + (m \times n)$ |
| **Matrix Subtraction** | $A - B$ | `np.subtract(A, B)` | Shapes must be identical: $(m \times n) - (m \times n)$ |
| **Matrix Multiplication** | $A \times B$ | `np.matmul(A, B)` | Inner dimensions must match: $(m \times k) \times (k \times n)$ |
| **Matrix Transpose** | $A^T$ | `np.transpose(A)` | Any valid matrix $(m \times n) \to (n \times m)$ |
| **Matrix Determinant** | $\det(A)$ or $\|A\|$ | `np.linalg.det(A)` | Square matrix only: $(n \times n)$ |

### Additional Highlights:
- **Interactive Menu Loop:** Continues running until the user explicitly selects option `6 (Exit)`.
- **Dynamic Input Validation:** Gracefully handles non-numeric inputs, row length mismatches, and empty inputs without crashing.
- **Automated Unit Tests:** Built-in test suite verifying all 8 edge cases and mathematical identities.
- **Bonus Tkinter Desktop GUI:** An optional desktop interface (`gui_matrix_operations.py`) using Python’s standard `tkinter` library.

---

## 🛠️ Technologies Used

- **Language:** Python 3.8+ (Python 3.10 / 3.11 / 3.12 recommended)
- **Primary Library:** NumPy (`numpy>=1.24.0`)
- **Testing:** Python `unittest` standard library
- **Optional GUI:** Standard Python `tkinter` (No extra packages needed)

---

## 📂 Project Structure

```text
matrix_operations_tool/
│
├── matrix_operations.py        # Core interactive menu-driven CLI program
├── test_matrix_operations.py   # Automated test suite covering all operations & validations
├── gui_matrix_operations.py    # Optional Tkinter graphical user interface (bonus)
├── requirements.txt            # Project dependencies (NumPy)
├── README.md                   # Complete documentation, setup guide & viva notes
└── .gitignore                  # Git ignore rules for virtual environments and caches
```

---

## 🚀 Installation & Setup Instructions

### 1. Prerequisites
Ensure Python 3 is installed on your computer. You can check by running:
```bash
python --version
```
*(If `python` is not recognized on Windows, ensure "Add Python to PATH" was checked during Python installation).*

---

### 2. Setup in Windows PowerShell (Recommended for Internship Demo)

Open PowerShell and navigate to the project directory:

```powershell
# Navigate into the project directory
cd matrix_operations_tool

# 1. Create a virtual environment
python -m venv venv

# 2. Activate the virtual environment
.\venv\Scripts\Activate.ps1

# (Note: If PowerShell shows an Execution_Policies error, run:
# Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
# and then re-run .\venv\Scripts\Activate.ps1)

# 3. Upgrade pip and install NumPy
python -m pip install --upgrade pip
pip install -r requirements.txt
```

---

### 3. Setup in macOS / Linux Terminal

```bash
cd matrix_operations_tool
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

---

## 💻 How to Run the Project

### Running the Interactive CLI Tool (Standard Submission)
```powershell
python matrix_operations.py
```

### Running the Automated Test Suite
```powershell
python test_matrix_operations.py
```

### Running the Optional Tkinter GUI (Desktop Interface)
```powershell
python gui_matrix_operations.py
```

---

## 📖 Step-by-Step Usage & Example Demonstrations

When you launch `matrix_operations.py`, you will see:

```text
========================================
       MATRIX OPERATIONS TOOL
========================================
1. Matrix Addition
2. Matrix Subtraction
3. Matrix Multiplication
4. Matrix Transpose
5. Matrix Determinant
6. Exit
========================================
Enter your choice (1-6):
```

### Example Matrices:
We demonstrate each operation using the standard test matrices:
$$\text{Matrix } A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}, \quad \text{Matrix } B = \begin{bmatrix} 5 & 6 \\ 7 & 8 \end{bmatrix}$$

---

### A. Matrix Addition (Option 1)
```text
--- Enter Details for Matrix A ---
Enter number of rows for Matrix A: 2
Enter number of columns for Matrix A: 2
Row 1 (2 values): 1 2
Row 2 (2 values): 3 4

--- Enter Details for Matrix B ---
Enter number of rows for Matrix B: 2
Enter number of columns for Matrix B: 2
Row 1 (2 values): 5 6
Row 2 (2 values): 7 8

----------------------------------------
Matrix A:
[[1 2]
 [3 4]]

Matrix B:
[[5 6]
 [7 8]]

Result (A + B):
[[ 6  8]
 [10 12]]
----------------------------------------
```

---

### B. Matrix Subtraction (Option 2)
```text
----------------------------------------
Matrix A:
[[1 2]
 [3 4]]

Matrix B:
[[5 6]
 [7 8]]

Result (A - B):
[[-4 -4]
 [-4 -4]]
----------------------------------------
```

---

### C. Matrix Multiplication (Option 3)
```text
----------------------------------------
Matrix A:
[[1 2]
 [3 4]]

Matrix B:
[[5 6]
 [7 8]]

Result (A x B):
[[19 22]
 [43 50]]
----------------------------------------
```
*Mathematical check:*
- Row 1, Col 1: $(1 \times 5) + (2 \times 7) = 5 + 14 = 19$
- Row 1, Col 2: $(1 \times 6) + (2 \times 8) = 6 + 16 = 22$
- Row 2, Col 1: $(3 \times 5) + (4 \times 7) = 15 + 28 = 43$
- Row 2, Col 2: $(3 \times 6) + (4 \times 8) = 18 + 32 = 50$

---

### D. Matrix Transpose (Option 4)
```text
----------------------------------------
Original Matrix A:
[[1 2]
 [3 4]]

Transposed Matrix A^T:
[[1 3]
 [2 4]]
----------------------------------------
```

---

### E. Matrix Determinant (Option 5)
```text
----------------------------------------
Matrix A:
[[1 2]
 [3 4]]

Determinant |A|: -2
----------------------------------------
```
*Mathematical check:*
$$\det(A) = (1 \times 4) - (2 \times 3) = 4 - 6 = -2$$

---

## 🛡️ Error Handling & Input Validation

The tool is built with defensive programming to ensure it never crashes during user interaction:

1. **Non-Numeric Matrix Elements:**
   - *Input:* `1 abc`
   - *Behavior:* Caught with `try...except ValueError`. Displays: `Error: Non-numeric element detected in Row 1. Please enter numeric values only.` Prompts the user to re-enter that row.
2. **Incorrect Number of Values:**
   - *Input:* 3 numbers entered for a 2-column matrix.
   - *Behavior:* Displays: `Error: Expected exactly 2 values, but received 3. Please re-enter Row 1.`
3. **Addition / Subtraction Dimension Mismatch:**
   - *Scenario:* Matrix A is $2 \times 2$, Matrix B is $2 \times 3$.
   - *Behavior:* Validated via `matrix_a.shape != matrix_b.shape`. Displays: `Error: Matrix dimensions must be the same for addition.`
4. **Multiplication Dimension Incompatibility:**
   - *Scenario:* Matrix A is $2 \times 3$, Matrix B is $2 \times 2$.
   - *Behavior:* Validated via `matrix_a.shape[1] != matrix_b.shape[0]`. Displays: `Error: Matrix A columns must equal Matrix B rows for multiplication.`
5. **Determinant for Non-Square Matrix:**
   - *Scenario:* Matrix is $2 \times 3$.
   - *Behavior:* Validated via `matrix_a.shape[0] != matrix_a.shape[1]`. Displays: `Error: Determinant can only be calculated for a square matrix.`
6. **Invalid Menu Choices:**
   - *Input:* `9` or `abc`
   - *Behavior:* Displays: `Error: Invalid choice! Please enter a number between 1 and 6.`

---

## 🧠 Key Concepts Learned

1. **NumPy n-dimensional Arrays (`ndarray`):**
   - High-performance, contiguous memory structures that replace nested Python lists.
2. **Vectorization vs. Iteration:**
   - Instead of using $O(n^3)$ triple nested `for` loops in pure Python, NumPy performs matrix operations in optimized C libraries (BLAS/LAPACK), achieving up to $100\times$ faster execution.
3. **Array Shape Properties (`matrix.shape`):**
   - Shape tuple `(rows, columns)` allows instant verification of algebraic compatibility.
4. **Linear Algebra Algorithms:**
   - Transpose operation swaps axes: $(i, j) \to (j, i)$.
   - Determinant measures the volume scaling factor of linear transformations.
5. **Defensive Software Engineering:**
   - Input sanitization, loop recovery, and custom exception handling create a stable user experience.

---

## 🔮 Future Enhancements

- Matrix Inverse calculation ($A^{-1}$) using `np.linalg.inv()`.
- Eigenvalues and Eigenvectors calculation using `np.linalg.eig()`.
- Reading and writing matrices from `.csv` or `.txt` files.
- Solving systems of linear equations ($Ax = B$) using `np.linalg.solve()`.

---

## 📄 License & Attribution

Developed for educational submission as part of the **QSkill Python Development Internship**.
All code is open-source under the MIT License.
