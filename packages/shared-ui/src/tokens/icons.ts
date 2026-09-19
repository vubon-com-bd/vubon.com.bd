/** Icon size scale. */
export const iconSizes = Object.freeze({
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
  '2xl': 40,
  '3xl': 48,
} as const);

export type IconSizeKey = keyof typeof iconSizes;
