/**
 * Theme exports
 * থিম এক্সপোর্ট
 */
export const themes = {
  light: 'light',
  dark: 'dark',
  admin: 'admin',
  seller: 'seller',
  customer: 'customer',
} as const;

export type Theme = (typeof themes)[keyof typeof themes];

export interface ThemeConfig {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    foreground: string;
    muted: string;
    accent: string;
    card: string;
  };
}

export const themeConfigs: Record<Theme, ThemeConfig> = {
  light: {
    name: 'Light',
    colors: {
      primary: '#3b82f6',
      secondary: '#6b7280',
      background: '#ffffff',
      foreground: '#1f2937',
      muted: '#f3f4f6',
      accent: '#60a5fa',
      card: '#ffffff',
    },
  },
  dark: {
    name: 'Dark',
    colors: {
      primary: '#3b82f6',
      secondary: '#6b7280',
      background: '#1f2937',
      foreground: '#f9fafb',
      muted: '#374151',
      accent: '#60a5fa',
      card: '#1f2937',
    },
  },
  admin: {
    name: 'Admin',
    colors: {
      primary: '#8b5cf6',
      secondary: '#6b7280',
      background: '#f8fafc',
      foreground: '#1e293b',
      muted: '#f1f5f9',
      accent: '#a78bfa',
      card: '#ffffff',
    },
  },
  seller: {
    name: 'Seller',
    colors: {
      primary: '#10b981',
      secondary: '#6b7280',
      background: '#f0fdf4',
      foreground: '#064e3b',
      muted: '#dcfce7',
      accent: '#34d399',
      card: '#ffffff',
    },
  },
  customer: {
    name: 'Customer',
    colors: {
      primary: '#3b82f6',
      secondary: '#6b7280',
      background: '#eff6ff',
      foreground: '#1e3a8a',
      muted: '#dbeafe',
      accent: '#60a5fa',
      card: '#ffffff',
    },
  },
};
