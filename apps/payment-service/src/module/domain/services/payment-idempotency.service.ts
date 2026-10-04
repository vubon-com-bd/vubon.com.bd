/**
 * PaymentIdempotencyService — generate & validate idempotency keys
 * @module payment-service/domain/services
 */
import { createHash, randomUUID } from 'node:crypto';
import { PAYMENT_CONFIG } from '@vubon/shared-config/business';
import { IdempotencyKeyVO } from '../value-objects/primitives/idempotency-key.vo.js';

export class PaymentIdempotencyService {
  /**
   * Deterministic idempotency key for a (orderId, userId, amount, method) tuple.
   * Same tuple → same key → deduplicated by repository.
   */
  static deriveKey(parts: {
    readonly orderId: string;
    readonly userId: string;
    readonly amount: number;
    readonly method: string;
  }): IdempotencyKeyVO {
    const raw = `${parts.orderId}|${parts.userId}|${parts.amount.toFixed(2)}|${parts.method}`;
    const hash = createHash('sha256').update(raw).digest('hex').slice(0, 32);
    return IdempotencyKeyVO.create(`idem_${hash}`);
  }

  /** Random key — used when client doesn't supply one. */
  static random(): IdempotencyKeyVO {
    return IdempotencyKeyVO.create(`idem_${randomUUID().replace(/-/g, '')}`);
  }

  static isValid(key: string): boolean {
    try {
      IdempotencyKeyVO.create(key);
      return true;
    } catch {
      return false;
    }
  }

  static ttlSeconds(): number {
    return PAYMENT_CONFIG.idempotencyTtlSeconds;
  }
}
