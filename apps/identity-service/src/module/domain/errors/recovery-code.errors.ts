/**
 * Recovery Code Domain Errors
 * @module identity-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';

// ─── Not Found (404) ───────────────────────
export class RecoveryCodeNotFoundError extends NotFoundError {
  constructor(codeId: string) {
    super('RecoveryCode', codeId);
    this.name = 'RecoveryCodeNotFoundError';
  }
}

// ─── Business Rule (400) ───────────────────
export class RecoveryCodeAlreadyUsedError extends BusinessRuleError {
  constructor(codeId: string, usedAt: string) {
    super(
      `Recovery code "${codeId}" already used at ${usedAt}`,
      'RECOVERY_CODE_ALREADY_USED',
      { codeId, usedAt },
    );
    this.name = 'RecoveryCodeAlreadyUsedError';
  }
}

export class RecoveryCodeInvalidError extends BusinessRuleError {
  constructor(authId: string) {
    super(
      `Invalid recovery code for auth "${authId}"`,
      'RECOVERY_CODE_INVALID',
      { authId },
    );
    this.name = 'RecoveryCodeInvalidError';
  }
}

export class RecoveryCodesExhaustedError extends BusinessRuleError {
  constructor(authId: string) {
    super(
      `All recovery codes exhausted for auth "${authId}"`,
      'RECOVERY_CODES_EXHAUSTED',
      { authId },
    );
    this.name = 'RecoveryCodesExhaustedError';
  }
}

export class RecoveryCodesNotGeneratedError extends BusinessRuleError {
  constructor(authId: string) {
    super(
      `Recovery codes not generated for auth "${authId}"`,
      'RECOVERY_CODES_NOT_GENERATED',
      { authId },
    );
    this.name = 'RecoveryCodesNotGeneratedError';
  }
}
