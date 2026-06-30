/**
 * DTOs - Root Barrel Export
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/dtos/index
 * 
 * @description
 * All Data Transfer Objects are exported from this index.
 * DTOs define the shape of data for API requests and responses.
 * 
 * RULES:
 * ✅ ONLY re-exports - NO logic, NO initialization
 * ✅ NO functions, NO side effects
 * ✅ Pure DTO exports only
 */

// ============================================================
// Common DTOs
// ============================================================
export * from './common/audit.dto';
export * from './common/base-response.dto';
export * from './common/pagination.dto';

// ============================================================
// Auth DTOs
// ============================================================
export * from './auth/login.dto';
export * from './auth/register.dto';
export * from './auth/refresh-token.dto';
export * from './auth/logout.dto';
export * from './auth/social-login.dto';

// ============================================================
// User DTOs
// ============================================================
export * from './user/create-user.dto';
export * from './user/update-profile.dto';
export * from './user/change-password.dto';
export * from './user/forgot-password.dto';

// ============================================================
// MFA DTOs
// ============================================================
export * from './mfa/enable-mfa.dto';
export * from './mfa/verify-mfa.dto';
export * from './mfa/disable-mfa.dto';

// ============================================================
// Session DTOs
// ============================================================
export * from './session/revoke-session.dto';
export * from './session/revoke-all-sessions.dto';

// ============================================================
// Re-export commonly used types from audit.dto for convenience
// ============================================================
export * from './common/audit.dto';

// ============================================================
// Re-export Base Response DTO types for convenience
// ============================================================
export * from './common/base-response.dto';

// ============================================================
// Re-export Pagination DTO types for convenience
// ============================================================
export * from './common/pagination.dto';
