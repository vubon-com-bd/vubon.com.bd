/**
 * Biometric Domain Errors
 * @module identity-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

// ─── Not Found (404) ───────────────────────
export class BiometricNotFoundError extends NotFoundError {
  constructor(biometricId: string) {
    super('Biometric', biometricId);
    this.name = 'BiometricNotFoundError';
  }
}

// ─── Conflict (409) ────────────────────────
export class BiometricAlreadyEnabledError extends ConflictError {
  constructor(authId: string) {
    super(`Biometric already enabled for auth "${authId}"`, 'biometricEnabled');
    this.name = 'BiometricAlreadyEnabledError';
  }
}

// ─── Validation (422) ──────────────────────
export class InvalidBiometricTypeError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(
      `Invalid biometric type "${value}". Allowed: ${allowed.join(', ')}`,
      'biometricType',
    );
    this.name = 'InvalidBiometricTypeError';
  }
}

// ─── Business Rule (400) ───────────────────
export class BiometricNotEnabledError extends BusinessRuleError {
  constructor(authId: string) {
    super(
      `Biometric not enabled for auth "${authId}"`,
      'BIOMETRIC_NOT_ENABLED',
      { authId },
    );
    this.name = 'BiometricNotEnabledError';
  }
}

export class BiometricVerificationFailedError extends BusinessRuleError {
  constructor(authId: string, attempt: number, maxAttempts: number) {
    super(
      `Biometric verification failed for auth "${authId}" (attempt ${attempt}/${maxAttempts})`,
      'BIOMETRIC_VERIFICATION_FAILED',
      { authId, attempt, maxAttempts },
    );
    this.name = 'BiometricVerificationFailedError';
  }
}

export class BiometricMaxAttemptsError extends BusinessRuleError {
  constructor(authId: string, attempts: number) {
    super(
      `Max biometric attempts exceeded (${attempts}) for auth "${authId}"`,
      'BIOMETRIC_MAX_ATTEMPTS',
      { authId, attempts },
    );
    this.name = 'BiometricMaxAttemptsError';
  }
}

export class BiometricDeviceMismatchError extends BusinessRuleError {
  constructor(authId: string, expectedDeviceId: string, actualDeviceId: string) {
    super(
      `Biometric device mismatch for auth "${authId}"`,
      'BIOMETRIC_DEVICE_MISMATCH',
      { authId, expectedDeviceId, actualDeviceId },
    );
    this.name = 'BiometricDeviceMismatchError';
  }
}
