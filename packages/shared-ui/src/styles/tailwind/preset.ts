/**
 * Tailwind preset — exposes design tokens as Tailwind utilities.
 *
 * Usage (consumer):
 *   import preset from '@vubon/shared-ui/styles/tailwind/preset';
 *   export default { presets: [preset], content: [...] };
 */
import { colors, spacing, typography, shadows, radii, zIndex } from '../../tokens';

export const tailwindPreset = {
  theme: {
    extend: {
      colors,
      spacing,
      fontFamily: typography.fontFamily,
      fontSize: typography.fontSize,
      fontWeight: typography.fontWeight,
      lineHeight: typography.lineHeight,
      letterSpacing: typography.letterSpacing,
      boxShadow: shadows,
      borderRadius: radii,
      zIndex,
    },
  },
} as const;

export default tailwindPreset;
