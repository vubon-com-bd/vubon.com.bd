/**
 * CanRetrySpecification
 * @module notification-service/domain/specifications
 *
 * Determines if a failed notification/delivery can be retried।
 * Checks: status failed, attempts remaining, error is retryable।
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import type { NotificationEntity } from '@domain/entities/notification.entity.js';
import type { DeliveryErrorVO } from '@domain/primitives/delivery-error.vo.js';

const NON_RETRYABLE = new Set<string>([
  'invalid_address',
  'invalid_phone',
  'invalid_token',
  'unsubscribed',
  'blocked',
  'message_rejected',
]);

export interface CanRetryContext {
  readonly error?: DeliveryErrorVO;
  readonly maxAttempts?: number;
  readonly retryWindowMinutes?: number;
  readonly now?: Date;
}

export interface CanRetryCandidate {
  readonly notification: NotificationEntity;
  readonly ctx?: CanRetryContext;
}

export class CanRetrySpecification extends Specification<CanRetryCandidate> {
  isSatisfiedBy(c: CanRetryCandidate): boolean {
    return this.explain(c) === null;
  }

  explain(c: CanRetryCandidate): string | null {
    const n = c.notification;
    const now = c.ctx?.now ?? new Date();
    const maxAttempts = c.ctx?.maxAttempts ?? 3;

    if (!n.isFailed()) {
      return `notification status "${n.status.value}" is not failed`;
    }

    if (n.attempts.length >= maxAttempts) {
      return `max attempts (${maxAttempts}) already reached (${n.attempts.length})`;
    }

    if (c.ctx?.error) {
      const reason = c.ctx.error.reason.toLowerCase();
      if (NON_RETRYABLE.has(reason)) {
        return `non-retryable error: ${c.ctx.error.reason}`;
      }
      if (!c.ctx.error.retryable) {
        return `error marked as not retryable`;
      }
    }

    // Retry window check (e.g., don't retry > 24h old)
    const retryWindowMs = (c.ctx?.retryWindowMinutes ?? 24 * 60) * 60 * 1000;
    const ageMs = now.getTime() - new Date(n.updatedAt).getTime();
    if (ageMs > retryWindowMs) {
      return `retry window (${c.ctx?.retryWindowMinutes ?? 1440} min) exceeded`;
    }

    return null;
  }

  static strict(): CanRetrySpecification {
    return new CanRetrySpecification();
  }
}
