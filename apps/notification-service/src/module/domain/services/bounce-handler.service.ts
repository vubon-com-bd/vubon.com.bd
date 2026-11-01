/**
 * BounceHandlerService
 * @module notification-service/domain/services
 *
 * Classifies bounce events into soft/hard/complaint।
 * Determines corrective action।
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { NOTIFICATION_DELIVERY_FAILURE_REASON } from '@vubon/shared-constants/platform';

export type BounceType = 'soft' | 'hard' | 'complaint' | 'unknown';

export interface BounceInput {
  readonly errorCode: string; // provider-specific
  readonly reason: string; // our internal reason
  readonly attemptNumber?: number;
}

export interface BounceResult {
  readonly type: BounceType;
  readonly action: 'retry' | 'block' | 'unsubscribe' | 'suppress';
  readonly reason: string;
}

// Hard bounce codes (permanent failures)
const HARD_BOUNCE_CODES = new Set<string>([
  'INVALID_ADDRESS',
  'INVALID_PHONE',
  'INVALID_TOKEN',
  'MAILBOX_DOES_NOT_EXIST',
  'DOMAIN_NOT_FOUND',
  'USER_UNKNOWN',
  'BLOCKED',
]);

// Complaint codes
const COMPLAINT_CODES = new Set<string>([
  'SPAM_COMPLAINT',
  'ABUSE_REPORT',
  'USER_COMPLAINT',
]);

// Soft bounce (retry-able)
const SOFT_BOUNCE_CODES = new Set<string>([
  'MAILBOX_FULL',
  'TEMPORARY_FAILURE',
  'RATE_LIMITED',
  'TIMEOUT',
  'NETWORK_ERROR',
  'GATEWAY_ERROR',
]);

export class BounceHandlerService {
  static classify(input: BounceInput): BounceResult {
    const code = (input.errorCode || input.reason || '').toUpperCase();

    if (COMPLAINT_CODES.has(code)) {
      return {
        type: 'complaint',
        action: 'unsubscribe',
        reason: 'user complained — unsubscribe required',
      };
    }

    if (HARD_BOUNCE_CODES.has(code)) {
      return {
        type: 'hard',
        action: 'block',
        reason: `permanent failure: ${code}`,
      };
    }

    if (SOFT_BOUNCE_CODES.has(code)) {
      // After many attempts, treat as hard
      if (input.attemptNumber !== undefined && input.attemptNumber >= 5) {
        return {
          type: 'soft',
          action: 'suppress',
          reason: `soft bounce exhausted after ${input.attemptNumber} attempts`,
        };
      }
      return {
        type: 'soft',
        action: 'retry',
        reason: `temporary failure: ${code}`,
      };
    }

    // Match internal reason codes
    if (input.reason === NOTIFICATION_DELIVERY_FAILURE_REASON.INVALID_ADDRESS) {
      return { type: 'hard', action: 'block', reason: 'invalid address' };
    }
    if (input.reason === NOTIFICATION_DELIVERY_FAILURE_REASON.UNSUBSCRIBED) {
      return { type: 'complaint', action: 'unsubscribe', reason: 'user unsubscribed' };
    }

    return {
      type: 'unknown',
      action: 'retry',
      reason: 'unclassified — default retry',
    };
  }

  /** Categorize severity (for alerting) */
  static severity(result: BounceResult): 'low' | 'medium' | 'high' {
    if (result.action === 'block' || result.action === 'unsubscribe') return 'high';
    if (result.action === 'suppress') return 'medium';
    return 'low';
  }
}
