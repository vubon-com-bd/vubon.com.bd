import { themes, type ThemeName } from '../styles/themes';

/** Apply theme CSS variables to a DOM element. */
export function applyTheme(name: ThemeName, target?: HTMLElement): void {
  if (typeof document === 'undefined') return;
  const el = target ?? document.documentElement;
  const theme = themes[name];
  for (const [key, value] of Object.entries(theme.vars)) {
    el.style.setProperty(key, value);
  }
  el.setAttribute('data-theme', name);
}

/** Remove all theme CSS variables from a DOM element. */
export function clearTheme(target?: HTMLElement): void {
  if (typeof document === 'undefined') return;
  const el = target ?? document.documentElement;
  el.removeAttribute('data-theme');
}

/** Get the currently applied theme name. */
export function getCurrentTheme(): ThemeName | null {
  if (typeof document === 'undefined') return null;
  const attr = document.documentElement.getAttribute('data-theme');
  if (!attr) return null;
  return attr in themes ? (attr as ThemeName) : null;
}
