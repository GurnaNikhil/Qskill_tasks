import React, { useState, useRef, useEffect } from "react";
import { Terminal, RotateCcw, Sparkles, AlertTriangle, ArrowRight, CornerDownLeft } from "lucide-react";
import {
  addMatrices,
  subtractMatrices,
  multiplyMatrices,
  transposeMatrix,
  determinantMatrix,
  formatNumPyArray,
  Matrix,
} from "../utils/matrixMath";

interface TerminalLine {
  id: string;
  type: "system" | "menu" | "prompt" | "input" | "output" | "error" | "success" | "banner";
  text: string;
}

type Step =
  | "MENU"
  | "GET_ROWS_A"
  | "GET_COLS_A"
  | "GET_ROW_A"
  | "GET_ROWS_B"
  | "GET_COLS_B"
  | "GET_ROW_B";

export const InteractiveTerminal: React.FC = () => {
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: "1",
      type: "system",
      text: "Microsoft Windows [Version 10.0.22631.3007]\n(c) Microsoft Corporation. All rights reserved.\n\nPS C:\\Projects\\matrix_operations_tool> .\\venv\\Scripts\\Activate.ps1\n(venv) PS C:\\Projects\\matrix_operations_tool> python matrix_operations.py\n\nWelcome to the Matrix Operations Tool!\nQSkill Python Development Internship Project",
    },
    {
      id: "2",
      type: "menu",
      text: `
========================================
       MATRIX OPERATIONS TOOL
========================================
1. Matrix Addition
2. Matrix Subtraction
3. Matrix Multiplication
4. Matrix Transpose
5. Matrix Determinant
6. Exit
========================================`,
    },
    {
      id: "3",
      type: "prompt",
      text: "Enter your choice (1-6): ",
    },
  ]);

  const [inputVal, setInputVal] = useState("");
  const [currentStep, setCurrentStep] = useState<Step>("MENU");
  const [activeOp, setActiveOp] = useState<"add" | "sub" | "mul" | "transpose" | "det" | null>(null);

  // Accumulation state for Matrix A
  const [rowsA, setRowsA] = useState<number>(0);
  const [colsA, setColsA] = useState<number>(0);
  const [currentRowIdxA, setCurrentRowIdxA] = useState<number>(1);
  const [rowsDataA, setRowsDataA] = useState<number[][]>([]);

  // Accumulation state for Matrix B
  const [rowsB, setRowsB] = useState<number>(0);
  const [colsB, setColsB] = useState<number>(0);
  const [currentRowIdxB, setCurrentRowIdxB] = useState<number>(1);
  const [rowsDataB, setRowsDataB] = useState<number[][]>([]);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const addLine = (type: TerminalLine["type"], text: string) => {
    setLines((prev) => [...prev, { id: Math.random().toString(), type, text }]);
  };

  const showMenuPrompt = () => {
    setCurrentStep("MENU");
    setActiveOp(null);
    setRowsA(0);
    setColsA(0);
    setCurrentRowIdxA(1);
    setRowsDataA([]);
    setRowsB(0);
    setColsB(0);
    setCurrentRowIdxB(1);
    setRowsDataB([]);

    addLine(
      "menu",
      `
========================================
       MATRIX OPERATIONS TOOL
========================================
1. Matrix Addition
2. Matrix Subtraction
3. Matrix Multiplication
4. Matrix Transpose
5. Matrix Determinant
6. Exit
========================================`
    );
    addLine("prompt", "Enter your choice (1-6): ");
  };

  const handleCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim();
    if (!cmd) return;

    addLine("input", cmd);

    // 1. MENU STATE
    if (currentStep === "MENU") {
      switch (cmd) {
        case "1":
          setActiveOp("add");
          addLine("banner", "\n========================================\n         MATRIX ADDITION (A + B)\n========================================");
          addLine("system", "--- Enter Details for Matrix A ---");
          addLine("prompt", "Enter number of rows for Matrix A: ");
          setCurrentStep("GET_ROWS_A");
          break;
        case "2":
          setActiveOp("sub");
          addLine("banner", "\n========================================\n        MATRIX SUBTRACTION (A - B)\n========================================");
          addLine("system", "--- Enter Details for Matrix A ---");
          addLine("prompt", "Enter number of rows for Matrix A: ");
          setCurrentStep("GET_ROWS_A");
          break;
        case "3":
          setActiveOp("mul");
          addLine("banner", "\n========================================\n      MATRIX MULTIPLICATION (A x B)\n========================================");
          addLine("system", "--- Enter Details for Matrix A ---");
          addLine("prompt", "Enter number of rows for Matrix A: ");
          setCurrentStep("GET_ROWS_A");
          break;
        case "4":
          setActiveOp("transpose");
          addLine("banner", "\n========================================\n         MATRIX TRANSPOSE (A^T)\n========================================");
          addLine("system", "--- Enter Details for Matrix A ---");
          addLine("prompt", "Enter number of rows for Matrix A: ");
          setCurrentStep("GET_ROWS_A");
          break;
        case "5":
          setActiveOp("det");
          addLine("banner", "\n========================================\n        MATRIX DETERMINANT |A|\n========================================");
          addLine("system", "--- Enter Details for Matrix A ---");
          addLine("prompt", "Enter number of rows for Matrix A: ");
          setCurrentStep("GET_ROWS_A");
          break;
        case "6":
          addLine(
            "success",
            `\n========================================\nThank you for using Matrix Operations Tool!\nGood luck with your QSkill Internship submission!\n========================================\n`
          );
          addLine("prompt", "Type 'restart' or click a menu option to start again.");
          break;
        case "restart":
        case "clear":
          clearTerminal();
          break;
        default:
          addLine("error", "Error: Invalid choice! Please enter a number between 1 and 6.");
          addLine("prompt", "Enter your choice (1-6): ");
          break;
      }
      return;
    }

    // 2. GET NUMBER OF ROWS FOR MATRIX A
    if (currentStep === "GET_ROWS_A") {
      const parsedRows = parseInt(cmd, 10);
      if (isNaN(parsedRows) || parsedRows <= 0) {
        addLine("error", "Error: Value must be a positive integer greater than 0. Please try again.");
        addLine("prompt", "Enter number of rows for Matrix A: ");
        return;
      }
      setRowsA(parsedRows);
      setCurrentStep("GET_COLS_A");
      addLine("prompt", "Enter number of columns for Matrix A: ");
      return;
    }

    // 3. GET NUMBER OF COLUMNS FOR MATRIX A
    if (currentStep === "GET_COLS_A") {
      const parsedCols = parseInt(cmd, 10);
      if (isNaN(parsedCols) || parsedCols <= 0) {
        addLine("error", "Error: Value must be a positive integer greater than 0. Please try again.");
        addLine("prompt", "Enter number of columns for Matrix A: ");
        return;
      }
      setColsA(parsedCols);
      setCurrentRowIdxA(1);
      setRowsDataA([]);
      setCurrentStep("GET_ROW_A");
      addLine("system", `\nEnter matrix elements for Matrix A (${rowsA}x${parsedCols}):\n(Enter each row with ${parsedCols} space-separated numbers, e.g., '1 2')`);
      addLine("prompt", `Enter elements for Row 1 (${parsedCols} values): `);
      return;
    }

    // 4. GET ROW ELEMENTS FOR MATRIX A
    if (currentStep === "GET_ROW_A") {
      const parts = cmd.split(/\s+/).filter(Boolean);
      if (parts.length !== colsA) {
        addLine("error", `Error: Expected exactly ${colsA} values, but received ${parts.length}. Please re-enter Row ${currentRowIdxA}.`);
        addLine("prompt", `Enter elements for Row ${currentRowIdxA} (${colsA} values): `);
        return;
      }

      const nums: number[] = [];
      for (const p of parts) {
        const val = parseFloat(p);
        if (isNaN(val)) {
          addLine("error", `Error: Non-numeric element detected. Please enter numeric values only.`);
          addLine("prompt", `Enter elements for Row ${currentRowIdxA} (${colsA} values): `);
          return;
        }
        nums.push(val);
      }

      const updatedRows = [...rowsDataA, nums];
      setRowsDataA(updatedRows);

      if (currentRowIdxA < rowsA) {
        const nextRow = currentRowIdxA + 1;
        setCurrentRowIdxA(nextRow);
        addLine("prompt", `Enter elements for Row ${nextRow} (${colsA} values): `);
        return;
      }

      // Matrix A is now completely assembled!
      const matrixA: Matrix = updatedRows;
      addLine("output", `\nMatrix A:\n${formatNumPyArray(matrixA)}`);

      // If operation only requires Matrix A:
      if (activeOp === "transpose") {
        addLine("banner", "\n" + "-".repeat(40));
        addLine("output", `Original Matrix A:\n${formatNumPyArray(matrixA)}`);
        const res = transposeMatrix(matrixA);
        addLine("output", `\nTransposed Matrix A^T:\n${formatNumPyArray(res.matrix || [])}`);
        addLine("banner", "-".repeat(40));
        showMenuPrompt();
        return;
      }

      if (activeOp === "det") {
        addLine("banner", "\n" + "-".repeat(40));
        addLine("output", `Matrix A:\n${formatNumPyArray(matrixA)}\n`);
        if (rowsA !== colsA) {
          addLine("error", `Error: Determinant can only be calculated for a square matrix.\nGiven matrix has shape ${rowsA}x${colsA}. Rows and columns must be equal.`);
        } else {
          const res = determinantMatrix(matrixA);
          addLine("output", `Determinant |A|: ${res.scalar}`);
        }
        addLine("banner", "-".repeat(40));
        showMenuPrompt();
        return;
      }

      // Operation requires Matrix B (Addition, Subtraction, Multiplication)
      addLine("system", "\n--- Enter Details for Matrix B ---");
      addLine("prompt", "Enter number of rows for Matrix B: ");
      setCurrentStep("GET_ROWS_B");
      return;
    }

    // 5. GET NUMBER OF ROWS FOR MATRIX B
    if (currentStep === "GET_ROWS_B") {
      const parsedRows = parseInt(cmd, 10);
      if (isNaN(parsedRows) || parsedRows <= 0) {
        addLine("error", "Error: Value must be a positive integer greater than 0. Please try again.");
        addLine("prompt", "Enter number of rows for Matrix B: ");
        return;
      }
      setRowsB(parsedRows);
      setCurrentStep("GET_COLS_B");
      addLine("prompt", "Enter number of columns for Matrix B: ");
      return;
    }

    // 6. GET NUMBER OF COLUMNS FOR MATRIX B
    if (currentStep === "GET_COLS_B") {
      const parsedCols = parseInt(cmd, 10);
      if (isNaN(parsedCols) || parsedCols <= 0) {
        addLine("error", "Error: Value must be a positive integer greater than 0. Please try again.");
        addLine("prompt", "Enter number of columns for Matrix B: ");
        return;
      }
      setColsB(parsedCols);
      setCurrentRowIdxB(1);
      setRowsDataB([]);
      setCurrentStep("GET_ROW_B");
      addLine("system", `\nEnter matrix elements for Matrix B (${rowsB}x${parsedCols}):\n(Enter each row with ${parsedCols} space-separated numbers, e.g., '5 6')`);
      addLine("prompt", `Enter elements for Row 1 (${parsedCols} values): `);
      return;
    }

    // 7. GET ROW ELEMENTS FOR MATRIX B
    if (currentStep === "GET_ROW_B") {
      const parts = cmd.split(/\s+/).filter(Boolean);
      if (parts.length !== colsB) {
        addLine("error", `Error: Expected exactly ${colsB} values, but received ${parts.length}. Please re-enter Row ${currentRowIdxB}.`);
        addLine("prompt", `Enter elements for Row ${currentRowIdxB} (${colsB} values): `);
        return;
      }

      const nums: number[] = [];
      for (const p of parts) {
        const val = parseFloat(p);
        if (isNaN(val)) {
          addLine("error", `Error: Non-numeric element detected. Please enter numeric values only.`);
          addLine("prompt", `Enter elements for Row ${currentRowIdxB} (${colsB} values): `);
          return;
        }
        nums.push(val);
      }

      const updatedRows = [...rowsDataB, nums];
      setRowsDataB(updatedRows);

      if (currentRowIdxB < rowsB) {
        const nextRow = currentRowIdxB + 1;
        setCurrentRowIdxB(nextRow);
        addLine("prompt", `Enter elements for Row ${nextRow} (${colsB} values): `);
        return;
      }

      // Matrix B is now completely assembled!
      const matrixA: Matrix = rowsDataA;
      const matrixB: Matrix = updatedRows;

      addLine("output", `\nMatrix B:\n${formatNumPyArray(matrixB)}`);

      // Print structured comparison banner
      addLine("banner", "\n" + "-".repeat(40));
      addLine("output", `Matrix A:\n${formatNumPyArray(matrixA)}\n`);
      addLine("output", `Matrix B:\n${formatNumPyArray(matrixB)}\n`);

      // Execute chosen binary operation
      if (activeOp === "add") {
        if (rowsA !== rowsB || colsA !== colsB) {
          addLine("error", `Error: Matrix dimensions must be the same for addition.\nMatrix A dimension is (${rowsA}, ${colsA}), while Matrix B dimension is (${rowsB}, ${colsB}).`);
        } else {
          const res = addMatrices(matrixA, matrixB);
          addLine("output", `Result (A + B):\n${formatNumPyArray(res.matrix || [])}`);
        }
      } else if (activeOp === "sub") {
        if (rowsA !== rowsB || colsA !== colsB) {
          addLine("error", `Error: Matrix dimensions must be the same for subtraction.\nMatrix A dimension is (${rowsA}, ${colsA}), while Matrix B dimension is (${rowsB}, ${colsB}).`);
        } else {
          const res = subtractMatrices(matrixA, matrixB);
          addLine("output", `Result (A - B):\n${formatNumPyArray(res.matrix || [])}`);
        }
      } else if (activeOp === "mul") {
        if (colsA !== rowsB) {
          addLine("error", `Error: Matrix A columns must equal Matrix B rows for multiplication.\nMatrix A has ${colsA} column(s), but Matrix B has ${rowsB} row(s).`);
        } else {
          const res = multiplyMatrices(matrixA, matrixB);
          addLine("output", `Result (A x B):\n${formatNumPyArray(res.matrix || [])}`);
        }
      }

      addLine("banner", "-".repeat(40));
      showMenuPrompt();
      return;
    }
  };

  const clearTerminal = () => {
    setLines([
      {
        id: "start",
        type: "system",
        text: "(venv) PS C:\\Projects\\matrix_operations_tool> python matrix_operations.py\n\nWelcome to the Matrix Operations Tool!\nQSkill Python Development Internship Project",
      },
      {
        id: "menu_start",
        type: "menu",
        text: `
========================================
       MATRIX OPERATIONS TOOL
========================================
1. Matrix Addition
2. Matrix Subtraction
3. Matrix Multiplication
4. Matrix Transpose
5. Matrix Determinant
6. Exit
========================================`,
      },
      {
        id: "p_start",
        type: "prompt",
        text: "Enter your choice (1-6): ",
      },
    ]);
    showMenuPrompt();
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    handleCommand(inputVal);
    setInputVal("");
  };

  // Provide interactive clickable chips for the current active question
  const getContextSuggestions = () => {
    if (currentStep === "MENU") {
      return [
        { label: "1. Addition (A + B)", value: "1" },
        { label: "2. Subtraction (A - B)", value: "2" },
        { label: "3. Multiplication (A × B)", value: "3" },
        { label: "4. Transpose (Aᵀ)", value: "4" },
        { label: "5. Determinant |A|", value: "5" },
        { label: "6. Exit", value: "6" },
      ];
    }
    if (currentStep === "GET_ROWS_A") {
      return [
        { label: "2 rows", value: "2" },
        { label: "3 rows", value: "3" },
        { label: "1 row", value: "1" },
      ];
    }
    if (currentStep === "GET_COLS_A") {
      return [
        { label: "2 cols", value: "2" },
        { label: "3 cols", value: "3" },
      ];
    }
    if (currentStep === "GET_ROW_A") {
      if (colsA === 2) {
        return currentRowIdxA === 1
          ? [{ label: '"1 2"', value: "1 2" }]
          : [{ label: '"3 4"', value: "3 4" }];
      }
      if (colsA === 3) {
        return currentRowIdxA === 1
          ? [{ label: '"1 2 3"', value: "1 2 3" }]
          : [{ label: '"4 5 6"', value: "4 5 6" }];
      }
      return [{ label: "1", value: "1" }];
    }
    if (currentStep === "GET_ROWS_B") {
      return [
        { label: "2 rows", value: "2" },
        { label: "3 rows", value: "3" },
      ];
    }
    if (currentStep === "GET_COLS_B") {
      return [
        { label: "2 cols", value: "2" },
        { label: "3 cols", value: "3" },
      ];
    }
    if (currentStep === "GET_ROW_B") {
      if (colsB === 2) {
        return currentRowIdxB === 1
          ? [{ label: '"5 6"', value: "5 6" }]
          : [{ label: '"7 8"', value: "7 8" }];
      }
      return [{ label: "5 6", value: "5 6" }];
    }
    return [];
  };

  const suggestions = getContextSuggestions();

  return (
    <div className="flex flex-col h-full bg-slate-950 rounded-xl border border-slate-800 shadow-2xl overflow-hidden font-mono text-xs sm:text-sm">
      {/* Terminal Title Bar */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between select-none">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-slate-400 font-medium ml-2 text-xs flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-blue-400" />
            matrix_operations.py (Step-by-Step Interactive CLI)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] bg-slate-800 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
            Interactive User Input Mode
          </span>
          <button
            onClick={clearTerminal}
            className="text-slate-400 hover:text-slate-200 p-1 hover:bg-slate-800 rounded transition"
            title="Reset Terminal to Main Menu"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Terminal Screen Body */}
      <div className="flex-1 p-4 overflow-y-auto space-y-2 selection:bg-blue-500/30">
        {lines.map((item) => {
          if (item.type === "system") {
            return (
              <pre key={item.id} className="text-slate-400 whitespace-pre-wrap leading-relaxed font-mono">
                {item.text}
              </pre>
            );
          }
          if (item.type === "banner") {
            return (
              <div key={item.id} className="text-blue-400 font-mono font-bold whitespace-pre">
                {item.text}
              </div>
            );
          }
          if (item.type === "menu") {
            return (
              <pre
                key={item.id}
                className="text-cyan-300 whitespace-pre-wrap font-mono font-semibold py-1 leading-tight"
              >
                {item.text}
              </pre>
            );
          }
          if (item.type === "prompt") {
            return (
              <div key={item.id} className="text-amber-300 font-semibold font-mono flex items-center gap-1.5">
                <ArrowRight className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                {item.text}
              </div>
            );
          }
          if (item.type === "input") {
            return (
              <div key={item.id} className="text-emerald-400 font-mono font-semibold pl-4">
                &gt; {item.text}
              </div>
            );
          }
          if (item.type === "error") {
            return (
              <pre
                key={item.id}
                className="text-rose-400 bg-rose-950/40 border border-rose-900/60 p-2.5 rounded whitespace-pre-wrap font-mono"
              >
                {item.text}
              </pre>
            );
          }
          if (item.type === "success") {
            return (
              <pre
                key={item.id}
                className="text-emerald-400 bg-emerald-950/40 border border-emerald-900/60 p-2.5 rounded whitespace-pre-wrap font-mono"
              >
                {item.text}
              </pre>
            );
          }
          return (
            <pre
              key={item.id}
              className="text-slate-200 bg-slate-900/90 p-3 rounded-lg border border-slate-800 whitespace-pre-wrap font-mono leading-relaxed"
            >
              {item.text}
            </pre>
          );
        })}
        <div ref={terminalEndRef} />
      </div>

      {/* Contextual Answer Chips (Fast 1-Click Answering) */}
      {suggestions.length > 0 && (
        <div className="bg-slate-900/90 border-t border-slate-800/80 px-4 py-2 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 font-sans text-[11px] font-medium flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" />
            Quick Answers:
          </span>
          {suggestions.map((sug, idx) => (
            <button
              key={idx}
              onClick={() => {
                handleCommand(sug.value);
              }}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-2.5 py-1 rounded transition text-xs font-mono flex items-center gap-1 shadow-sm active:scale-95"
            >
              <span>{sug.label}</span>
              <CornerDownLeft className="w-2.5 h-2.5 text-blue-400" />
            </button>
          ))}
        </div>
      )}

      {/* Terminal Input Line */}
      <form onSubmit={onSubmit} className="bg-slate-900 border-t border-slate-800 px-4 py-2.5 flex items-center gap-2">
        <span className="text-emerald-400 font-bold">&gt;</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder={
            currentStep === "MENU"
              ? "Type 1, 2, 3, 4, 5, or 6 and press Enter..."
              : currentStep.includes("ROWS")
              ? "Enter number of rows (e.g., 2) and press Enter..."
              : currentStep.includes("COLS")
              ? "Enter number of columns (e.g., 2) and press Enter..."
              : "Enter space-separated numbers (e.g., 1 2) and press Enter..."
          }
          className="flex-1 bg-transparent text-slate-100 placeholder-slate-500 outline-none font-mono text-xs sm:text-sm"
          autoFocus
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-500 text-white font-sans text-xs px-3.5 py-1.5 rounded transition font-medium"
        >
          Enter
        </button>
      </form>
    </div>
  );
};
