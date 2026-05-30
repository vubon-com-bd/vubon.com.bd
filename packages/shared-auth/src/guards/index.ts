/**
 * Guards - Barrel Export
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-auth/auth-shared/guards/index
 * 
 * RULES:
 * ✅ ONLY re-exports - NO logic, NO initialization
 * ✅ NO functions, NO side effects
 * Pure route guard exports only
 */

// ============================================================
// Authentication Guards
// ============================================================
export * from './RequireAuth';
export * from './PublicRoute';

// ============================================================
// Role & Permission Guards
// ============================================================
export * from './RequireRole';
export * from './RequirePermission';

// ============================================================
// MFA Guard
// ============================================================
export * from './RequireMFA';

// ============================================================
// Device Trust Guard
// ============================================================
export * from './RequireDeviceTrust';
