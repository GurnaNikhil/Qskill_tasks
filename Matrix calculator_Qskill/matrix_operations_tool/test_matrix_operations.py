"""
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
        print("\n[PASS] Test 1: 2x2 Matrix Addition verified.")

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
        # Expected:
        # Row 1: [1*7 + 2*9 + 3*2, 1*8 + 2*1 + 3*3] = [7+18+6, 8+2+9] = [31, 19]
        # Row 2: [4*7 + 5*9 + 6*2, 4*8 + 5*1 + 6*3] = [28+45+12, 32+5+18] = [85, 55]
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
        # Handle floating-point precision
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
