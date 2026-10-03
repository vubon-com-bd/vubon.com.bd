export const darkTheme = Object.freeze({
  name: 'dark',
  vars: {
    '--color-bg': '#0a0a0a',
    '--color-bg-subtle': '#171717',
    '--color-surface': '#171717',
    '--color-border': '#262626',
    '--color-border-strong': '#404040',
    '--color-text': '#fafafa',
    '--color-text-muted': '#a3a3a3',
    '--color-text-subtle': '#737373',
    '--color-text-inverse': '#171717',
  },
} as const);

export type DarkTheme = typeof darkTheme;
