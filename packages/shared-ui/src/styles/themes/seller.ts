export const sellerTheme = Object.freeze({
  name: 'seller',
  vars: {
    '--color-primary': '#16a34a',
    '--color-sidebar-bg': '#052e16',
    '--color-sidebar-text': '#f0fdf4',
    '--color-sidebar-hover': '#14532d',
  },
} as const);

export type SellerTheme = typeof sellerTheme;
