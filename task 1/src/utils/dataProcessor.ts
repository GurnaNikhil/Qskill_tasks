import { StudentRecord, SubjectStat, CorrelationMatrix } from '../types';

export function parseCSV(csvText: string): StudentRecord[] {
  const lines = csvText.trim().split('\n');
  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map(h => h.trim());
  const records: StudentRecord[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const values = line.split(',').map(v => v.trim());
    const obj: any = {};
    headers.forEach((h, index) => {
      const val = values[index];
      if (['Math', 'Science', 'English', 'Study_Hours', 'Attendance_Percentage'].includes(h)) {
        obj[h] = parseFloat(val) || 0;
      } else {
        obj[h] = val;
      }
    });
    records.push(obj as StudentRecord);
  }
  return records;
}

export function computeStats(records: StudentRecord[], subjects: string[] = ['Math', 'Science', 'English']): SubjectStat[] {
  if (records.length === 0) return [];

  return subjects.map(subject => {
    const values = records.map(r => Number(r[subject]) || 0);
    const n = values.length;
    const mean = values.reduce((sum, v) => sum + v, 0) / n;
    
    // Median
    const sorted = [...values].sort((a, b) => a - b);
    const mid = Math.floor(n / 2);
    const median = n % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;

    const min = Math.min(...values);
    const max = Math.max(...values);

    // Sample Standard Deviation
    const variance = values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / (n > 1 ? n - 1 : 1);
    const std = Math.sqrt(variance);

    return {
      subject,
      mean: Math.round(mean * 100) / 100,
      median: Math.round(median * 100) / 100,
      min: Math.round(min * 100) / 100,
      max: Math.round(max * 100) / 100,
      std: Math.round(std * 100) / 100,
    };
  });
}

export function computePearsonCorrelation(x: number[], y: number[]): number {
  const n = x.length;
  if (n < 2) return 0;

  const meanX = x.reduce((a, b) => a + b, 0) / n;
  const meanY = y.reduce((a, b) => a + b, 0) / n;

  let num = 0;
  let denX = 0;
  let denY = 0;

  for (let i = 0; i < n; i++) {
    const dx = x[i] - meanX;
    const dy = y[i] - meanY;
    num += dx * dy;
    denX += dx * dx;
    denY += dy * dy;
  }

  const den = Math.sqrt(denX * denY);
  if (den === 0) return 0;
  return Math.round((num / den) * 100) / 100;
}

export function computeCorrelationMatrix(records: StudentRecord[], columns: string[] = ['Math', 'Science', 'English']): CorrelationMatrix {
  const matrix: number[][] = [];

  for (let i = 0; i < columns.length; i++) {
    const row: number[] = [];
    const valsI = records.map(r => Number(r[columns[i]]) || 0);
    for (let j = 0; j < columns.length; j++) {
      if (i === j) {
        row.push(1.0);
      } else {
        const valsJ = records.map(r => Number(r[columns[j]]) || 0);
        row.push(computePearsonCorrelation(valsI, valsJ));
      }
    }
    matrix.push(row);
  }

  return { columns, matrix };
}

export function computeLinearRegression(x: number[], y: number[]): { slope: number; intercept: number; rValue: number } {
  const n = x.length;
  if (n < 2) return { slope: 0, intercept: 0, rValue: 0 };

  const meanX = x.reduce((a, b) => a + b, 0) / n;
  const meanY = y.reduce((a, b) => a + b, 0) / n;

  let numerator = 0;
  let denominator = 0;

  for (let i = 0; i < n; i++) {
    numerator += (x[i] - meanX) * (y[i] - meanY);
    denominator += Math.pow(x[i] - meanX, 2);
  }

  const slope = denominator !== 0 ? numerator / denominator : 0;
  const intercept = meanY - slope * meanX;
  const rValue = computePearsonCorrelation(x, y);

  return { slope, intercept, rValue };
}

export function generateDynamicInsights(records: StudentRecord[], stats: SubjectStat[]): string[] {
  if (records.length === 0 || stats.length === 0) return [];

  const insights: string[] = [];

  // 1. Highest and lowest average
  const sortedByMean = [...stats].sort((a, b) => b.mean - a.mean);
  const best = sortedByMean[0];
  const lowest = sortedByMean[sortedByMean.length - 1];
  const diff = Math.round((best.mean - lowest.mean) * 100) / 100;

  insights.push(
    `Top Academic Domain: Students demonstrated highest overall proficiency in ${best.subject} with an average of ${best.mean.toFixed(2)}/100, outperforming ${lowest.subject} (${lowest.mean.toFixed(2)}/100) by a margin of ${diff.toFixed(2)} points.`
  );

  // 2. Consistency & standard deviation
  const sortedByStd = [...stats].sort((a, b) => a.std - b.std);
  const mostConsistent = sortedByStd[0];
  const leastConsistent = sortedByStd[sortedByStd.length - 1];

  insights.push(
    `Score Distribution & Consistency: ${mostConsistent.subject} exhibited the lowest standard deviation (std = ${mostConsistent.std.toFixed(2)}), indicating the most homogeneous student comprehension. In contrast, ${leastConsistent.subject} had the widest spread (std = ${leastConsistent.std.toFixed(2)}), highlighting greater performance disparity.`
  );

  // 3. STEM Inter-Subject Synergy
  const mathScores = records.map(r => r.Math);
  const sciScores = records.map(r => r.Science);
  const rMathSci = computePearsonCorrelation(mathScores, sciScores);

  let corrLabel = "strong positive";
  if (rMathSci < 0.4) corrLabel = "weak positive";
  else if (rMathSci < 0.7) corrLabel = "moderate positive";

  insights.push(
    `STEM Inter-Subject Synergy: A ${corrLabel} linear correlation (r = ${rMathSci.toFixed(2)}) was observed between Math and Science marks. This quantitatively indicates that analytical skills developed in Mathematics strongly reinforce conceptual success in Scientific disciplines.`
  );

  // 4. Study Hours Impact
  if (records[0]?.Study_Hours !== undefined) {
    const studyHours = records.map(r => r.Study_Hours);
    const rStudyMath = computePearsonCorrelation(studyHours, mathScores);
    insights.push(
      `Effort vs. Outcome Correlation: Weekly study hours positively correlate with performance (r = ${rStudyMath.toFixed(2)} with Math), verifying that structured study habits directly translate to higher academic achievement.`
    );
  }

  // 5. Cross-Disciplinary English correlation
  const engScores = records.map(r => r.English);
  const rMathEng = computePearsonCorrelation(mathScores, engScores);
  const rSciEng = computePearsonCorrelation(sciScores, engScores);
  const avgCross = Math.round(((rMathEng + rSciEng) / 2) * 100) / 100;

  insights.push(
    `Cross-Curricular Transfer: English correlation with STEM subjects averaged r = ${avgCross.toFixed(2)} (Math: ${rMathEng.toFixed(2)}, Science: ${rSciEng.toFixed(2)}), demonstrating healthy holistic cognitive development across both verbal and quantitative tracks.`
  );

  return insights;
}
