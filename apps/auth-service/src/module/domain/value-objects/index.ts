/**
 * Value Objects - Index File (Barrel Export)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module domain/value-objects
 * 
 * @description
 * All domain value objects are exported from this index.
 * Value Objects are immutable, self-validating domain concepts.
 * 
 * RULES:
 * ✅ ONLY re-exports - NO logic, NO initialization
 * ✅ NO functions, NO side effects
 * ✅ Framework-free, pure domain
 */

// ============================================================
// Base Value Object
// ============================================================
export { ValueObject } from './base.vo';
export type { ValueObjectConstructor, ValueObjectComparison } from './base.vo';

// ============================================================
// Core Identity Value Objects
// ============================================================
export * from './email.vo';
export * from './phone.vo';
export * from './device-id.vo';
export * from './user-agent.vo';
export * from './ip-address.vo';

// ============================================================
// Security Value Objects
// ============================================================
export * from './password.vo';
export * from './otp-code.vo';
export * from './token.vo';
