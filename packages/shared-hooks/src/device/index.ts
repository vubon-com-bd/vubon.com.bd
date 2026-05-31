/**
 * Device Hooks - Barrel Export
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-hooks/src/device/index
 * 
 * RULES:
 * ✅ ONLY re-exports - NO logic, NO initialization
 * ✅ NO functions, NO side effects
 * Pure device hooks exports only
 */

// ============================================================
// Device Query Hooks
// ============================================================
export * from './useDevices';

// ============================================================
// Device Mutation Hooks
// ============================================================
export * from './useTrustDevice';
export * from './useRevokeDevice';
