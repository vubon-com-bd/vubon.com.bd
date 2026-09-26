import { tailwindPreset } from './preset';

/**
 * Reference Tailwind config.
 * Apps should extend this — not copy.
 */
export const tailwindConfig = {
  presets: [tailwindPreset],
  content: [],
  darkMode: ['class', '[data-theme="dark"]'],
} as const;

export default tailwindConfig;
