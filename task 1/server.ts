import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json());

// Serve generated visualization outputs
const outputsDir = path.join(__dirname, 'outputs');
if (!fs.existsSync(outputsDir)) {
  fs.mkdirSync(outputsDir, { recursive: true });
}
app.use('/outputs', express.static(outputsDir));

// API: Get project files content
app.get('/api/files', (req, res) => {
  try {
    const fileList = [
      'main.py',
      'student_data.csv',
      'requirements.txt',
      'README.md',
      'project_report.md',
      'viva_questions.md'
    ];

    const result: Record<string, string> = {};
    for (const fileName of fileList) {
      const filePath = path.join(__dirname, fileName);
      if (fs.existsSync(filePath)) {
        result[fileName] = fs.readFileSync(filePath, 'utf-8');
      } else {
        result[fileName] = '';
      }
    }

    res.json({ success: true, files: result });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// API: Save updated student_data.csv
app.post('/api/save-csv', (req, res) => {
  try {
    const { csvContent } = req.body;
    if (!csvContent || typeof csvContent !== 'string') {
      return res.status(400).json({ success: false, error: 'csvContent string is required' });
    }
    const filePath = path.join(__dirname, 'student_data.csv');
    fs.writeFileSync(filePath, csvContent.trim() + '\n', 'utf-8');
    res.json({ success: true, message: 'student_data.csv updated successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// API: Execute python main.py
app.post('/api/run-python', (req, res) => {
  const pythonCmd = 'python3 main.py';
  exec(pythonCmd, { cwd: __dirname }, (error, stdout, stderr) => {
    // Check if output PNGs were generated
    const outputFiles = [
      'average_marks_bar_chart.png',
      'math_science_scatter_plot.png',
      'subject_correlation_heatmap.png'
    ];
    const generated: Record<string, boolean> = {};
    for (const file of outputFiles) {
      generated[file] = fs.existsSync(path.join(outputsDir, file));
    }

    if (error) {
      // Return output log along with error details so user can inspect
      return res.json({
        success: false,
        stdout: stdout || '',
        stderr: stderr || error.message,
        generatedCharts: generated,
        exitCode: error.code
      });
    }

    res.json({
      success: true,
      stdout: stdout || '',
      stderr: stderr || '',
      generatedCharts: generated,
      exitCode: 0
    });
  });
});

// API: Check status of output files
app.get('/api/outputs-status', (req, res) => {
  try {
    const files = [
      'average_marks_bar_chart.png',
      'math_science_scatter_plot.png',
      'subject_correlation_heatmap.png'
    ];
    const statuses = files.map(filename => {
      const fullPath = path.join(outputsDir, filename);
      const exists = fs.existsSync(fullPath);
      let size = 0;
      let modifiedAt = null;
      if (exists) {
        const stat = fs.statSync(fullPath);
        size = stat.size;
        modifiedAt = stat.mtime;
      }
      return {
        filename,
        url: `/outputs/${filename}`,
        exists,
        size,
        modifiedAt
      };
    });
    res.json({ success: true, files: statuses });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

async function startServer() {
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
