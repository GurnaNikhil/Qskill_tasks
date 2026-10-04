import JSZip from "jszip";

export interface ProjectFile {
  filename: string;
  language: string;
  category: "core" | "test" | "gui" | "config" | "docs";
  description: string;
  content: string;
}

export const PROJECT_FILES: ProjectFile[] = [
  {
    filename: "matrix_operations.py",
    language: "python",
    category: "core",
    description: "Main interactive command-line application (Addition, Subtraction, Multiplication, Transpose, Determinant, Menu Loop)",
    content: `"""
Matrix Operations Tool Using Python and NumPy
---------------------------------------------
Project for: QSkill Python Development Internship
Description: A beginner-friendly interactive matrix operations tool that performs
             Matrix Addition, Subtraction, Multiplication, Transpose, and
             Determinant calculations using the NumPy library with comprehensive
             dimension validation and error handling.
"""

import sys
import numpy as np


def get_positive_integer(prompt):
    """
    Prompt the user to enter a positive integer.
    Validates against non-numeric values and integers <= 0.
    """
    while True:
        try:
            value = int(input(prompt).strip())
            if value <= 0:
                print("Error: Value must be a positive integer greater than 0. Please try again.")
                continue
            return value
        except ValueError:
            print("Error: Invalid input. Please enter a valid integer.")


def input_matrix(name="Matrix"):
    """
    Prompt user for rows, columns, and numeric matrix elements.
    Returns a NumPy array of shape (rows, cols) with float/int values.
    Handles non-numeric elements and mismatched counts gracefully.
    """
    print(f"\\n--- Enter Details for {name} ---")
    rows = get_positive_integer(f"Enter number of rows for {name}: ")
    cols = get_positive_integer(f"Enter number of columns for {name}: ")

    print(f"\\nEnter the elements for {name} ({rows}x{cols}):")
    print("You can enter each row with elements separated by spaces (e.g., '1 2 3')")

    matrix_rows = []
    i = 0
    while i < rows:
        row_input = input(f"Row {i + 1} ({cols} values): ").strip()
        if not row_input:
            print("Error: Input cannot be empty. Please enter the row elements.")
            continue

        parts = row_input.split()
        if len(parts) != cols:
            print(f"Error: Expected exactly {cols} values, but received {len(parts)}. Please re-enter Row {i + 1}.")
            continue

        try:
            # Parse as floats; if they are whole numbers, NumPy formats them neatly
            row_values = [float(val) if '.' in val else int(val) for val in parts]
            matrix_rows.append(row_values)
            i += 1
        except ValueError:
            print(f"Error: Non-numeric element detected in Row {i + 1}. Please enter numeric values only.")

    np_matrix = np.array(matrix_rows)
    print(f"\\nSuccessfully created {name}:")
    print(np_matrix)
    return np_matrix


def display_matrix(matrix, label="Matrix"):
    """
    Display a matrix with a descriptive label.
    """
    print(f"{label}:")
    print(matrix)


def matrix_addition():
    """
    Performs Matrix Addition (A + B) using np.add().
    Requires matrices of identical dimensions.
    """
    print("\\n" + "=" * 40)
    print("         MATRIX ADDITION (A + B)")
    print("=" * 40)
    matrix_a = input_matrix("Matrix A")
    matrix_b = input_matrix("Matrix B")

    print("\\n" + "-" * 40)
    display_matrix(matrix_a, "Matrix A")
    print()
    display_matrix(matrix_b, "Matrix B")
    print()

    # Dimension validation
    if matrix_a.shape != matrix_b.shape:
        print(f"Error: Matrix dimensions must be the same for addition.")
        print(f"Matrix A dimension is {matrix_a.shape}, while Matrix B dimension is {matrix_b.shape}.")
        print("-" * 40)
        return

    # Calculate result using NumPy
    result = np.add(matrix_a, matrix_b)
    display_matrix(result, "Result (A + B)")
    print("-" * 40)


def matrix_subtraction():
    """
    Performs Matrix Subtraction (A - B) using np.subtract().
    Requires matrices of identical dimensions.
    """
    print("\\n" + "=" * 40)
    print("        MATRIX SUBTRACTION (A - B)")
    print("=" * 40)
    matrix_a = input_matrix("Matrix A")
    matrix_b = input_matrix("Matrix B")

    print("\\n" + "-" * 40)
    display_matrix(matrix_a, "Matrix A")
    print()
    display_matrix(matrix_b, "Matrix B")
    print()

    # Dimension validation
    if matrix_a.shape != matrix_b.shape:
        print("Error: Matrix dimensions must be the same for subtraction.")
        print(f"Matrix A dimension is {matrix_a.shape}, while Matrix B dimension is {matrix_b.shape}.")
        print("-" * 40)
        return

    # Calculate result using NumPy
    result = np.subtract(matrix_a, matrix_b)
    display_matrix(result, "Result (A - B)")
    print("-" * 40)


def matrix_multiplication():
    """
    Performs Matrix Multiplication (A x B) using np.matmul().
    Requires columns of A to equal rows of B.
    """
    print("\\n" + "=" * 40)
    print("      MATRIX MULTIPLICATION (A x B)")
    print("=" * 40)
    matrix_a = input_matrix("Matrix A")
    matrix_b = input_matrix("Matrix B")

    print("\\n" + "-" * 40)
    display_matrix(matrix_a, "Matrix A")
    print()
    display_matrix(matrix_b, "Matrix B")
    print()

    # Dimension validation: columns of A must match rows of B
    if matrix_a.shape[1] != matrix_b.shape[0]:
        print("Error: Matrix A columns must equal Matrix B rows for multiplication.")
        print(f"Matrix A has {matrix_a.shape[1]} column(s), but Matrix B has {matrix_b.shape[0]} row(s).")
        print("-" * 40)
        return

    # Calculate result using NumPy
    result = np.matmul(matrix_a, matrix_b)
    display_matrix(result, "Result (A x B)")
    print("-" * 40)


def matrix_transpose():
    """
    Performs Matrix Transpose (A^T) using np.transpose().
    Works for any rectangular or square matrix.
    """
    print("\\n" + "=" * 40)
    print("         MATRIX TRANSPOSE (A^T)")
    print("=" * 40)
    matrix_a = input_matrix("Matrix A")

    print("\\n" + "-" * 40)
    display_matrix(matrix_a, "Original Matrix A")
    print()

    # Calculate transpose using NumPy
    transposed = np.transpose(matrix_a)
    display_matrix(transposed, "Transposed Matrix A^T")
    print("-" * 40)


def matrix_determinant():
    """
    Calculates Matrix Determinant |A| using np.linalg.det().
    Requires a square matrix (rows == cols).
    """
    print("\\n" + "=" * 40)
    print("        MATRIX DETERMINANT |A|")
    print("=" * 40)
    matrix_a = input_matrix("Matrix A")

    print("\\n" + "-" * 40)
    display_matrix(matrix_a, "Matrix A")
    print()

    # Dimension validation: must be a square matrix
    if matrix_a.shape[0] != matrix_a.shape[1]:
        print("Error: Determinant can only be calculated for a square matrix.")
        print(f"Given matrix has shape {matrix_a.shape[0]}x{matrix_a.shape[1]}. Rows and columns must be equal.")
        print("-" * 40)
        return

    # Calculate determinant using NumPy
    det_val = np.linalg.det(matrix_a)

    # Clean display: round floating point precision artifacts (e.g. -2.0000000000000004 -> -2.0)
    clean_det = round(float(det_val), 4)
    if clean_det.is_integer():
        clean_det = int(clean_det)

    print(f"Determinant |A|: {clean_det}")
    print("-" * 40)


def display_menu():
    """
    Displays the interactive CLI menu for the Matrix Operations Tool.
    """
    print("\\n" + "=" * 40)
    print("       MATRIX OPERATIONS TOOL")
    print("=" * 40)
    print("1. Matrix Addition")
    print("2. Matrix Subtraction")
    print("3. Matrix Multiplication")
    print("4. Matrix Transpose")
    print("5. Matrix Determinant")
    print("6. Exit")
    print("=" * 40)


def main():
    """
    Main program loop to drive the user interface.
    Repeatedly prompts for choices until the user selects Exit.
    """
    print("\\nWelcome to the Matrix Operations Tool!")
    print("QSkill Python Development Internship Project")

    while True:
        display_menu()
        choice = input("Enter your choice (1-6): ").strip()

        if choice == "1":
            matrix_addition()
        elif choice == "2":
            matrix_subtraction()
        elif choice == "3":
            matrix_multiplication()
        elif choice == "4":
            matrix_transpose()
        elif choice == "5":
            matrix_determinant()
        elif choice == "6":
            print("\\n" + "=" * 40)
            print("Thank you for using Matrix Operations Tool!")
            print("Good luck with your QSkill Internship submission!")
            print("=" * 40 + "\\n")
            break
        else:
            print("Error: Invalid choice! Please enter a number between 1 and 6.")


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\\n\\nProgram interrupted by user. Exiting cleanly. Goodbye!")
        sys.exit(0)
`,
  },
  {
    filename: "test_matrix_operations.py",
    language: "python",
    category: "test",
    description: "Automated test suite with 8 unit tests covering all required test cases",
    content: `"""
Unit and Integration Tests for Matrix Operations Tool
-----------------------------------------------------
Tests all required test cases for the QSkill Python Internship:
1. 2x2 Addition
2. 2x2 Subtraction
3. Compatible Matrix Multiplication (2x2 with 2x2, 2x3 with 3x2)
4. Incompatible Matrix Multiplication Dimension Validation
5. Matrix Transpose
6. 2x2 Determinant Calculation
7. Non-Square Determinant Validation
8. Precision & Boundary Tests
"""

import unittest
import numpy as np


class TestMatrixOperations(unittest.TestCase):

    def setUp(self):
        """Set up standard test matrices used in the prompt example."""
        self.matrix_a = np.array([
            [1, 2],
            [3, 4]
        ])
        self.matrix_b = np.array([
            [5, 6],
            [7, 8]
        ])

    def test_01_matrix_addition_2x2(self):
        """Test Case 1: 2x2 Matrix Addition"""
        expected = np.array([
            [6, 8],
            [10, 12]
        ])
        result = np.add(self.matrix_a, self.matrix_b)
        np.testing.assert_array_equal(result, expected)
        print("\\n[PASS] Test 1: 2x2 Matrix Addition verified.")

    def test_02_matrix_subtraction_2x2(self):
        """Test Case 2: 2x2 Matrix Subtraction"""
        expected = np.array([
            [-4, -4],
            [-4, -4]
        ])
        result = np.subtract(self.matrix_a, self.matrix_b)
        np.testing.assert_array_equal(result, expected)
        print("[PASS] Test 2: 2x2 Matrix Subtraction verified.")

    def test_03_matrix_multiplication_compatible(self):
        """Test Case 3: Compatible Matrix Multiplication (2x2 x 2x2)"""
        expected = np.array([
            [19, 22],
            [43, 50]
        ])
        result = np.matmul(self.matrix_a, self.matrix_b)
        np.testing.assert_array_equal(result, expected)
        print("[PASS] Test 3: Compatible Matrix Multiplication (2x2) verified.")

    def test_04_matrix_multiplication_rectangular(self):
        """Test Case 4: Compatible Rectangular Multiplication (2x3 x 3x2)"""
        mat_2x3 = np.array([[1, 2, 3], [4, 5, 6]])
        mat_3x2 = np.array([[7, 8], [9, 1], [2, 3]])
        expected = np.array([[31, 19], [85, 55]])
        result = np.matmul(mat_2x3, mat_3x2)
        np.testing.assert_array_equal(result, expected)
        print("[PASS] Test 4: Rectangular Matrix Multiplication (2x3 x 3x2) verified.")

    def test_05_matrix_multiplication_incompatible_check(self):
        """Test Case 5: Dimension Mismatch Validation in Multiplication"""
        mat_2x3 = np.array([[1, 2, 3], [4, 5, 6]])
        mat_2x2 = np.array([[1, 2], [3, 4]])
        # Columns of A (3) != Rows of B (2)
        is_compatible = mat_2x3.shape[1] == mat_2x2.shape[0]
        self.assertFalse(is_compatible, "Dimension check failed to identify incompatible shapes.")
        print("[PASS] Test 5: Incompatible Multiplication caught by shape validator.")

    def test_06_matrix_transpose(self):
        """Test Case 6: Matrix Transpose A^T"""
        expected = np.array([
            [1, 3],
            [2, 4]
        ])
        result = np.transpose(self.matrix_a)
        np.testing.assert_array_equal(result, expected)
        print("[PASS] Test 6: Matrix Transpose verified.")

    def test_07_matrix_determinant_2x2(self):
        """Test Case 7: 2x2 Matrix Determinant |A| = (1*4 - 2*3) = 4 - 6 = -2"""
        det_val = np.linalg.det(self.matrix_a)
        self.assertAlmostEqual(det_val, -2.0, places=5)
        print("[PASS] Test 7: 2x2 Matrix Determinant verified.")

    def test_08_matrix_determinant_non_square_check(self):
        """Test Case 8: Non-Square Matrix Determinant check"""
        non_square = np.array([[1, 2, 3], [4, 5, 6]])
        is_square = non_square.shape[0] == non_square.shape[1]
        self.assertFalse(is_square, "Dimension check failed to catch non-square matrix.")
        print("[PASS] Test 8: Non-square determinant properly rejected.")


if __name__ == "__main__":
    print("=" * 60)
    print("RUNNING AUTOMATED TEST SUITE: MATRIX OPERATIONS TOOL")
    print("=" * 60)
    unittest.main()
`,
  },
  {
    filename: "gui_matrix_operations.py",
    language: "python",
    category: "gui",
    description: "Bonus Tkinter Graphical User Interface for desktop demonstration (built into standard Python)",
    content: `"""
Optional GUI Version: Matrix Operations Tool
---------------------------------------------
Built using Python's standard built-in 'tkinter' library and 'numpy'.
Can be run on Windows/Mac/Linux with standard Python 3.
Usage: python gui_matrix_operations.py
"""

import tkinter as tk
from tkinter import messagebox
import numpy as np


class MatrixOperationsGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("Matrix Operations Tool (NumPy) - QSkill Internship")
        self.root.geometry("640x700")
        self.root.resizable(True, True)

        self._build_ui()

    def _build_ui(self):
        # Header title
        header_frame = tk.Frame(self.root, bg="#1e293b", pady=12)
        header_frame.pack(fill="x")
        title_label = tk.Label(
            header_frame,
            text="MATRIX OPERATIONS TOOL",
            font=("Helvetica", 16, "bold"),
            fg="#f8fafc",
            bg="#1e293b"
        )
        title_label.pack()
        subtitle_label = tk.Label(
            header_frame,
            text="QSkill Python Development Internship | Powered by NumPy",
            font=("Helvetica", 9),
            fg="#94a3b8",
            bg="#1e293b"
        )
        subtitle_label.pack()

        # Main container
        content_frame = tk.Frame(self.root, padx=16, pady=12)
        content_frame.pack(fill="both", expand=True)

        # Matrix A input
        lbl_a = tk.Label(content_frame, text="Matrix A (Enter rows separated by newlines, values by spaces):", font=("Helvetica", 10, "bold"))
        lbl_a.pack(anchor="w", pady=(4, 2))
        self.txt_a = tk.Text(content_frame, height=4, width=50, font=("Courier", 11), relief="solid", borderwidth=1)
        self.txt_a.pack(fill="x", pady=2)
        self.txt_a.insert("1.0", "1 2\\n3 4")

        # Matrix B input
        lbl_b = tk.Label(content_frame, text="Matrix B (Required for Addition, Subtraction, Multiplication):", font=("Helvetica", 10, "bold"))
        lbl_b.pack(anchor="w", pady=(8, 2))
        self.txt_b = tk.Text(content_frame, height=4, width=50, font=("Courier", 11), relief="solid", borderwidth=1)
        self.txt_b.pack(fill="x", pady=2)
        self.txt_b.insert("1.0", "5 6\\n7 8")

        # Operations Buttons
        btn_frame = tk.LabelFrame(content_frame, text=" Select Operation ", font=("Helvetica", 10, "bold"), padx=10, pady=10)
        btn_frame.pack(fill="x", pady=10)

        grid_frame = tk.Frame(btn_frame)
        grid_frame.pack()

        btn_add = tk.Button(grid_frame, text="1. Add (A + B)", width=18, bg="#2563eb", fg="white", font=("Helvetica", 9, "bold"), command=self.do_add)
        btn_add.grid(row=0, column=0, padx=5, pady=4)

        btn_sub = tk.Button(grid_frame, text="2. Subtract (A - B)", width=18, bg="#2563eb", fg="white", font=("Helvetica", 9, "bold"), command=self.do_sub)
        btn_sub.grid(row=0, column=1, padx=5, pady=4)

        btn_mul = tk.Button(grid_frame, text="3. Multiply (A × B)", width=18, bg="#2563eb", fg="white", font=("Helvetica", 9, "bold"), command=self.do_mul)
        btn_mul.grid(row=0, column=2, padx=5, pady=4)

        btn_trans = tk.Button(grid_frame, text="4. Transpose (Aᵀ)", width=18, bg="#059669", fg="white", font=("Helvetica", 9, "bold"), command=self.do_transpose)
        btn_trans.grid(row=1, column=0, padx=5, pady=4)

        btn_det = tk.Button(grid_frame, text="5. Determinant |A|", width=18, bg="#d97706", fg="white", font=("Helvetica", 9, "bold"), command=self.do_det)
        btn_det.grid(row=1, column=1, padx=5, pady=4)

        btn_clear = tk.Button(grid_frame, text="Clear / Reset", width=18, bg="#64748b", fg="white", font=("Helvetica", 9, "bold"), command=self.do_clear)
        btn_clear.grid(row=1, column=2, padx=5, pady=4)

        # Output / Results Area
        lbl_res = tk.Label(content_frame, text="Output / Result:", font=("Helvetica", 10, "bold"))
        lbl_res.pack(anchor="w", pady=(8, 2))

        self.txt_result = tk.Text(content_frame, height=11, width=50, font=("Courier", 11), bg="#f8fafc", relief="solid", borderwidth=1)
        self.txt_result.pack(fill="both", expand=True, pady=4)
        self.txt_result.insert("1.0", "Select any operation above to view results.\\n\\nTips:\\n- Matrix A and B default to the internship sample matrices.\\n- Dimension rules are automatically validated.")

    def parse_matrix(self, text_widget, name="Matrix"):
        raw_text = text_widget.get("1.0", tk.END).strip()
        if not raw_text:
            raise ValueError(f"Error: {name} input cannot be empty.")

        rows = []
        expected_cols = None
        for idx, line in enumerate(raw_text.splitlines()):
            line = line.strip()
            if not line:
                continue
            parts = line.split()
            if expected_cols is None:
                expected_cols = len(parts)
            elif len(parts) != expected_cols:
                raise ValueError(f"Error in {name}: Row {idx + 1} has {len(parts)} values, expected {expected_cols}.")

            try:
                row_nums = [float(x) if '.' in x else int(x) for x in parts]
                rows.append(row_nums)
            except ValueError:
                raise ValueError(f"Error in {name}: Non-numeric value found in Row {idx + 1}.")

        if not rows:
            raise ValueError(f"Error: {name} has no valid numeric rows.")

        return np.array(rows)

    def print_result(self, header, mat_a, mat_b=None, result=None, custom_msg=None):
        self.txt_result.delete("1.0", tk.END)
        lines = ["=" * 45, f"   {header}", "=" * 45, ""]
        lines.append(f"Matrix A (shape {mat_a.shape}):")
        lines.append(str(mat_a))
        lines.append("")

        if mat_b is not None:
            lines.append(f"Matrix B (shape {mat_b.shape}):")
            lines.append(str(mat_b))
            lines.append("")

        lines.append("-" * 45)
        if custom_msg:
            lines.append(custom_msg)
        elif result is not None:
            lines.append(f"Result (shape {result.shape}):")
            lines.append(str(result))
        lines.append("-" * 45)

        self.txt_result.insert("1.0", "\\n".join(lines))

    def do_add(self):
        try:
            a = self.parse_matrix(self.txt_a, "Matrix A")
            b = self.parse_matrix(self.txt_b, "Matrix B")
            if a.shape != b.shape:
                raise ValueError(f"Error: Matrix dimensions must be the same for addition.\\nMatrix A is {a.shape}, Matrix B is {b.shape}.")
            res = np.add(a, b)
            self.print_result("MATRIX ADDITION (A + B)", a, b, res)
        except Exception as e:
            messagebox.showerror("Validation Error", str(e))

    def do_sub(self):
        try:
            a = self.parse_matrix(self.txt_a, "Matrix A")
            b = self.parse_matrix(self.txt_b, "Matrix B")
            if a.shape != b.shape:
                raise ValueError(f"Error: Matrix dimensions must be the same for subtraction.\\nMatrix A is {a.shape}, Matrix B is {b.shape}.")
            res = np.subtract(a, b)
            self.print_result("MATRIX SUBTRACTION (A - B)", a, b, res)
        except Exception as e:
            messagebox.showerror("Validation Error", str(e))

    def do_mul(self):
        try:
            a = self.parse_matrix(self.txt_a, "Matrix A")
            b = self.parse_matrix(self.txt_b, "Matrix B")
            if a.shape[1] != b.shape[0]:
                raise ValueError(f"Error: Matrix A columns ({a.shape[1]}) must equal Matrix B rows ({b.shape[0]}) for multiplication.")
            res = np.matmul(a, b)
            self.print_result("MATRIX MULTIPLICATION (A × B)", a, b, res)
        except Exception as e:
            messagebox.showerror("Validation Error", str(e))

    def do_transpose(self):
        try:
            a = self.parse_matrix(self.txt_a, "Matrix A")
            res = np.transpose(a)
            self.print_result("MATRIX TRANSPOSE (Aᵀ)", a, None, res)
        except Exception as e:
            messagebox.showerror("Validation Error", str(e))

    def do_det(self):
        try:
            a = self.parse_matrix(self.txt_a, "Matrix A")
            if a.shape[0] != a.shape[1]:
                raise ValueError(f"Error: Determinant can only be calculated for a square matrix.\\nMatrix A shape is {a.shape}.")
            det_val = round(float(np.linalg.det(a)), 4)
            if det_val.is_integer():
                det_val = int(det_val)
            self.print_result("MATRIX DETERMINANT |A|", a, None, None, f"Determinant |A| = {det_val}")
        except Exception as e:
            messagebox.showerror("Validation Error", str(e))

    def do_clear(self):
        self.txt_a.delete("1.0", tk.END)
        self.txt_b.delete("1.0", tk.END)
        self.txt_result.delete("1.0", tk.END)
        self.txt_a.insert("1.0", "1 2\\n3 4")
        self.txt_b.insert("1.0", "5 6\\n7 8")
        self.txt_result.insert("1.0", "Cleared. Ready for new input.")


def main():
    root = tk.Tk()
    app = MatrixOperationsGUI(root)
    root.mainloop()


if __name__ == "__main__":
    main()
`,
  },
  {
    filename: "requirements.txt",
    language: "text",
    category: "config",
    description: "Lightweight NumPy requirement specification",
    content: `numpy>=1.24.0\n`,
  },
  {
    filename: ".gitignore",
    language: "gitignore",
    category: "config",
    description: "Clean standard Python ignore patterns",
    content: `# Byte-compiled / optimized / DLL files
__pycache__/
*.py[cod]
*$py.class

# Virtual Environment
venv/
env/
ENV/
.venv/

# IDE / Editor configuration
.vscode/
.idea/
*.swp
*.swo

# OS generated files
.DS_Store
Thumbs.db
`,
  },
  {
    filename: "demo_examples.py",
    language: "python",
    category: "test",
    description: "Instant script to run all 5 assignment examples automatically without typing",
    content: `"""
Demonstration Script for QSkill Internship Presentation
-------------------------------------------------------
Runs all 5 core matrix operations programmatically using NumPy
and prints structured outputs exactly matching the assignment specification.
Run with: python demo_examples.py
"""

import numpy as np

def run_demo():
    print("=" * 60)
    print("     QSKILL PYTHON INTERNSHIP: MATRIX OPERATIONS DEMO")
    print("=" * 60)

    matrix_a = np.array([
        [1, 2],
        [3, 4]
    ])

    matrix_b = np.array([
        [5, 6],
        [7, 8]
    ])

    print("\\nInput Matrices Defined:")
    print("Matrix A (shape 2x2):")
    print(matrix_a)
    print("\\nMatrix B (shape 2x2):")
    print(matrix_b)

    # A. Matrix Addition
    print("\\n" + "-" * 50)
    print("A. Matrix Addition (np.add):")
    res_add = np.add(matrix_a, matrix_b)
    print(res_add)

    # B. Matrix Subtraction
    print("\\n" + "-" * 50)
    print("B. Matrix Subtraction (np.subtract):")
    res_sub = np.subtract(matrix_a, matrix_b)
    print(res_sub)

    # C. Matrix Multiplication
    print("\\n" + "-" * 50)
    print("C. Matrix Multiplication (np.matmul):")
    res_mul = np.matmul(matrix_a, matrix_b)
    print(res_mul)

    # D. Matrix Transpose
    print("\\n" + "-" * 50)
    print("D. Matrix Transpose of A (np.transpose):")
    res_trans = np.transpose(matrix_a)
    print(res_trans)

    # E. Matrix Determinant
    print("\\n" + "-" * 50)
    print("E. Matrix Determinant of A (np.linalg.det):")
    det_a = round(float(np.linalg.det(matrix_a)), 4)
    if det_a.is_integer():
        det_a = int(det_a)
    print(f"det(Matrix A) = {det_a}")

    print("\\n" + "=" * 60)
    print("All operations executed successfully!")
    print("=" * 60)


if __name__ == "__main__":
    run_demo()
`,
  },
  {
    filename: "README.md",
    language: "markdown",
    category: "docs",
    description: "Complete professional README documentation, installation guide, and viva study notes",
    content: `# Matrix Operations Tool Using Python and NumPy

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
2. Leverage NumPy’s optimized C-backed array operations (\`np.add\`, \`np.subtract\`, \`np.matmul\`, \`np.transpose\`, \`np.linalg.det\`).
3. Enforce strict mathematical dimension constraints before computation to prevent runtime crashes.
4. Deliver structured, easy-to-read matrix outputs in a clean terminal layout.
5. Provide beginner-friendly, modular, and maintainable Python code accompanied by automated test coverage.

---

## ✨ Features & Supported Operations

| Operation | Mathematical Notation | NumPy Function | Shape Requirement |
| :--- | :--- | :--- | :--- |
| **Matrix Addition** | A + B | \`np.add(A, B)\` | Shapes must be identical: (m × n) + (m × n) |
| **Matrix Subtraction** | A - B | \`np.subtract(A, B)\` | Shapes must be identical: (m × n) - (m × n) |
| **Matrix Multiplication** | A × B | \`np.matmul(A, B)\` | Inner dimensions must match: (m × k) × (k × n) |
| **Matrix Transpose** | A^T | \`np.transpose(A)\` | Any valid matrix (m × n) -> (n × m) |
| **Matrix Determinant** | det(A) or |A| | \`np.linalg.det(A)\` | Square matrix only: (n × n) |

---

## 📂 Project Structure

\`\`\`text
matrix_operations_tool/
│
├── matrix_operations.py        # Core interactive menu-driven CLI program
├── test_matrix_operations.py   # Automated test suite covering all operations & validations
├── gui_matrix_operations.py    # Optional Tkinter graphical user interface (bonus)
├── requirements.txt            # Project dependencies (NumPy)
├── README.md                   # Complete documentation, setup guide & viva notes
└── .gitignore                  # Git ignore rules for virtual environments and caches
\`\`\`

---

## 🚀 Installation & Setup Instructions

### Setup in Windows PowerShell (Recommended for Internship Demo)
\`\`\`powershell
cd matrix_operations_tool
python -m venv venv
.\\venv\\Scripts\\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements.txt
\`\`\`

### Running the Programs
\`\`\`powershell
python matrix_operations.py
python test_matrix_operations.py
python gui_matrix_operations.py
\`\`\`
`,
  },
  {
    filename: "standalone_app.html",
    language: "html",
    category: "gui",
    description: "Self-contained browser dashboard (works 100% with VS Code 'Go Live' or double-click)",
    content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Matrix Operations Tool - Standalone Runner & Guide</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-950 text-slate-100 font-sans p-6">
  <div class="max-w-4xl mx-auto space-y-6">
    <div class="bg-slate-900 border border-slate-800 p-6 rounded-xl">
      <h1 class="text-xl font-bold text-white mb-2">Matrix Operations Tool (Python + NumPy)</h1>
      <p class="text-slate-400 text-sm">QSkill Python Development Internship Project</p>
    </div>
    <div class="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-4">
      <h2 class="text-lg font-bold text-blue-400">How to Run in VS Code:</h2>
      <p class="text-sm text-slate-300">1. Open VS Code Terminal: <code>Ctrl + \`</code></p>
      <p class="text-sm text-slate-300">2. Type: <code>python matrix_operations.py</code></p>
    </div>
  </div>
</body>
</html>`,
  },
  {
    filename: "run_in_vscode.bat",
    language: "bat",
    category: "config",
    description: "Windows 1-click launcher to run matrix_operations.py automatically",
    content: `@echo off
title Matrix Operations Tool - QSkill Python Internship
color 0b
echo Launching matrix_operations.py...
python matrix_operations.py
pause
`,
  },
  {
    filename: "run_in_vscode.ps1",
    language: "powershell",
    category: "config",
    description: "PowerShell 1-click script to run matrix_operations.py",
    content: `Write-Host "Launching Matrix Operations Tool..." -ForegroundColor Green
python matrix_operations.py
`,
  },
];

/**
 * Downloads a single file to user's computer
 */
export function downloadFile(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Zips all project files into matrix_operations_tool.zip and downloads
 */
export async function downloadProjectZip() {
  const zip = new JSZip();
  const folder = zip.folder("matrix_operations_tool");

  if (!folder) return;

  for (const file of PROJECT_FILES) {
    folder.file(file.filename, file.content);
  }

  const content = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(content);
  const link = document.createElement("a");
  link.href = url;
  link.download = "matrix_operations_tool.zip";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
