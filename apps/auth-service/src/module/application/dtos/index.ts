/**
 * DTOs Index - Barrel Export
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/dtos/index
 * 
 * @description
 * Central export point for all Data Transfer Objects.
 * NO business logic, NO validation logic, ONLY re-exports.
 * 
 * Enterprise Rules:
 * ✅ ONLY re-exports - NO logic, NO initialization
 * ✅ NO functions, NO side effects
 * ✅ Framework-free exports
 */

// ============================================================
// Common DTOs
// ============================================================
export * from './common/pagination.dto';
export * from './common/base-response.dto';
export * from './common/audit.dto';

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
