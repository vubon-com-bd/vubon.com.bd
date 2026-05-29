/**
 * API Client - Barrel Export
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-api/src/client/index
 * 
 * RULES:
 * ✅ ONLY re-exports - NO logic, NO initialization
 * ✅ NO functions, NO side effects
 * ✅ Pure client exports only
 */

// ============================================================
// Axios Client
// ============================================================
export * from './axios.client';

// ============================================================
// Fetch Client
// ============================================================
export * from './fetch.client';

// ============================================================
// Interceptors
// ============================================================
export * from './interceptors';

// ============================================================
// Rate Limit Client
// ============================================================
export * from './rate-limit.client';

// ============================================================
// Retry Client
// ============================================================
export * from './retry.client';
