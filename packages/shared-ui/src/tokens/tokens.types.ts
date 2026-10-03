import type { colors } from './colors';
import type { spacing } from './spacing';
import type { typography } from './typography';
import type { shadows } from './shadows';
import type { radii } from './radii';
import type { zIndex } from './z-index';
import type { transitions } from './transitions';
import type { opacity } from './opacity';
import type { blur } from './blur';
import type { gradients } from './gradients';

export interface DesignTokens {
  readonly colors: typeof colors;
  readonly spacing: typeof spacing;
  readonly typography: typeof typography;
  readonly shadows: typeof shadows;
  readonly radii: typeof radii;
  readonly zIndex: typeof zIndex;
  readonly transitions: typeof transitions;
  readonly opacity: typeof opacity;
  readonly blur: typeof blur;
  readonly gradients: typeof gradients;
}

export type TokenGroup = keyof DesignTokens;
