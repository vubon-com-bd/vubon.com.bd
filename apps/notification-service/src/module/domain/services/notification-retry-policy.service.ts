/**
 * NotificationRetryPolicyService — retry timing + eligibility
 * @module notification-service/domain/services
 *
 * Business rules:
 *  - Max attempts: NOTIFICATION_LIMIT.RETRY_ATTEMPTS (3)
 *  - Exponential backoff: delay = base * 2^(attempt - 1)
 *  - Base delay per channel: email 60s, sms 30s, push 30s, webhook 10s
 *  - Webhook special: 10s, 30s, 120s, 600s, 3600s (config-driven)
 *  - Only retryable failure reasons (per DeliveryFailureReasonVO.isRetryable)
 */
import { NOTIFICATION_LIMIT } from '@vubon/shared-constants/platform/notification';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import type { NotificationChannelVO } from '../value-objects/primitives/notification-channel.vo.js';
import type { DeliveryFailureReasonVO } from '../value-objects/primitives/delivery-failure-reason.vo.js';

export interface RetryDecisionInput {
  readonly channel: NotificationChannelVO;
  readonly attempt: number;
  readonly failureReason: DeliveryFailureReasonVO;
  readonly lastAttemptAt: string;
  /** Optional max attempts override. */
  readonly maxAttempts?: number;
}

export interface RetryDecision {
  readonly shouldRetry: boolean;
  readonly nextAttemptAt?: string;
  readonly delayMs?: number;
  readonly reason?: string;
}

export class NotificationRetryPolicyService {
  static baseDelayMs(channel: NotificationChannelVO): number {
    if (channel.isEmail()) return 60_000;
    if (channel.isSms()) return 30_000;
    if (channel.isPush()) return 30_000;
    if (channel.isWebhook()) return 10_000;
    if (channel.isInApp()) return 5_000;
    return 60_000;
  }

  static webhookRetryDelaysMs(): readonly number[] {
    return [10, 30, 120, 600, 3600].map((s) => s * 1000);
  }

  static maxAttempts(): number {
    return NOTIFICATION_LIMIT.RETRY_ATTEMPTS;
  }

  static decide(input: RetryDecisionInput): RetryDecision {
    const max = input.maxAttempts ?? this.maxAttempts();

    if (input.attempt >= max) {
      return {
        shouldRetry: false,
        reason: `Retry attempts exhausted (${input.attempt}/${max})`,
      };
    }

    if (!input.failureReason.isRetryable()) {
      return {
        shouldRetry: false,
        reason: `Failure reason "${input.failureReason.value}" is permanent`,
      };
    }

    const delayMs = this.computeDelay(input.channel, input.attempt);
    const nextAttemptAt = new Date(
      new Date(input.lastAttemptAt).getTime() + delayMs,
    ).toISOString();

    return {
      shouldRetry: true,
      nextAttemptAt,
      delayMs,
    };
  }

  static computeDelay(channel: NotificationChannelVO, attempt: number): number {
    if (channel.isWebhook()) {
      const delays = this.webhookRetryDelaysMs();
      const idx = Math.min(attempt, delays.length - 1);
      return delays[idx] ?? delays[delays.length - 1] ?? 10_000;
    }
    const base = this.baseDelayMs(channel);
    const exponential = base * Math.pow(2, Math.max(0, attempt - 1));
    return Math.min(exponential, 3_600_000); // cap at 1 hour
  }

  static assertRetryable(input: RetryDecisionInput): RetryDecision {
    const decision = this.decide(input);
    if (!decision.shouldRetry) {
      throw new BusinessRuleError(
        decision.reason ?? 'Retry not allowed',
        'NOTIFICATION_RETRY_NOT_ALLOWED',
        {
          channel: input.channel.value,
          attempt: input.attempt,
          failureReason: input.failureReason.value,
        },
      );
    }
    return decision;
  }
}
