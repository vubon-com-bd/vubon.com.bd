/** Status colors — for badges, dots, indicators. */
export const statusColors = Object.freeze({
  active: '#22c55e',
  inactive: '#a3a3a3',
  pending: '#f59e0b',
  approved: '#22c55e',
  rejected: '#ef4444',
  processing: '#3b82f6',
  shipped: '#8b5cf6',
  delivered: '#22c55e',
  cancelled: '#737373',
  failed: '#ef4444',
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#0ea5e9',
} as const);

export type StatusColorKey = keyof typeof statusColors;
