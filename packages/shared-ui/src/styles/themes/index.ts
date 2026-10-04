export { lightTheme } from './light';
export type { LightTheme } from './light';
export { darkTheme } from './dark';
export type { DarkTheme } from './dark';
export { highContrastTheme } from './high-contrast';
export type { HighContrastTheme } from './high-contrast';
export { adminTheme } from './admin';
export type { AdminTheme } from './admin';
export { sellerTheme } from './seller';
export type { SellerTheme } from './seller';
export { customerTheme } from './customer';
export type { CustomerTheme } from './customer';

import { lightTheme } from './light';
import { darkTheme } from './dark';
import { highContrastTheme } from './high-contrast';
import { adminTheme } from './admin';
import { sellerTheme } from './seller';
import { customerTheme } from './customer';

export const themes = Object.freeze({
  light: lightTheme,
  dark: darkTheme,
  'high-contrast': highContrastTheme,
  admin: adminTheme,
  seller: sellerTheme,
  customer: customerTheme,
} as const);

export type ThemeName = keyof typeof themes;
