import React, { useState } from "react";
import {
  GraduationCap,
  HelpCircle,
  Cpu,
  AlertTriangle,
  Github,
  Terminal,
  FileText,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface GuideSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  summary: string;
  content: React.ReactNode;
}

export const VivaGuide: React.FC = () => {
  const [openSection, setOpenSection] = useState<string>("files");
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const sections: GuideSection[] = [
    {
      id: "files",
      title: "1. What Each File Does (Project Structure Breakdown)",
      icon: <FileText className="w-5 h-5 text-blue-400" />,
      summary: "Understand the responsibility of every file in the matrix_operations_tool directory.",
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-300">
          <p>
            When explaining your project structure during an internship review, describe the clean separation of concerns:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
              <span className="font-mono text-blue-400 font-bold block mb-1">matrix_operations.py</span>
              <p className="text-xs text-slate-400 leading-relaxed">
                The primary executable program. Contains the interactive menu loop, dynamic matrix input functions (<code className="text-slate-300">input_matrix()</code>), input validation for numeric sanity, and NumPy calculation functions for Addition, Subtraction, Multiplication, Transpose, and Determinant.
              </p>
            </div>

            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
              <span className="font-mono text-emerald-400 font-bold block mb-1">test_matrix_operations.py</span>
              <p className="text-xs text-slate-400 leading-relaxed">
                Automated test suite using Python&apos;s standard <code className="text-slate-300">unittest</code> library. Validates all 8 assignment test cases (including dimension mismatch handling, negative values, and non-square determinant rejection) to prove code correctness without human error.
              </p>
            </div>

            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
              <span className="font-mono text-purple-400 font-bold block mb-1">gui_matrix_operations.py</span>
              <p className="text-xs text-slate-400 leading-relaxed">
                An optional, clean desktop Graphical User Interface built with Python&apos;s standard <code className="text-slate-300">tkinter</code> library. Demonstrates versatility if your mentor asks for a GUI without needing external web or heavy frameworks.
              </p>
            </div>

            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
              <span className="font-mono text-amber-400 font-bold block mb-1">requirements.txt</span>
              <p className="text-xs text-slate-400 leading-relaxed">
                Declares the exact dependencies required by the project (<code className="text-slate-300">numpy&gt;=1.24.0</code>). Keeps the repository lightweight and guarantees reproducibility across different developer machines.
              </p>
            </div>

            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
              <span className="font-mono text-teal-400 font-bold block mb-1">README.md</span>
              <p className="text-xs text-slate-400 leading-relaxed">
                The technical documentation containing badges, project overview, installation commands for Windows PowerShell / Mac, example demonstrations, error-handling principles, and concepts learned for the QSkill evaluator.
              </p>
            </div>

            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
              <span className="font-mono text-slate-400 font-bold block mb-1">.gitignore</span>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tells Git to ignore temporary Python bytecode (<code className="text-slate-300">__pycache__/</code>), virtual environment folders (<code className="text-slate-300">venv/</code>), and editor configuration (<code className="text-slate-300">.vscode/</code>) when pushing to GitHub.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "numpy-install",
      title: "2. How to Install NumPy in Windows PowerShell / VS Code",
      icon: <Terminal className="w-5 h-5 text-emerald-400" />,
      summary: "Exact, fail-proof PowerShell terminal commands for setting up a virtual environment and installing NumPy.",
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-300">
          <p>
            Always explain to your evaluator that using a <strong>Python Virtual Environment (<code className="text-blue-400">venv</code>)</strong> is best practice because it isolates project dependencies from your system Python.
          </p>

          <div className="space-y-3 font-mono text-xs">
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-slate-400">
                <span>Step 1: Open PowerShell and navigate to the project directory</span>
                <button
                  onClick={() => copyToClipboard("cd matrix_operations_tool", "cmd1")}
                  className="text-slate-400 hover:text-white"
                >
                  {copiedCmd === "cmd1" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <pre className="text-blue-300">cd matrix_operations_tool</pre>
            </div>

            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-slate-400">
                <span>Step 2: Create a virtual environment named &apos;venv&apos;</span>
                <button
                  onClick={() => copyToClipboard("python -m venv venv", "cmd2")}
                  className="text-slate-400 hover:text-white"
                >
                  {copiedCmd === "cmd2" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <pre className="text-blue-300">python -m venv venv</pre>
            </div>

            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-slate-400">
                <span>Step 3: Activate the virtual environment in PowerShell</span>
                <button
                  onClick={() => copyToClipboard(".\\venv\\Scripts\\Activate.ps1", "cmd3")}
                  className="text-slate-400 hover:text-white"
                >
                  {copiedCmd === "cmd3" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <pre className="text-emerald-300">.\venv\Scripts\Activate.ps1</pre>
              <p className="text-[11px] text-amber-400 font-sans mt-1">
                * If PowerShell says &quot;running scripts is disabled&quot;, run: <code className="bg-slate-900 px-1 py-0.5 rounded text-slate-200">Set-ExecutionPolicy RemoteSigned -Scope CurrentUser</code> and retry.
              </p>
            </div>

            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-slate-400">
                <span>Step 4: Install dependencies from requirements.txt</span>
                <button
                  onClick={() => copyToClipboard("pip install -r requirements.txt", "cmd4")}
                  className="text-slate-400 hover:text-white"
                >
                  {copiedCmd === "cmd4" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <pre className="text-blue-300">pip install -r requirements.txt</pre>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "running",
      title: "3. How to Run the Project in VS Code / PowerShell",
      icon: <GraduationCap className="w-5 h-5 text-purple-400" />,
      summary: "Step-by-step commands to run the CLI, unit tests, and optional GUI during your viva presentation.",
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-300">
          <p>In VS Code, press <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 font-mono text-xs">Ctrl + `</kbd> (Backtick) to open the built-in terminal.</p>

          <div className="space-y-3 font-mono text-xs">
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-400 font-sans block text-xs font-semibold mb-1">
                A. Run Main Interactive CLI Program:
              </span>
              <pre className="text-emerald-300">python matrix_operations.py</pre>
            </div>

            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-400 font-sans block text-xs font-semibold mb-1">
                B. Run Automated Unit Tests (Proves 100% Correctness):
              </span>
              <pre className="text-emerald-300">python test_matrix_operations.py</pre>
            </div>

            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-400 font-sans block text-xs font-semibold mb-1">
                C. Run Optional Desktop GUI (Tkinter):
              </span>
              <pre className="text-emerald-300">python gui_matrix_operations.py</pre>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "operations",
      title: "4. How to Test Every Operation with the Assignment Data",
      icon: <HelpCircle className="w-5 h-5 text-amber-400" />,
      summary: "Exact input walkthrough using Matrix A = [[1, 2], [3, 4]] and Matrix B = [[5, 6], [7, 8]].",
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-300">
          <p>
            When demonstrating to your internship mentor, use the exact test matrices from the assignment requirements:
          </p>

          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs space-y-2">
            <div className="text-slate-400">
              Matrix A: <span className="text-blue-300 font-bold">[[1, 2], [3, 4]]</span> (Rows: 2, Cols: 2)
            </div>
            <div className="text-slate-400">
              Matrix B: <span className="text-purple-300 font-bold">[[5, 6], [7, 8]]</span> (Rows: 2, Cols: 2)
            </div>
          </div>

          <div className="space-y-2">
            <div className="p-2.5 bg-slate-950 rounded border border-slate-800">
              <span className="font-semibold text-blue-400 block mb-0.5">1. Addition:</span>
              <code className="text-xs text-slate-300 font-mono block">Option 1 → Matrix A + Matrix B → [[6, 8], [10, 12]]</code>
            </div>
            <div className="p-2.5 bg-slate-950 rounded border border-slate-800">
              <span className="font-semibold text-blue-400 block mb-0.5">2. Subtraction:</span>
              <code className="text-xs text-slate-300 font-mono block">Option 2 → Matrix A - Matrix B → [[-4, -4], [-4, -4]]</code>
            </div>
            <div className="p-2.5 bg-slate-950 rounded border border-slate-800">
              <span className="font-semibold text-blue-400 block mb-0.5">3. Multiplication:</span>
              <code className="text-xs text-slate-300 font-mono block">Option 3 → Matrix A × Matrix B → [[19, 22], [43, 50]]</code>
            </div>
            <div className="p-2.5 bg-slate-950 rounded border border-slate-800">
              <span className="font-semibold text-emerald-400 block mb-0.5">4. Transpose:</span>
              <code className="text-xs text-slate-300 font-mono block">Option 4 → Matrix A^T → [[1, 3], [2, 4]]</code>
            </div>
            <div className="p-2.5 bg-slate-950 rounded border border-slate-800">
              <span className="font-semibold text-amber-400 block mb-0.5">5. Determinant:</span>
              <code className="text-xs text-slate-300 font-mono block">Option 5 → det(Matrix A) → -2</code>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "numpy-internals",
      title: "5. How NumPy Functions Work (Viva Question & Answer)",
      icon: <Cpu className="w-5 h-5 text-cyan-400" />,
      summary: "Understand why NumPy is used instead of nested Python loops, and how each function executes.",
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-300">
          <div className="p-3 bg-blue-950/40 border border-blue-800/60 rounded-lg">
            <h4 className="font-semibold text-blue-300 mb-1 text-xs sm:text-sm">
              Q: Why do we use NumPy instead of standard Python nested lists?
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Standard Python lists store pointers to individual integer objects scattered throughout heap memory, and performing matrix operations requires slow nested <code className="text-blue-300">for</code> loops. 
              <strong> NumPy arrays (<code className="text-blue-300">ndarray</code>)</strong> store data in contiguous memory blocks and execute operations using compiled C libraries (such as BLAS and LAPACK). This concept is called <strong>vectorization</strong> and can be 50 to 100 times faster.
            </p>
          </div>

          <div className="space-y-2">
            <div className="p-2.5 bg-slate-950 rounded border border-slate-800">
              <span className="font-mono text-emerald-400 font-semibold text-xs block">np.add(A, B) and np.subtract(A, B)</span>
              <p className="text-xs text-slate-400 mt-0.5">
                Performs element-wise arithmetic (C[i, j] = A[i, j] ± B[i, j]). Before execution, NumPy verifies that the shapes of both arrays match or are compatible via broadcasting rules.
              </p>
            </div>

            <div className="p-2.5 bg-slate-950 rounded border border-slate-800">
              <span className="font-mono text-emerald-400 font-semibold text-xs block">np.matmul(A, B) or A @ B</span>
              <p className="text-xs text-slate-400 mt-0.5">
                Computes the matrix dot product where each result element C[i, j] is the dot product of Row i of Matrix A and Column j of Matrix B. Requires columns of Matrix A to strictly equal rows of Matrix B.
              </p>
            </div>

            <div className="p-2.5 bg-slate-950 rounded border border-slate-800">
              <span className="font-mono text-emerald-400 font-semibold text-xs block">np.transpose(A) or A.T</span>
              <p className="text-xs text-slate-400 mt-0.5">
                Permutes axes by swapping index 0 (rows) with index 1 (columns) without copying data in memory (done in O(1) time by altering array strides).
              </p>
            </div>

            <div className="p-2.5 bg-slate-950 rounded border border-slate-800">
              <span className="font-mono text-emerald-400 font-semibold text-xs block">np.linalg.det(A)</span>
              <p className="text-xs text-slate-400 mt-0.5">
                Calculates the determinant using LU decomposition (PA = LU). For a 2 × 2 matrix, it simplifies to ad - bc. We round the result to prevent IEEE 754 floating-point precision artifacts (e.g. -2.0000000000000004 to -2).
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "errors",
      title: "6. Common Errors & How to Fix Them",
      icon: <AlertTriangle className="w-5 h-5 text-rose-400" />,
      summary: "Troubleshooting guide for PowerShell script policy, pip issues, and dimension exceptions.",
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-slate-300">
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
            <span className="font-bold text-rose-400 block text-xs">
              1. &quot;File Activate.ps1 cannot be loaded because running scripts is disabled on this system&quot;
            </span>
            <p className="text-xs text-slate-400">
              <strong>Cause:</strong> Windows PowerShell has a default security policy that blocks execution of local scripts.
            </p>
            <p className="text-xs text-emerald-400 font-mono">
              Fix: Run PowerShell as Administrator or run: <br />
              <code className="bg-slate-900 px-1 py-0.5 rounded text-slate-200">Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser</code>
            </p>
          </div>

          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
            <span className="font-bold text-rose-400 block text-xs">
              2. &quot;pip is not recognized as an internal or external command&quot;
            </span>
            <p className="text-xs text-slate-400">
              <strong>Cause:</strong> Python was installed without checking &quot;Add Python to PATH&quot;.
            </p>
            <p className="text-xs text-emerald-400 font-mono">
              Fix: Use <code className="bg-slate-900 px-1 py-0.5 rounded text-slate-200">python -m pip install -r requirements.txt</code> instead of just <code className="bg-slate-900 px-1 py-0.5 rounded text-slate-200">pip</code>.
            </p>
          </div>

          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
            <span className="font-bold text-rose-400 block text-xs">
              3. ValueError: shapes (2,3) and (2,2) not aligned
            </span>
            <p className="text-xs text-slate-400">
              <strong>Cause:</strong> Trying to multiply matrices where the number of columns in Matrix A does not match the number of rows in Matrix B.
            </p>
            <p className="text-xs text-emerald-400 font-mono">
              Fix: Our code prevents this crash by checking <code className="bg-slate-900 px-1 py-0.5 rounded text-slate-200">matrix_a.shape[1] == matrix_b.shape[0]</code> before calling NumPy!
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "github",
      title: "7. How to Upload the Project to GitHub Step-by-Step",
      icon: <Github className="w-5 h-5 text-slate-200" />,
      summary: "Clean Git commands to initialize a repository and push your submission to GitHub.",
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-300">
          <p>Follow these standard steps to submit your project URL to QSkill:</p>

          <div className="space-y-2.5 font-mono text-xs">
            <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
              <span className="text-slate-500 font-sans block text-[11px]">1. Navigate into project folder</span>
              <pre className="text-blue-300">cd matrix_operations_tool</pre>
            </div>

            <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
              <span className="text-slate-500 font-sans block text-[11px]">2. Initialize Git repository</span>
              <pre className="text-blue-300">git init</pre>
            </div>

            <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
              <span className="text-slate-500 font-sans block text-[11px]">3. Stage all files (virtual env is automatically ignored via .gitignore)</span>
              <pre className="text-blue-300">git add .</pre>
            </div>

            <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
              <span className="text-slate-500 font-sans block text-[11px]">4. Make initial commit</span>
              <pre className="text-emerald-300">git commit -m &quot;feat: complete Matrix Operations Tool using NumPy for QSkill Internship&quot;</pre>
            </div>

            <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
              <span className="text-slate-500 font-sans block text-[11px]">5. Rename branch to main</span>
              <pre className="text-blue-300">git branch -M main</pre>
            </div>

            <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
              <span className="text-slate-500 font-sans block text-[11px]">6. Link your GitHub remote URL</span>
              <pre className="text-blue-300">git remote add origin https://github.com/YOUR_USERNAME/matrix_operations_tool.git</pre>
            </div>

            <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
              <span className="text-slate-500 font-sans block text-[11px]">7. Push code to GitHub</span>
              <pre className="text-emerald-300">git push -u origin main</pre>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
        <h2 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-purple-400" />
          QSkill Internship Viva & Evaluation Guide
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Everything you need to explain, demonstrate, and defend during your internship project evaluation.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {sections.map((sec) => {
          const isOpen = openSection === sec.id;
          return (
            <div
              key={sec.id}
              className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm transition"
            >
              <button
                onClick={() => setOpenSection(isOpen ? "" : sec.id)}
                className="w-full p-4 text-left flex items-center justify-between hover:bg-slate-800/50 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                    {sec.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-100 text-sm">{sec.title}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{sec.summary}</p>
                  </div>
                </div>

                <div className="text-slate-400">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {isOpen && (
                <div className="p-4 pt-1 border-t border-slate-800/80 bg-slate-900/40">
                  {sec.content}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
