/** Chart color palette (8-color categorical). */
export const chartColors = Object.freeze({
  c1: '#3b82f6',
  c2: '#22c55e',
  c3: '#f59e0b',
  c4: '#ef4444',
  c5: '#8b5cf6',
  c6: '#06b6d4',
  c7: '#ec4899',
  c8: '#84cc16',
  grid: '#e5e5e5',
  axis: '#737373',
  tooltipBg: '#1e293b',
  tooltipText: '#f8fafc',
} as const);

export type ChartColorKey = keyof typeof chartColors;
