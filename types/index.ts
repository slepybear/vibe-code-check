export enum ProjectMode {
  SINGLE_FILE = 'single-file',
  MULTI_FILE = 'multi-file'
}

export interface ProjectFile {
  path: string;
  content: string;
  language: string;
}

export const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'svg'];
export const IMAGE_MIME_TYPES = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  gif: 'image/gif',
  svg: 'image/svg+xml'
};
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

export function isImageFile(path: string): boolean {
  const ext = path.split('.').pop()?.toLowerCase() || '';
  return IMAGE_EXTENSIONS.includes(ext);
}

export function getImageMimeType(path: string): string | undefined {
  const ext = path.split('.').pop()?.toLowerCase() || '';
  return IMAGE_MIME_TYPES[ext as keyof typeof IMAGE_MIME_TYPES];
}

export interface BuiltInImage {
  path: string;
  content: string;
  description: string;
}

export interface SingleFileTemplate {
  html: string;
  css: string;
  js: string;
}

export interface MultiFileTemplate {
  files: ProjectFile[];
  entryPoint: string;
}

export interface ScoringCriterion {
  name: string;
  description: string;
  maxScore: number;
}

interface BaseProblem {
  id: string;
  title: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  description: string;
  requirements: string;
  evaluationPoints: string[];
  bonusPoints: string[];
  scoringCriteria: ScoringCriterion[];
  interviewGuide: {
    keyPoints: string[];
    questions: string[];
  };
  images?: BuiltInImage[];
}

export interface SingleFileProblem extends BaseProblem {
  mode: ProjectMode.SINGLE_FILE;
  template: SingleFileTemplate;
}

export interface MultiFileProblem extends BaseProblem {
  mode: ProjectMode.MULTI_FILE;
  template: MultiFileTemplate;
}

export type Problem = SingleFileProblem | MultiFileProblem;

export interface EvaluationResult {
  [key: string]: number;
  totalScore: number;
}
