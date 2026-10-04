import React, { useState } from "react";
import {
  Matrix,
  addMatrices,
  subtractMatrices,
  multiplyMatrices,
  transposeMatrix,
  determinantMatrix,
  formatNumPyArray,
  OperationResult,
} from "../utils/matrixMath";
import {
  Plus,
  Minus,
  X as TimesIcon,
  RotateCw,
  Hash,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Copy,
  Check,
} from "lucide-react";

export const VisualCalculator: React.FC = () => {
  // Matrix A state
  const [rowsA, setRowsA] = useState(2);
  const [colsA, setColsA] = useState(2);
  const [matrixA, setMatrixA] = useState<Matrix>([
    [1, 2],
    [3, 4],
  ]);

  // Matrix B state
  const [rowsB, setRowsB] = useState(2);
  const [colsB, setColsB] = useState(2);
  const [matrixB, setMatrixB] = useState<Matrix>([
    [5, 6],
    [7, 8],
  ]);

  // Current calculation result
  const [result, setResult] = useState<OperationResult | null>(() => addMatrices(matrixA, matrixB));
  const [copiedPython, setCopiedPython] = useState(false);

  // Resize helpers
  const resizeMatrix = (
    current: Matrix,
    newRows: number,
    newCols: number,
    setter: (m: Matrix) => void
  ) => {
    const updated: Matrix = [];
    for (let r = 0; r < newRows; r++) {
      const row: number[] = [];
      for (let c = 0; c < newCols; c++) {
        row.push(current[r]?.[c] ?? 0);
      }
      updated.push(row);
    }
    setter(updated);
  };

  const handleRowsAChange = (val: number) => {
    setRowsA(val);
    resizeMatrix(matrixA, val, colsA, setMatrixA);
  };

  const handleColsAChange = (val: number) => {
    setColsA(val);
    resizeMatrix(matrixA, rowsA, val, setMatrixA);
  };

  const handleRowsBChange = (val: number) => {
    setRowsB(val);
    resizeMatrix(matrixB, val, colsB, setMatrixB);
  };

  const handleColsBChange = (val: number) => {
    setColsB(val);
    resizeMatrix(matrixB, rowsB, val, setMatrixB);
  };

  const updateCellA = (r: number, c: number, valueStr: string) => {
    const num = parseFloat(valueStr) || 0;
    const clone = matrixA.map((row) => [...row]);
    clone[r][c] = num;
    setMatrixA(clone);
  };

  const updateCellB = (r: number, c: number, valueStr: string) => {
    const num = parseFloat(valueStr) || 0;
    const clone = matrixB.map((row) => [...row]);
    clone[r][c] = num;
    setMatrixB(clone);
  };

  // Preset loaders
  const loadInternshipDefaults = () => {
    setRowsA(2);
    setColsA(2);
    setMatrixA([
      [1, 2],
      [3, 4],
    ]);
    setRowsB(2);
    setColsB(2);
    setMatrixB([
      [5, 6],
      [7, 8],
    ]);
  };

  const load3x3Example = () => {
    setRowsA(3);
    setColsA(3);
    setMatrixA([
      [2, -1, 0],
      [1, 3, 2],
      [0, 1, 4],
    ]);
    setRowsB(3);
    setColsB(3);
    setMatrixB([
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ]);
  };

  const loadRectangularMultiplication = () => {
    setRowsA(2);
    setColsA(3);
    setMatrixA([
      [1, 2, 3],
      [4, 5, 6],
    ]);
    setRowsB(3);
    setColsB(2);
    setMatrixB([
      [7, 8],
      [9, 1],
      [2, 3],
    ]);
  };

  // Compatibility flags
  const canAddOrSub = rowsA === rowsB && colsA === colsB;
  const canMultiply = colsA === rowsB;
  const isSquareA = rowsA === colsA;
  const isSquareB = rowsB === colsB;

  // Python code equivalent generator
  const getPythonSnippet = () => {
    const strA = JSON.stringify(matrixA);
    const strB = JSON.stringify(matrixB);
    return `import numpy as np

# Define matrices
matrix_a = np.array(${strA})
matrix_b = np.array(${strB})

# Selected Operation: ${result?.operationName || "Matrix Addition"}
${
  result?.operationName.includes("Addition")
    ? "result = np.add(matrix_a, matrix_b)"
    : result?.operationName.includes("Subtraction")
    ? "result = np.subtract(matrix_a, matrix_b)"
    : result?.operationName.includes("Multiplication")
    ? "result = np.matmul(matrix_a, matrix_b)"
    : result?.operationName.includes("Transpose")
    ? "result = np.transpose(matrix_a)"
    : "result = np.linalg.det(matrix_a)"
}

print(result)`;
  };

  const copyPythonCode = () => {
    navigator.clipboard.writeText(getPythonSnippet());
    setCopiedPython(true);
    setTimeout(() => setCopiedPython(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner and Preset Selector */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-md">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-400" />
            Interactive Visual Matrix Calculator
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure dimensions and elements dynamically to inspect matrix math, step-by-step arithmetic, and dimension checks.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Quick Presets:</span>
          <button
            onClick={loadInternshipDefaults}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-blue-300 border border-blue-500/30 px-2.5 py-1.5 rounded-lg transition"
          >
            Assignment 2×2 Example
          </button>
          <button
            onClick={loadRectangularMultiplication}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-2.5 py-1.5 rounded-lg transition"
          >
            2×3 by 3×2 Multiply
          </button>
          <button
            onClick={load3x3Example}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-2.5 py-1.5 rounded-lg transition"
          >
            3×3 Matrix
          </button>
        </div>
      </div>

      {/* Grid: Matrix A & Matrix B Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Matrix A Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                A
              </span>
              <h3 className="font-semibold text-slate-200 text-sm">Matrix A</h3>
              <span className="text-xs font-mono text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-900/50">
                {rowsA} × {colsA}
              </span>
            </div>

            {/* Dimension controls */}
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <label className="flex items-center gap-1.5">
                <span>Rows:</span>
                <select
                  value={rowsA}
                  onChange={(e) => handleRowsAChange(Number(e.target.value))}
                  className="bg-slate-800 text-slate-200 rounded px-2 py-1 border border-slate-700 outline-none"
                >
                  {[1, 2, 3, 4].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex items-center gap-1.5">
                <span>Cols:</span>
                <select
                  value={colsA}
                  onChange={(e) => handleColsAChange(Number(e.target.value))}
                  className="bg-slate-800 text-slate-200 rounded px-2 py-1 border border-slate-700 outline-none"
                >
                  {[1, 2, 3, 4].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          {/* Matrix A Inputs Grid */}
          <div className="flex justify-center p-3 bg-slate-950/60 rounded-lg border border-slate-800/80">
            <div
              className="grid gap-2"
              style={{
                gridTemplateColumns: `repeat(${colsA}, minmax(48px, 64px))`,
              }}
            >
              {matrixA.map((row, r) =>
                row.map((val, c) => (
                  <input
                    key={`a-${r}-${c}`}
                    type="number"
                    value={val}
                    onChange={(e) => updateCellA(r, c, e.target.value)}
                    className="w-full h-11 bg-slate-800/90 text-center font-mono font-medium text-slate-100 rounded-md border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition text-sm"
                  />
                ))
              )}
            </div>
          </div>

          {/* Individual matrix actions */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-slate-500 font-mono">
              NumPy: np.array({rowsA}x{colsA})
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setResult(transposeMatrix(matrixA))}
                className="text-xs bg-slate-800 hover:bg-slate-700 text-emerald-400 px-2.5 py-1.5 rounded border border-emerald-500/20 transition flex items-center gap-1"
              >
                <RotateCw className="w-3 h-3" /> Transpose Aᵀ
              </button>
              <button
                onClick={() => setResult(determinantMatrix(matrixA))}
                className="text-xs bg-slate-800 hover:bg-slate-700 text-amber-400 px-2.5 py-1.5 rounded border border-amber-500/20 transition flex items-center gap-1"
              >
                <Hash className="w-3 h-3" /> Determinant |A|
              </button>
            </div>
          </div>
        </div>

        {/* Matrix B Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-purple-600/20 text-purple-400 flex items-center justify-center font-bold text-xs">
                B
              </span>
              <h3 className="font-semibold text-slate-200 text-sm">Matrix B</h3>
              <span className="text-xs font-mono text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-900/50">
                {rowsB} × {colsB}
              </span>
            </div>

            {/* Dimension controls */}
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <label className="flex items-center gap-1.5">
                <span>Rows:</span>
                <select
                  value={rowsB}
                  onChange={(e) => handleRowsBChange(Number(e.target.value))}
                  className="bg-slate-800 text-slate-200 rounded px-2 py-1 border border-slate-700 outline-none"
                >
                  {[1, 2, 3, 4].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex items-center gap-1.5">
                <span>Cols:</span>
                <select
                  value={colsB}
                  onChange={(e) => handleColsBChange(Number(e.target.value))}
                  className="bg-slate-800 text-slate-200 rounded px-2 py-1 border border-slate-700 outline-none"
                >
                  {[1, 2, 3, 4].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          {/* Matrix B Inputs Grid */}
          <div className="flex justify-center p-3 bg-slate-950/60 rounded-lg border border-slate-800/80">
            <div
              className="grid gap-2"
              style={{
                gridTemplateColumns: `repeat(${colsB}, minmax(48px, 64px))`,
              }}
            >
              {matrixB.map((row, r) =>
                row.map((val, c) => (
                  <input
                    key={`b-${r}-${c}`}
                    type="number"
                    value={val}
                    onChange={(e) => updateCellB(r, c, e.target.value)}
                    className="w-full h-11 bg-slate-800/90 text-center font-mono font-medium text-slate-100 rounded-md border border-slate-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition text-sm"
                  />
                ))
              )}
            </div>
          </div>

          {/* Individual matrix actions */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-slate-500 font-mono">
              NumPy: np.array({rowsB}x{colsB})
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setResult(transposeMatrix(matrixB))}
                className="text-xs bg-slate-800 hover:bg-slate-700 text-emerald-400 px-2.5 py-1.5 rounded border border-emerald-500/20 transition flex items-center gap-1"
              >
                <RotateCw className="w-3 h-3" /> Transpose Bᵀ
              </button>
              <button
                onClick={() => setResult(determinantMatrix(matrixB))}
                className="text-xs bg-slate-800 hover:bg-slate-700 text-amber-400 px-2.5 py-1.5 rounded border border-amber-500/20 transition flex items-center gap-1"
              >
                <Hash className="w-3 h-3" /> Determinant |B|
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Binary Operations Toolbar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Binary Operations (Matrix A & Matrix B)
          </span>

          {/* Status badge */}
          <div className="flex items-center gap-2">
            {canAddOrSub ? (
              <span className="text-[11px] bg-emerald-950/70 text-emerald-400 border border-emerald-800/60 px-2 py-0.5 rounded flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> Shapes match for + and -
              </span>
            ) : (
              <span className="text-[11px] bg-amber-950/70 text-amber-400 border border-amber-800/60 px-2 py-0.5 rounded flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> Addition requires identical shapes
              </span>
            )}

            {canMultiply ? (
              <span className="text-[11px] bg-emerald-950/70 text-emerald-400 border border-emerald-800/60 px-2 py-0.5 rounded flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> Compatible for A × B
              </span>
            ) : (
              <span className="text-[11px] bg-rose-950/70 text-rose-400 border border-rose-800/60 px-2 py-0.5 rounded flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> A cols ({colsA}) ≠ B rows ({rowsB})
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => setResult(addMatrices(matrixA, matrixB))}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 px-4 rounded-lg transition shadow text-sm"
          >
            <Plus className="w-4 h-4" /> 1. Matrix Addition (A + B)
          </button>

          <button
            onClick={() => setResult(subtractMatrices(matrixA, matrixB))}
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2.5 px-4 rounded-lg transition shadow text-sm"
          >
            <Minus className="w-4 h-4" /> 2. Matrix Subtraction (A - B)
          </button>

          <button
            onClick={() => setResult(multiplyMatrices(matrixA, matrixB))}
            className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-medium py-2.5 px-4 rounded-lg transition shadow text-sm"
          >
            <TimesIcon className="w-4 h-4" /> 3. Matrix Multiplication (A × B)
          </button>
        </div>
      </div>

      {/* Result Display Box */}
      {result && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  result.success ? "bg-emerald-400 animate-pulse" : "bg-rose-500"
                }`}
              />
              <h3 className="font-semibold text-slate-100 text-sm sm:text-base">
                Calculation Output: {result.operationName}
              </h3>
            </div>
            <button
              onClick={copyPythonCode}
              className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded border border-slate-700 transition flex items-center gap-1.5"
            >
              {copiedPython ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied NumPy Code
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" /> Copy NumPy Code
                </>
              )}
            </button>
          </div>

          {/* If Error */}
          {!result.success ? (
            <div className="p-4 bg-rose-950/40 border border-rose-800/60 rounded-lg text-rose-300 font-mono text-xs sm:text-sm">
              <p className="font-semibold flex items-center gap-2 text-rose-400 mb-1">
                <AlertCircle className="w-4 h-4" /> Dimension Validation Error:
              </p>
              <p>{result.error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              {/* Output Matrix / Scalar Display */}
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 font-mono space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2">
                  <span>Structured Output Format</span>
                  <span className="text-emerald-400 font-semibold">NumPy Equivalent</span>
                </div>

                {result.matrix && (
                  <div>
                    <span className="text-xs text-slate-400 block mb-1">Result Matrix:</span>
                    <pre className="text-emerald-400 font-bold text-sm sm:text-base bg-slate-900/90 p-3 rounded border border-slate-800 whitespace-pre">
                      {formatNumPyArray(result.matrix)}
                    </pre>
                  </div>
                )}

                {result.scalar !== undefined && (
                  <div>
                    <span className="text-xs text-slate-400 block mb-1">Determinant Scalar:</span>
                    <div className="text-emerald-400 font-bold text-2xl bg-slate-900/90 p-3 rounded border border-slate-800">
                      {result.scalar}
                    </div>
                  </div>
                )}
              </div>

              {/* Step-by-Step Math Breakdown */}
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-3">
                <span className="text-xs text-slate-400 font-medium block border-b border-slate-800 pb-2">
                  Step-by-Step Mathematical Explanation:
                </span>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {result.steps?.map((step, idx) => (
                    <div
                      key={idx}
                      className="text-xs font-mono text-slate-300 bg-slate-900/60 px-2.5 py-1.5 rounded border border-slate-800/70"
                    >
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
