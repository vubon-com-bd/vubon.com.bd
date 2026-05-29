/**
 * Endpoints - Barrel Export
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module shared-api/endpoints/index
 *
 * RULES:
 * ✅ ONLY re-exports - NO logic, NO initialization
 * ✅ NO functions, NO side effects
 * ✅ Pure API endpoint exports only
 */

// ============================================================
// Authentication Endpoints (auth/)
// ============================================================
export * from './auth/auth.endpoints';
export * from './auth/social.endpoints';
export * from './auth/mfa.endpoints';
export * from './auth/verification.endpoints';
export * from './auth/account-lock.endpoints';

// ============================================================
// User Management Endpoints (user/)
// ============================================================
export * from './user/user.endpoints';
export * from './user/session.endpoints';

// ============================================================
// RBAC Endpoints (rbac/)
// ============================================================
export * from './rbac/role.endpoints';
export * from './rbac/permission.endpoints';

// ============================================================
// Device Management Endpoints (device/)
// ============================================================
export * from './device/device.endpoints';
