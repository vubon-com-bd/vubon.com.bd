export const highContrastTheme = Object.freeze({
  name: 'high-contrast',
  vars: {
    '--color-bg': '#000000',
    '--color-bg-subtle': '#0a0a0a',
    '--color-surface': '#0a0a0a',
    '--color-border': '#ffffff',
    '--color-border-strong': '#ffffff',
    '--color-text': '#ffffff',
    '--color-text-muted': '#e5e5e5',
    '--color-text-subtle': '#d4d4d4',
    '--color-text-inverse': '#000000',
  },
} as const);

export type HighContrastTheme = typeof highContrastTheme;
