"""
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

    # 1. Define standard assignment matrices
    matrix_a = np.array([
        [1, 2],
        [3, 4]
    ])

    matrix_b = np.array([
        [5, 6],
        [7, 8]
    ])

    print("\nInput Matrices Defined:")
    print("Matrix A (shape 2x2):")
    print(matrix_a)
    print("\nMatrix B (shape 2x2):")
    print(matrix_b)

    # A. Matrix Addition
    print("\n" + "-" * 50)
    print("A. Matrix Addition (np.add):")
    res_add = np.add(matrix_a, matrix_b)
    print(res_add)

    # B. Matrix Subtraction
    print("\n" + "-" * 50)
    print("B. Matrix Subtraction (np.subtract):")
    res_sub = np.subtract(matrix_a, matrix_b)
    print(res_sub)

    # C. Matrix Multiplication
    print("\n" + "-" * 50)
    print("C. Matrix Multiplication (np.matmul):")
    res_mul = np.matmul(matrix_a, matrix_b)
    print(res_mul)

    # D. Matrix Transpose
    print("\n" + "-" * 50)
    print("D. Matrix Transpose of A (np.transpose):")
    res_trans = np.transpose(matrix_a)
    print(res_trans)

    # E. Matrix Determinant
    print("\n" + "-" * 50)
    print("E. Matrix Determinant of A (np.linalg.det):")
    det_a = round(float(np.linalg.det(matrix_a)), 4)
    if det_a.is_integer():
        det_a = int(det_a)
    print(f"det(Matrix A) = {det_a}")

    print("\n" + "=" * 60)
    print("All operations executed successfully!")
    print("=" * 60)


if __name__ == "__main__":
    run_demo()
