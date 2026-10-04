"""
Optional GUI Version: Matrix Operations Tool
---------------------------------------------
Built using Python's standard built-in 'tkinter' library and 'numpy'.
Can be run on Windows/Mac/Linux with standard Python 3.
Usage: python gui_matrix_operations.py
"""

import tkinter as tk
from tkinter import messagebox, ttk
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

        # Main scrollable container or simple canvas
        content_frame = tk.Frame(self.root, padx=16, pady=12)
        content_frame.pack(fill="both", expand=True)

        # Matrix A input
        lbl_a = tk.Label(content_frame, text="Matrix A (Enter rows separated by newlines, values by spaces):", font=("Helvetica", 10, "bold"))
        lbl_a.pack(anchor="w", pady=(4, 2))
        self.txt_a = tk.Text(content_frame, height=4, width=50, font=("Courier", 11), relief="solid", borderwidth=1)
        self.txt_a.pack(fill="x", pady=2)
        self.txt_a.insert("1.0", "1 2\n3 4")

        # Matrix B input
        lbl_b = tk.Label(content_frame, text="Matrix B (Required for Addition, Subtraction, Multiplication):", font=("Helvetica", 10, "bold"))
        lbl_b.pack(anchor="w", pady=(8, 2))
        self.txt_b = tk.Text(content_frame, height=4, width=50, font=("Courier", 11), relief="solid", borderwidth=1)
        self.txt_b.pack(fill="x", pady=2)
        self.txt_b.insert("1.0", "5 6\n7 8")

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
        self.txt_result.insert("1.0", "Select any operation above to view results.\n\nTips:\n- Matrix A and B default to the internship sample matrices.\n- Dimension rules are automatically validated.")

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

        self.txt_result.insert("1.0", "\n".join(lines))

    def do_add(self):
        try:
            a = self.parse_matrix(self.txt_a, "Matrix A")
            b = self.parse_matrix(self.txt_b, "Matrix B")
            if a.shape != b.shape:
                raise ValueError(f"Error: Matrix dimensions must be the same for addition.\nMatrix A is {a.shape}, Matrix B is {b.shape}.")
            res = np.add(a, b)
            self.print_result("MATRIX ADDITION (A + B)", a, b, res)
        except Exception as e:
            messagebox.showerror("Validation Error", str(e))

    def do_sub(self):
        try:
            a = self.parse_matrix(self.txt_a, "Matrix A")
            b = self.parse_matrix(self.txt_b, "Matrix B")
            if a.shape != b.shape:
                raise ValueError(f"Error: Matrix dimensions must be the same for subtraction.\nMatrix A is {a.shape}, Matrix B is {b.shape}.")
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
                raise ValueError(f"Error: Determinant can only be calculated for a square matrix.\nMatrix A shape is {a.shape}.")
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
        self.txt_a.insert("1.0", "1 2\n3 4")
        self.txt_b.insert("1.0", "5 6\n7 8")
        self.txt_result.insert("1.0", "Cleared. Ready for new input.")


def main():
    root = tk.Tk()
    app = MatrixOperationsGUI(root)
    root.mainloop()


if __name__ == "__main__":
    main()
