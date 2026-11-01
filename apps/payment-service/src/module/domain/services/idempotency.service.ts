/**
 * IdempotencyService
 * @module payment-service/domain/services
 *
 * Rules:
 *   - Key must be 8-128 chars printable ASCII
 *   - TTL from TRANSACTION_LIMIT.IDEMPOTENCY_TTL_SECONDS
 *   - Same key + different payload → reject
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TRANSACTION_LIMIT } from '@vubon/shared-constants/business/payment';

export interface IdempotencyRecord {
  readonly key: string;
  readonly payloadHash: string;
  readonly resultId: string;
  readonly createdAt: string;
}

export interface IdempotencyCheckResult {
  readonly isReplay: boolean;
  readonly conflict: boolean;
  readonly existingId?: string;
}

export class IdempotencyService {
  static validate(key: string): void {
    if (typeof key !== 'string') {
      throw new ValidationError('IdempotencyKey must be a string', 'idempotencyKey');
    }
    const trimmed = key.trim();
    if (trimmed.length < 8 || trimmed.length > 128) {
      throw new ValidationError(
        'IdempotencyKey must be 8-128 chars',
        'idempotencyKey',
      );
    }
    if (!/^[!-~]+$/.test(trimmed)) {
      throw new ValidationError(
        'IdempotencyKey must be printable ASCII',
        'idempotencyKey',
      );
    }
  }

  static check(
    existing: IdempotencyRecord | null,
    newPayloadHash: string,
    referenceDate: Date = new Date(),
  ): IdempotencyCheckResult {
    if (!existing) return { isReplay: false, conflict: false };

    const ageSeconds = (referenceDate.getTime() - new Date(existing.createdAt).getTime()) / 1000;
    if (ageSeconds > TRANSACTION_LIMIT.IDEMPOTENCY_TTL_SECONDS) {
      return { isReplay: false, conflict: false };
    }
    if (existing.payloadHash !== newPayloadHash) {
      return { isReplay: true, conflict: true, existingId: existing.resultId };
    }
    return { isReplay: true, conflict: false, existingId: existing.resultId };
  }

  static assertNotConflict(result: IdempotencyCheckResult, key: string): void {
    if (result.conflict) {
      throw new BusinessRuleError(
        `Idempotency key "${key}" was reused with a different payload`,
        'IDEMPOTENCY_RESULT_MISMATCH',
        { idempotencyKey: key, existingId: result.existingId },
      );
    }
  }

  static isExpired(createdAt: string, referenceDate: Date = new Date()): boolean {
    const ageSeconds = (referenceDate.getTime() - new Date(createdAt).getTime()) / 1000;
    return ageSeconds > TRANSACTION_LIMIT.IDEMPOTENCY_TTL_SECONDS;
  }
}
