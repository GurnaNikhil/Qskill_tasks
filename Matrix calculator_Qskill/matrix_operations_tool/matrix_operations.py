"""
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
    print(f"\n--- Enter Details for {name} ---")
    rows = get_positive_integer(f"Enter number of rows for {name}: ")
    cols = get_positive_integer(f"Enter number of columns for {name}: ")

    print(f"\nEnter matrix elements for {name} ({rows}x{cols}):")
    print(f"(Enter each row with {cols} space-separated numbers, e.g., '1 2')")

    matrix_rows = []
    i = 0
    while i < rows:
        row_input = input(f"Enter elements for Row {i + 1} ({cols} values): ").strip()
        if not row_input:
            print("Error: Input cannot be empty. Please enter the row elements.")
            continue

        parts = row_input.split()
        if len(parts) != cols:
            print(f"Error: Expected exactly {cols} values, but received {len(parts)}. Please re-enter Row {i + 1}.")
            continue

        try:
            # Parse as floats if decimals exist, otherwise integers
            row_values = [float(val) if '.' in val else int(val) for val in parts]
            matrix_rows.append(row_values)
            i += 1
        except ValueError:
            print(f"Error: Non-numeric element detected. Please enter numeric values only.")

    np_matrix = np.array(matrix_rows)
    print(f"\n{name}:")
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
    print("\n" + "=" * 40)
    print("         MATRIX ADDITION (A + B)")
    print("=" * 40)
    matrix_a = input_matrix("Matrix A")
    matrix_b = input_matrix("Matrix B")

    print("\n" + "-" * 40)
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
    print("\n" + "=" * 40)
    print("        MATRIX SUBTRACTION (A - B)")
    print("=" * 40)
    matrix_a = input_matrix("Matrix A")
    matrix_b = input_matrix("Matrix B")

    print("\n" + "-" * 40)
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
    print("\n" + "=" * 40)
    print("      MATRIX MULTIPLICATION (A x B)")
    print("=" * 40)
    matrix_a = input_matrix("Matrix A")
    matrix_b = input_matrix("Matrix B")

    print("\n" + "-" * 40)
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
    print("\n" + "=" * 40)
    print("         MATRIX TRANSPOSE (A^T)")
    print("=" * 40)
    matrix_a = input_matrix("Matrix A")

    print("\n" + "-" * 40)
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
    print("\n" + "=" * 40)
    print("        MATRIX DETERMINANT |A|")
    print("=" * 40)
    matrix_a = input_matrix("Matrix A")

    print("\n" + "-" * 40)
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
    print("\n" + "=" * 40)
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
    print("\nWelcome to the Matrix Operations Tool!")
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
            print("\n" + "=" * 40)
            print("Thank you for using Matrix Operations Tool!")
            print("Good luck with your QSkill Internship submission!")
            print("=" * 40 + "\n")
            break
        else:
            print("Error: Invalid choice! Please enter a number between 1 and 6.")


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\nProgram interrupted by user. Exiting cleanly. Goodbye!")
        sys.exit(0)
