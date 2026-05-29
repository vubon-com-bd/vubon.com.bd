/**
 * Shared API - Root Barrel Export
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-api/src/index
 * 
 * RULES:
 * ✅ ONLY re-exports - NO logic, NO initialization
 * ✅ NO functions, NO side effects
 * ✅ Pure API layer exports only
 */

// ============================================================
// HTTP Clients
// ============================================================
export * from './client';

// ============================================================
// API Endpoints
// ============================================================
export * from './endpoints';
