export interface StudentRecord {
  Student_ID: string;
  Name: string;
  Gender: string;
  Math: number;
  Science: number;
  English: number;
  Study_Hours: number;
  Attendance_Percentage: number;
  [key: string]: any;
}

export interface SubjectStat {
  subject: string;
  mean: number;
  median: number;
  min: number;
  max: number;
  std: number;
}

export interface CorrelationMatrix {
  columns: string[];
  matrix: number[][];
}

export interface OutputFileStatus {
  filename: string;
  url: string;
  exists: boolean;
  size: number;
  modifiedAt: string | null;
}
