/**
 * RetryPolicyService
 * @module notification-service/domain/services
 *
 * Exponential backoff with jitter।
 * Computes delay + max attempts for a failure।
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

export interface RetryPolicyConfig {
  readonly maxAttempts: number;
  readonly initialDelayMs: number;
  readonly multiplier: number;
  readonly maxDelayMs: number;
  readonly jitterRatio?: number; // 0..1
}

export interface RetryDecisionInput {
  readonly attemptNumber: number; // 1-based
  readonly errorCode?: string;
  readonly config?: Partial<RetryPolicyConfig>;
}

export interface RetryDecision {
  readonly shouldRetry: boolean;
  readonly nextDelayMs: number;
  readonly reason: string;
}

const DEFAULT_CONFIG: RetryPolicyConfig = {
  maxAttempts: 3,
  initialDelayMs: 60_000, // 1 minute
  multiplier: 2,
  maxDelayMs: 60 * 60 * 1000, // 1 hour
  jitterRatio: 0.2,
};

// Non-retryable error classes
const NON_RETRYABLE = new Set<string>([
  'INVALID_ADDRESS',
  'INVALID_PHONE',
  'INVALID_TOKEN',
  'UNSUBSCRIBED',
  'BLOCKED',
  'MESSAGE_REJECTED',
  'TEMPLATE_INVALID',
]);

export class RetryPolicyService {
  static decide(input: RetryDecisionInput): RetryDecision {
    const config = { ...DEFAULT_CONFIG, ...input.config };

    if (!Number.isInteger(input.attemptNumber) || input.attemptNumber < 1) {
      throw new BusinessRuleError(
        'attemptNumber must be a positive integer',
        'INVALID_ATTEMPT',
      );
    }

    if (input.errorCode && NON_RETRYABLE.has(input.errorCode.toUpperCase())) {
      return {
        shouldRetry: false,
        nextDelayMs: 0,
        reason: `non-retryable:${input.errorCode}`,
      };
    }

    if (input.attemptNumber >= config.maxAttempts) {
      return {
        shouldRetry: false,
        nextDelayMs: 0,
        reason: 'max-attempts-reached',
      };
    }

    const baseDelay = Math.min(
      config.initialDelayMs * Math.pow(config.multiplier, input.attemptNumber - 1),
      config.maxDelayMs,
    );

    const jitterAmount = baseDelay * (config.jitterRatio ?? 0);
    const jitter = Math.floor((Math.random() * 2 - 1) * jitterAmount);
    const delay = Math.max(config.initialDelayMs, baseDelay + jitter);

    return {
      shouldRetry: true,
      nextDelayMs: delay,
      reason: `retry:attempt-${input.attemptNumber + 1}`,
    };
  }

  static maxAttempts(config?: Partial<RetryPolicyConfig>): number {
    return config?.maxAttempts ?? DEFAULT_CONFIG.maxAttempts;
  }
}
