/**
 * Auth Constants - Index File (Barrel Export)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module shared-constants/auth-constants
 * @description Single entry point for all auth-related constants.
 *
 * RULES:
 * ✅ ONLY re-exports - NO logic, NO initialization
 * ✅ NO functions, NO side effects
 * ✅ NO direct imports from other project layers
 * ✅ Framework-free, pure constants
 */

// ============================================================
// Environment Configuration
// ============================================================
export * from './env.constants';

// ============================================================
// Core Auth Constants (Base configurations)
// ============================================================
export * from './auth.constants';

// ============================================================
// Role & Permission Constants (Authorization)
// ============================================================
export * from './role.constants';
export * from './permission.constants';

// ============================================================
// Security Constants (Headers, Encryption, CORS, etc.)
// ============================================================
export * from './security.constants';
export * from './session.constants';
export * from './mfa.constants';

// ============================================================
// Device & Social Constants (Platform & Integration)
// ============================================================
export * from './device.constants';
export * from './social.constants';

// ============================================================
// API & HTTP Constants (Routing, Status Codes)
// ============================================================
export * from './api.constants';
export * from './http-status.constants';

// ============================================================
// Infrastructure Constants (Caching, Queues)
// ============================================================
export * from './cache.constants';
export * from './queue.constants';

// ============================================================
// Validation Constants (Regex patterns)
// ============================================================
export * from './regex.constants';
