export const customerTheme = Object.freeze({
  name: 'customer',
  vars: {
    '--color-primary': '#7c3aed',
    '--color-sidebar-bg': '#2e1065',
    '--color-sidebar-text': '#f5f3ff',
    '--color-sidebar-hover': '#4c1d95',
  },
} as const);

export type CustomerTheme = typeof customerTheme;
