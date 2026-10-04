import React, { useState } from "react";
import { CheckCircle2, XCircle, Play, RefreshCw, ShieldCheck, Terminal } from "lucide-react";
import {
  addMatrices,
  subtractMatrices,
  multiplyMatrices,
  transposeMatrix,
  determinantMatrix,
  formatNumPyArray,
  Matrix,
} from "../utils/matrixMath";

interface TestCase {
  id: number;
  name: string;
  category: string;
  description: string;
  inputA: Matrix;
  inputB?: Matrix;
  expectedOutput: string;
  runTest: () => { pass: boolean; actual: string; message: string };
}

export const TestRunner: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<{ [id: number]: { pass: boolean; actual: string; message: string } }>({});
  const [selectedTest, setSelectedTest] = useState<number | null>(1);

  const testCases: TestCase[] = [
    {
      id: 1,
      name: "2×2 Matrix Addition",
      category: "Core Operation",
      description: "Verify A + B using standard assignment matrices [[1,2],[3,4]] and [[5,6],[7,8]].",
      inputA: [[1, 2], [3, 4]],
      inputB: [[5, 6], [7, 8]],
      expectedOutput: "[[ 6  8]\n [10 12]]",
      runTest: () => {
        const res = addMatrices([[1, 2], [3, 4]], [[5, 6], [7, 8]]);
        const actual = formatNumPyArray(res.matrix || []);
        const pass = res.success && JSON.stringify(res.matrix) === JSON.stringify([[6, 8], [10, 12]]);
        return { pass, actual, message: pass ? "NumPy np.add() calculation matches expected matrix exactly." : "Failed." };
      },
    },
    {
      id: 2,
      name: "2×2 Matrix Subtraction",
      category: "Core Operation",
      description: "Verify A - B using [[1,2],[3,4]] and [[5,6],[7,8]]. Expected result contains negative values [[-4,-4],[-4,-4]].",
      inputA: [[1, 2], [3, 4]],
      inputB: [[5, 6], [7, 8]],
      expectedOutput: "[[-4 -4]\n [-4 -4]]",
      runTest: () => {
        const res = subtractMatrices([[1, 2], [3, 4]], [[5, 6], [7, 8]]);
        const actual = formatNumPyArray(res.matrix || []);
        const pass = res.success && JSON.stringify(res.matrix) === JSON.stringify([[-4, -4], [-4, -4]]);
        return { pass, actual, message: pass ? "NumPy np.subtract() calculation matches expected matrix." : "Failed." };
      },
    },
    {
      id: 3,
      name: "Compatible Matrix Multiplication (2×2)",
      category: "Core Operation",
      description: "Verify A × B inner dot products. [1*5+2*7, 1*6+2*8] -> [[19, 22], [43, 50]].",
      inputA: [[1, 2], [3, 4]],
      inputB: [[5, 6], [7, 8]],
      expectedOutput: "[[19 22]\n [43 50]]",
      runTest: () => {
        const res = multiplyMatrices([[1, 2], [3, 4]], [[5, 6], [7, 8]]);
        const actual = formatNumPyArray(res.matrix || []);
        const pass = res.success && JSON.stringify(res.matrix) === JSON.stringify([[19, 22], [43, 50]]);
        return { pass, actual, message: pass ? "NumPy np.matmul() matches assignment specification." : "Failed." };
      },
    },
    {
      id: 4,
      name: "Rectangular Multiplication (2×3 by 3×2)",
      category: "Linear Algebra",
      description: "Tests multiplication compatibility when matrices have different row/column counts but valid inner dimensions.",
      inputA: [[1, 2, 3], [4, 5, 6]],
      inputB: [[7, 8], [9, 1], [2, 3]],
      expectedOutput: "[[31 19]\n [85 55]]",
      runTest: () => {
        const a = [[1, 2, 3], [4, 5, 6]];
        const b = [[7, 8], [9, 1], [2, 3]];
        const res = multiplyMatrices(a, b);
        const actual = formatNumPyArray(res.matrix || []);
        const pass = res.success && JSON.stringify(res.matrix) === JSON.stringify([[31, 19], [85, 55]]);
        return { pass, actual, message: pass ? "Rectangular matrix multiplication verified successfully." : "Failed." };
      },
    },
    {
      id: 5,
      name: "Incompatible Multiplication Dimension Check",
      category: "Error Handling",
      description: "Matrix A (2×3) multiplied by Matrix B (2×2). Must catch dimension error gracefully without crashing.",
      inputA: [[1, 2, 3], [4, 5, 6]],
      inputB: [[1, 2], [3, 4]],
      expectedOutput: "Error: Matrix A columns must equal Matrix B rows for multiplication.",
      runTest: () => {
        const a = [[1, 2, 3], [4, 5, 6]];
        const b = [[1, 2], [3, 4]];
        const res = multiplyMatrices(a, b);
        const pass = !res.success && (res.error?.includes("Matrix A columns must equal Matrix B rows") ?? false);
        return {
          pass,
          actual: res.error || "No error returned",
          message: pass ? "Incompatible dimensions successfully identified and rejected." : "Failed to catch error.",
        };
      },
    },
    {
      id: 6,
      name: "Matrix Transpose (Aᵀ)",
      category: "Core Operation",
      description: "Verify transpose flips row elements into column elements: [[1, 2], [3, 4]] -> [[1, 3], [2, 4]].",
      inputA: [[1, 2], [3, 4]],
      expectedOutput: "[[1 3]\n [2 4]]",
      runTest: () => {
        const res = transposeMatrix([[1, 2], [3, 4]]);
        const actual = formatNumPyArray(res.matrix || []);
        const pass = res.success && JSON.stringify(res.matrix) === JSON.stringify([[1, 3], [2, 4]]);
        return { pass, actual, message: pass ? "NumPy np.transpose() operation verified." : "Failed." };
      },
    },
    {
      id: 7,
      name: "2×2 Determinant Calculation",
      category: "Core Operation",
      description: "Calculate det(A) = (1×4 - 2×3) = 4 - 6 = -2 using NumPy's np.linalg.det().",
      inputA: [[1, 2], [3, 4]],
      expectedOutput: "Determinant: -2",
      runTest: () => {
        const res = determinantMatrix([[1, 2], [3, 4]]);
        const pass = res.success && res.scalar === -2;
        return {
          pass,
          actual: `Determinant: ${res.scalar}`,
          message: pass ? "Determinant equals -2 as required by QSkill assignment specification." : "Failed.",
        };
      },
    },
    {
      id: 8,
      name: "Non-Square Determinant Validation",
      category: "Error Handling",
      description: "Attempts determinant calculation on a non-square matrix (2×3). Must reject with descriptive error message.",
      inputA: [[1, 2, 3], [4, 5, 6]],
      expectedOutput: "Error: Determinant can only be calculated for a square matrix.",
      runTest: () => {
        const res = determinantMatrix([[1, 2, 3], [4, 5, 6]]);
        const pass = !res.success && (res.error?.includes("square matrix") ?? false);
        return {
          pass,
          actual: res.error || "No error returned",
          message: pass ? "Non-square determinant correctly blocked by dimension check." : "Failed to catch error.",
        };
      },
    },
  ];

  const runAllTests = () => {
    setIsRunning(true);
    const results: { [id: number]: { pass: boolean; actual: string; message: string } } = {};

    setTimeout(() => {
      testCases.forEach((tc) => {
        results[tc.id] = tc.runTest();
      });
      setTestResults(results);
      setIsRunning(false);
    }, 400);
  };

  const activeTest = testCases.find((tc) => tc.id === selectedTest) || testCases[0];
  const activeResult = testResults[activeTest.id];

  return (
    <div className="space-y-6">
      {/* Test Suite Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            Automated Test Suite (QSkill Assignment Verification)
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Validates mathematical accuracy and exception handling across all 8 required edge cases.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={runAllTests}
            disabled={isRunning}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-medium px-4 py-2 rounded-lg transition text-xs sm:text-sm shadow"
          >
            {isRunning ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> Running Tests...
              </>
            ) : (
              <>
                <Play className="w-4 h-4" /> Run All 8 Tests
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Grid: List of Tests + Inspector Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Test Cases List */}
        <div className="lg:col-span-1 bg-slate-900 border border-slate-800 rounded-xl p-3 space-y-2">
          <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-800 flex justify-between items-center">
            <span>Test Cases ({testCases.length})</span>
            {Object.keys(testResults).length > 0 && (
              <span className="text-emerald-400 font-mono text-[11px]">
                {Object.values(testResults).filter((r) => r.pass).length} / {testCases.length} Passed
              </span>
            )}
          </div>

          <div className="space-y-1.5 max-h-[460px] overflow-y-auto pr-1">
            {testCases.map((tc) => {
              const res = testResults[tc.id];
              const isSelected = selectedTest === tc.id;

              return (
                <button
                  key={tc.id}
                  onClick={() => setSelectedTest(tc.id)}
                  className={`w-full text-left p-3 rounded-lg border transition flex items-center justify-between text-xs ${
                    isSelected
                      ? "bg-slate-800 border-blue-500/50 shadow-sm"
                      : "bg-slate-950/60 border-slate-800/80 hover:bg-slate-800/50"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="font-semibold text-slate-200">
                      {tc.id}. {tc.name}
                    </div>
                    <div className="text-[11px] text-slate-400">{tc.category}</div>
                  </div>

                  <div>
                    {res ? (
                      res.pass ? (
                        <span className="text-emerald-400 flex items-center gap-1 font-mono text-[11px] bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50">
                          <CheckCircle2 className="w-3.5 h-3.5" /> PASS
                        </span>
                      ) : (
                        <span className="text-rose-400 flex items-center gap-1 font-mono text-[11px] bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800/50">
                          <XCircle className="w-3.5 h-3.5" /> FAIL
                        </span>
                      )
                    ) : (
                      <span className="text-slate-500 text-[11px] font-mono">Ready</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Test Detail Panel */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="text-xs font-mono text-blue-400 uppercase tracking-wider block">
                {activeTest.category}
              </span>
              <h3 className="text-base font-bold text-slate-100">
                Test Case {activeTest.id}: {activeTest.name}
              </h3>
            </div>
            {activeResult && (
              <span
                className={`text-xs font-mono px-2.5 py-1 rounded font-bold border flex items-center gap-1.5 ${
                  activeResult.pass
                    ? "bg-emerald-950/80 text-emerald-400 border-emerald-800/60"
                    : "bg-rose-950/80 text-rose-400 border-rose-800/60"
                }`}
              >
                {activeResult.pass ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                {activeResult.pass ? "TEST PASSED" : "TEST FAILED"}
              </span>
            )}
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{activeTest.description}</p>

          {/* Test Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="text-xs text-slate-400 font-mono block mb-1">Matrix A:</span>
              <pre className="text-xs text-blue-400 font-mono bg-slate-900 p-2 rounded whitespace-pre">
                {formatNumPyArray(activeTest.inputA)}
              </pre>
            </div>

            {activeTest.inputB && (
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="text-xs text-slate-400 font-mono block mb-1">Matrix B:</span>
                <pre className="text-xs text-purple-400 font-mono bg-slate-900 p-2 rounded whitespace-pre">
                  {formatNumPyArray(activeTest.inputB)}
                </pre>
              </div>
            )}
          </div>

          {/* Expected vs Actual */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="text-xs text-slate-400 font-semibold block mb-1">Expected Output:</span>
              <pre className="text-xs text-emerald-300 font-mono bg-slate-900 p-2.5 rounded whitespace-pre-wrap">
                {activeTest.expectedOutput}
              </pre>
            </div>

            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="text-xs text-slate-400 font-semibold block mb-1">Actual Output:</span>
              <pre
                className={`text-xs font-mono p-2.5 rounded whitespace-pre-wrap ${
                  activeResult
                    ? activeResult.pass
                      ? "text-emerald-400 bg-slate-900"
                      : "text-rose-400 bg-rose-950/40"
                    : "text-slate-500 italic bg-slate-900"
                }`}
              >
                {activeResult ? activeResult.actual : "Click 'Run All 8 Tests' to evaluate"}
              </pre>
            </div>
          </div>

          {/* Verification note */}
          {activeResult && (
            <div
              className={`p-3 rounded-lg text-xs font-mono border ${
                activeResult.pass
                  ? "bg-emerald-950/30 text-emerald-300 border-emerald-900/40"
                  : "bg-rose-950/30 text-rose-300 border-rose-900/40"
              }`}
            >
              {activeResult.message}
            </div>
          )}

          {/* Python unittest code view snippet */}
          <div className="pt-2">
            <span className="text-xs text-slate-400 block mb-1 font-mono">
              Equivalent Python unittest (from test_matrix_operations.py):
            </span>
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto">
              {activeTest.id === 1 && `def test_01_matrix_addition_2x2(self):\n    expected = np.array([[6, 8], [10, 12]])\n    result = np.add(self.matrix_a, self.matrix_b)\n    np.testing.assert_array_equal(result, expected)`}
              {activeTest.id === 2 && `def test_02_matrix_subtraction_2x2(self):\n    expected = np.array([[-4, -4], [-4, -4]])\n    result = np.subtract(self.matrix_a, self.matrix_b)\n    np.testing.assert_array_equal(result, expected)`}
              {activeTest.id === 3 && `def test_03_matrix_multiplication_compatible(self):\n    expected = np.array([[19, 22], [43, 50]])\n    result = np.matmul(self.matrix_a, self.matrix_b)\n    np.testing.assert_array_equal(result, expected)`}
              {activeTest.id === 4 && `def test_04_matrix_multiplication_rectangular(self):\n    res = np.matmul(mat_2x3, mat_3x2)\n    np.testing.assert_array_equal(res, np.array([[31, 19], [85, 55]]))`}
              {activeTest.id === 5 && `def test_05_matrix_multiplication_incompatible_check(self):\n    # Columns of A (3) != Rows of B (2)\n    self.assertFalse(mat_2x3.shape[1] == mat_2x2.shape[0])`}
              {activeTest.id === 6 && `def test_06_matrix_transpose(self):\n    expected = np.array([[1, 3], [2, 4]])\n    np.testing.assert_array_equal(np.transpose(self.matrix_a), expected)`}
              {activeTest.id === 7 && `def test_07_matrix_determinant_2x2(self):\n    det_val = np.linalg.det(self.matrix_a)\n    self.assertAlmostEqual(det_val, -2.0, places=5)`}
              {activeTest.id === 8 && `def test_08_matrix_determinant_non_square_check(self):\n    self.assertFalse(non_square.shape[0] == non_square.shape[1])`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
