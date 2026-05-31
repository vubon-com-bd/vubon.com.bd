/**
 * Entities - Index File (Barrel Export)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module domain/entities/index
 * 
 * @description
 * All domain entities are exported from this index.
 * Entities are domain objects with identity and lifecycle.
 * 
 * RULES:
 * ✅ ONLY re-exports - NO logic, NO initialization
 * ✅ NO functions, NO side effects
 * ✅ Framework-free, pure domain
 */

// ============================================================
// Base Entity
// ============================================================
export * from './base.entity';

// ============================================================
// Core User Entities
// ============================================================
export * from './user.entity';
export * from './session.entity';
export * from './refresh-token.entity';

// ============================================================
// Security Entities
// ============================================================
export * from './mfa.entity';
export * from './account-lock.entity';
export * from './login-attempt.entity';
export * from './device.entity';

// ============================================================
// Verification Entities
// ============================================================
export * from './email-verification.entity';
export * from './password-reset.entity';
export * from './password-history.entity';

// ============================================================
// Social Entities
// ============================================================
export * from './social-account.entity';
