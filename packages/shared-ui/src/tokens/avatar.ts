/** Avatar sizes. */
export const avatarSizes = Object.freeze({
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 64,
  '2xl': 96,
  '3xl': 128,
} as const);

export type AvatarSizeKey = keyof typeof avatarSizes;
