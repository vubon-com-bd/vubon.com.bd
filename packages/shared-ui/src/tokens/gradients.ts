/** Gradient presets. */
export const gradients = Object.freeze({
  primary: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
  success: 'linear-gradient(135deg, #22c55e 0%, #10b981 100%)',
  danger: 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)',
  warning: 'linear-gradient(135deg, #f59e0b 0%, #eab308 100%)',
  info: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
  neutral: 'linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%)',
  dark: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
} as const);

export type GradientKey = keyof typeof gradients;
