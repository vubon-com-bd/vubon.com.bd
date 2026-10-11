/**
 * RetryPolicyService — computes backoff + decides retry eligibility
 * @module notification-service/infrastructure/services/internal
 */
import { Injectable, Logger } from '@nestjs/common';
import { NotificationRetryPolicyService } from '../../../domain/services/notification-retry-policy.service.js';
import { DeliveryFailureReasonVO } from '../../../domain/value-objects/primitives/delivery-failure-reason.vo.js';

export const RETRY_POLICY_SERVICE = Symbol('RETRY_POLICY_SERVICE');

export interface RetryDecision {
  readonly shouldRetry: boolean;
  readonly delayMs?: number;
  readonly nextAttemptAt?: string;
  readonly reason?: string;
}

@Injectable()
export class RetryPolicyService {
  private readonly logger = new Logger(RetryPolicyService.name);

  decide(input: {
    channel: string;
    attempt: number;
    failureReason: string;
    lastAttemptAt?: string;
    maxAttempts?: number;
  }): RetryDecision {
    const reason = DeliveryFailureReasonVO.reconstitute(input.failureReason);
    const decision = NotificationRetryPolicyService.decide({
      channel: { value: input.channel, isEmail: () => input.channel === 'email', isSms: () => input.channel === 'sms', isPush: () => input.channel === 'push', isWebhook: () => input.channel === 'webhook', isInApp: () => input.channel === 'in_app' } as never,
      attempt: input.attempt,
      failureReason: reason,
      lastAttemptAt: input.lastAttemptAt ?? new Date().toISOString(),
      maxAttempts: input.maxAttempts,
    });
    return {
      shouldRetry: decision.shouldRetry,
      delayMs: decision.delayMs,
      nextAttemptAt: decision.nextAttemptAt,
      reason: decision.reason,
    };
  }

  computeDelay(channel: string, attempt: number): number {
    return NotificationRetryPolicyService.computeDelay(
      { value: channel, isEmail: () => channel === 'email', isSms: () => channel === 'sms', isPush: () => channel === 'push', isWebhook: () => channel === 'webhook', isInApp: () => channel === 'in_app' } as never,
      attempt,
    );
  }
}
