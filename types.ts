export interface AnalysisResult {
  score: number;
  verdict: string;
  summary: string;
  details: string[];
  advice: string;
  tone: string;
}

export enum AnalysisStatus {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR'
}

export interface InputData {
  text: string;
  image: string | null; // Base64 string
}
