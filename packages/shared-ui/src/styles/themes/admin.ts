export const adminTheme = Object.freeze({
  name: 'admin',
  vars: {
    '--color-primary': '#3b82f6',
    '--color-sidebar-bg': '#0f172a',
    '--color-sidebar-text': '#f8fafc',
    '--color-sidebar-hover': '#1e293b',
  },
} as const);

export type AdminTheme = typeof adminTheme;
