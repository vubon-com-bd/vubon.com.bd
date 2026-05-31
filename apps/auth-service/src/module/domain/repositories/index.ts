/**
 * Repositories - Index File (Barrel Export)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module domain/repositories/index
 * 
 * @description
 * All domain repository interfaces are exported from this index.
 * Repository interfaces define contracts for entity persistence.
 * 
 * RULES:
 * ✅ ONLY re-exports - NO logic, NO initialization
 * ✅ NO functions, NO side effects
 * ✅ Framework-free, pure domain contracts
 */

// ============================================================
// Base Repository Interface
// ============================================================
export * from './base.repository.interface';

// ============================================================
// Core User Repositories
// ============================================================
export * from './user.repository.interface';
export * from './session.repository.interface';
export * from './refresh-token.repository.interface';

// ============================================================
// Security Repositories
// ============================================================
export * from './mfa.repository.interface';
export * from './account-lock.repository.interface';
export * from './password-history.repository.interface';
export * from './password-reset.repository.interface';

// ============================================================
// Verification Repository
// ============================================================
export * from './email-verification.repository.interface';

// ============================================================
// Social Repository
// ============================================================
export * from './social-account.repository.interface';
