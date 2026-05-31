/**
 * UI Hooks - Barrel Export
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-ui/src/hooks/index
 * 
 * RULES:
 * ✅ ONLY re-exports - NO logic, NO initialization
 * ✅ NO functions, NO side effects
 * Pure UI hooks exports only
 */

// ============================================================
// State Management Hooks
// ============================================================
export * from './useModal';
export * from './useToast';

// ============================================================
// Browser/Window Hooks
// ============================================================
export * from './useWindowSize';
export * from './useMediaQuery';
export * from './useClickOutside';

// ============================================================
// Performance & Utility Hooks
// ============================================================
export * from './useDebounce';
export * from './useLocalStorage';
