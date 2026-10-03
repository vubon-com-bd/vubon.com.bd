export const lightTheme = Object.freeze({
  name: 'light',
  vars: {
    '--color-bg': '#ffffff',
    '--color-bg-subtle': '#f5f5f5',
    '--color-surface': '#ffffff',
    '--color-border': '#e5e5e5',
    '--color-border-strong': '#d4d4d4',
    '--color-text': '#171717',
    '--color-text-muted': '#737373',
    '--color-text-subtle': '#a3a3a3',
    '--color-text-inverse': '#ffffff',
  },
} as const);

export type LightTheme = typeof lightTheme;
