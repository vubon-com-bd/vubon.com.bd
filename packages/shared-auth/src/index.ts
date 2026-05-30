/**
 * Shared Auth - Root Barrel Export
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-auth/src/index
 * 
 * RULES:
 * ✅ ONLY re-exports - NO logic, NO initialization
 * ✅ NO functions, NO side effects
 * Pure auth layer exports only
 */

// ============================================================
// Auth Client (Infrastructure)
// ============================================================
export * from './client';

// ============================================================
// React Hooks & Components
// ============================================================
export * from './react';

// ============================================================
// Route Guards
// ============================================================
export * from './guards';
