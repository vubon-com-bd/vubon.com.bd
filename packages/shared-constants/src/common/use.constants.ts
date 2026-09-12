/**
 * React Hooks Constants
 * @module shared-constants/common/use
 */

export const DEBOUNCE = {
  DEFAULT_DELAY: 300,
  SEARCH_DELAY: 500,
  INPUT_DELAY: 250,
  SCROLL_DELAY: 100,
  RESIZE_DELAY: 150,
} as const;

export const THROTTLE = {
  DEFAULT_INTERVAL: 300,
  SCROLL_INTERVAL: 100,
  RESIZE_INTERVAL: 150,
} as const;

export const BREAKPOINTS = {
  XS: 0,
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  XXL: 1536,
} as const;

export const HOOK_TIMEOUT = {
  SHORT: 1000,
  MEDIUM: 5000,
  LONG: 30000,
  EXTRA_LONG: 60000,
} as const;

export const KEYBOARD_KEYS = {
  ENTER: 'Enter',
  ESCAPE: 'Escape',
  TAB: 'Tab',
  SPACE: ' ',
  BACKSPACE: 'Backspace',
  DELETE: 'Delete',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  HOME: 'Home',
  END: 'End',
  PAGE_UP: 'PageUp',
  PAGE_DOWN: 'PageDown',
} as const;

export const STORAGE_KEYS = {
  THEME: 'app:theme',
  LOCALE: 'app:locale',
  ACCESS_TOKEN: 'auth:access_token',
  REFRESH_TOKEN: 'auth:refresh_token',
  USER: 'auth:user',
  CART: 'cart:items',
  RECENT_SEARCHES: 'search:recent',
} as const;

export const UI_DEFAULTS = {
  TOAST_DURATION: 5000,
  TOAST_MAX_VISIBLE: 5,
  MODAL_TRANSITION: 300,
  ACCORDION_TRANSITION: 250,
  TOOLTIP_DELAY: 400,
  MAX_PAGE_SIZE: 100,
  DEFAULT_PAGE_SIZE: 20,
} as const;

export type DebounceKey = keyof typeof DEBOUNCE;
export type Breakpoint = keyof typeof BREAKPOINTS;
export type StorageKey = keyof typeof STORAGE_KEYS;
