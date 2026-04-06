export const LEVEL_LABELS = {
  beginner: '初级',
  intermediate: '中级',
  advanced: '高级'
} as const;

export const LEVEL_COLORS = {
  beginner: 'bg-green-100 text-green-800',
  intermediate: 'bg-yellow-100 text-yellow-800',
  advanced: 'bg-red-100 text-red-800'
} as const;

export type ProblemLevel = keyof typeof LEVEL_LABELS;
