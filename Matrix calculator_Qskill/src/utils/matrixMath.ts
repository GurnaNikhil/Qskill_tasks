/**
 * Matrix operations and linear algebra helper functions
 * Designed to mirror NumPy's exact calculations and formatting.
 */

export type Matrix = number[][];

export interface OperationResult {
  success: boolean;
  matrix?: Matrix;
  scalar?: number;
  error?: string;
  steps?: string[];
  operationName: string;
}

/**
 * Validates dimensions and adds two matrices A + B
 */
export function addMatrices(a: Matrix, b: Matrix): OperationResult {
  const rowsA = a.length;
  const colsA = a[0]?.length || 0;
  const rowsB = b.length;
  const colsB = b[0]?.length || 0;

  if (rowsA !== rowsB || colsA !== colsB) {
    return {
      success: false,
      operationName: "Matrix Addition (A + B)",
      error: `Error: Matrix dimensions must be the same for addition. Matrix A is (${rowsA}x${colsA}), while Matrix B is (${rowsB}x${colsB}).`,
    };
  }

  const result: Matrix = [];
  const steps: string[] = [];

  for (let r = 0; r < rowsA; r++) {
    const row: number[] = [];
    for (let c = 0; c < colsA; c++) {
      const val = a[r][c] + b[r][c];
      row.push(Number(val.toFixed(4)));
      steps.push(`Row ${r + 1}, Col ${c + 1}: ${a[r][c]} + ${b[r][c]} = ${val}`);
    }
    result.push(row);
  }

  return {
    success: true,
    operationName: "Matrix Addition (A + B)",
    matrix: result,
    steps,
  };
}

/**
 * Validates dimensions and subtracts two matrices A - B
 */
export function subtractMatrices(a: Matrix, b: Matrix): OperationResult {
  const rowsA = a.length;
  const colsA = a[0]?.length || 0;
  const rowsB = b.length;
  const colsB = b[0]?.length || 0;

  if (rowsA !== rowsB || colsA !== colsB) {
    return {
      success: false,
      operationName: "Matrix Subtraction (A - B)",
      error: `Error: Matrix dimensions must be the same for subtraction. Matrix A is (${rowsA}x${colsA}), while Matrix B is (${rowsB}x${colsB}).`,
    };
  }

  const result: Matrix = [];
  const steps: string[] = [];

  for (let r = 0; r < rowsA; r++) {
    const row: number[] = [];
    for (let c = 0; c < colsA; c++) {
      const val = a[r][c] - b[r][c];
      row.push(Number(val.toFixed(4)));
      steps.push(`Row ${r + 1}, Col ${c + 1}: ${a[r][c]} - ${b[r][c]} = ${val}`);
    }
    result.push(row);
  }

  return {
    success: true,
    operationName: "Matrix Subtraction (A - B)",
    matrix: result,
    steps,
  };
}

/**
 * Validates dimensions and multiplies two matrices A x B
 */
export function multiplyMatrices(a: Matrix, b: Matrix): OperationResult {
  const rowsA = a.length;
  const colsA = a[0]?.length || 0;
  const rowsB = b.length;
  const colsB = b[0]?.length || 0;

  if (colsA !== rowsB) {
    return {
      success: false,
      operationName: "Matrix Multiplication (A x B)",
      error: `Error: Matrix A columns must equal Matrix B rows for multiplication. Matrix A has ${colsA} column(s), but Matrix B has ${rowsB} row(s).`,
    };
  }

  const result: Matrix = [];
  const steps: string[] = [];

  for (let r = 0; r < rowsA; r++) {
    const row: number[] = [];
    for (let c = 0; c < colsB; c++) {
      let sum = 0;
      const terms: string[] = [];
      for (let k = 0; k < colsA; k++) {
        const prod = a[r][k] * b[k][c];
        sum += prod;
        terms.push(`(${a[r][k]} × ${b[k][c]})`);
      }
      row.push(Number(sum.toFixed(4)));
      steps.push(`Row ${r + 1}, Col ${c + 1}: ${terms.join(" + ")} = ${sum}`);
    }
    result.push(row);
  }

  return {
    success: true,
    operationName: "Matrix Multiplication (A x B)",
    matrix: result,
    steps,
  };
}

/**
 * Calculates matrix transpose A^T
 */
export function transposeMatrix(a: Matrix): OperationResult {
  const rows = a.length;
  const cols = a[0]?.length || 0;

  if (rows === 0 || cols === 0) {
    return {
      success: false,
      operationName: "Matrix Transpose (A^T)",
      error: "Error: Cannot transpose an empty matrix.",
    };
  }

  const result: Matrix = [];
  for (let c = 0; c < cols; c++) {
    const row: number[] = [];
    for (let r = 0; r < rows; r++) {
      row.push(a[r][c]);
    }
    result.push(row);
  }

  return {
    success: true,
    operationName: "Matrix Transpose (A^T)",
    matrix: result,
    steps: [`Transposed dimension from ${rows}x${cols} to ${cols}x${rows}`],
  };
}

/**
 * Calculates determinant of an arbitrary square matrix |A|
 */
export function determinantMatrix(a: Matrix): OperationResult {
  const rows = a.length;
  const cols = a[0]?.length || 0;

  if (rows !== cols) {
    return {
      success: false,
      operationName: "Matrix Determinant |A|",
      error: `Error: Determinant can only be calculated for a square matrix. Given matrix has shape ${rows}x${cols}. Rows and columns must be equal.`,
    };
  }

  const steps: string[] = [];

  // Base 1x1
  if (rows === 1) {
    return {
      success: true,
      operationName: "Matrix Determinant |A|",
      scalar: a[0][0],
      steps: [`1x1 Matrix determinant: ${a[0][0]}`],
    };
  }

  // 2x2 formula: ad - bc
  if (rows === 2) {
    const val = a[0][0] * a[1][1] - a[0][1] * a[1][0];
    const rounded = Number(val.toFixed(4));
    steps.push(`Formula: (a × d) - (b × c)`);
    steps.push(`Calculation: (${a[0][0]} × ${a[1][1]}) - (${a[0][1]} × ${a[1][0]}) = ${a[0][0] * a[1][1]} - ${a[0][1] * a[1][0]} = ${rounded}`);
    return {
      success: true,
      operationName: "Matrix Determinant |A|",
      scalar: rounded,
      steps,
    };
  }

  // Recursive cofactor expansion for n >= 3
  const calcDet = (m: Matrix): number => {
    const n = m.length;
    if (n === 1) return m[0][0];
    if (n === 2) return m[0][0] * m[1][1] - m[0][1] * m[1][0];

    let det = 0;
    for (let c = 0; c < n; c++) {
      const subMatrix: Matrix = [];
      for (let r = 1; r < n; r++) {
        subMatrix.push(m[r].filter((_, colIndex) => colIndex !== c));
      }
      const sign = c % 2 === 0 ? 1 : -1;
      det += sign * m[0][c] * calcDet(subMatrix);
    }
    return det;
  };

  const detVal = calcDet(a);
  const rounded = Number(detVal.toFixed(4));
  steps.push(`Computed determinant for ${rows}x${cols} square matrix using cofactor expansion: ${rounded}`);

  return {
    success: true,
    operationName: "Matrix Determinant |A|",
    scalar: rounded,
    steps,
  };
}

/**
 * Format a matrix exactly as NumPy formats arrays in Python console
 */
export function formatNumPyArray(matrix: Matrix): string {
  if (!matrix || matrix.length === 0) return "[]";
  const rows = matrix.map((row) => ` [${row.map((v) => String(v).padStart(3, " ")).join(" ")}]`);
  return `[${rows.join("\n").trim()}]`;
}
