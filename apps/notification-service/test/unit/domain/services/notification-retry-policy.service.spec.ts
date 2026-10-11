/**
 * NotificationRetryPolicyService — backoff + eligibility
 */
import { describe, it, expect } from '@jest/globals';
import { NotificationRetryPolicyService } from '../../../../src/module/domain/services/notification-retry-policy.service.js';

const emailChannel = {
  value: 'email',
  isEmail: () => true,
  isSms: () => false,
  isPush: () => false,
  isWebhook: () => false,
  isInApp: () => false,
} as never;

describe('NotificationRetryPolicyService', () => {
  describe('computeDelay', () => {
    it('should compute exponential backoff for email', () => {
      const d1 = NotificationRetryPolicyService.computeDelay(emailChannel, 1);
      const d2 = NotificationRetryPolicyService.computeDelay(emailChannel, 2);
      const d3 = NotificationRetryPolicyService.computeDelay(emailChannel, 3);
      expect(d1).toBe(60_000);
      expect(d2).toBe(120_000);
      expect(d3).toBe(240_000);
    });

    it('should cap at 1 hour', () => {
      const d10 = NotificationRetryPolicyService.computeDelay(emailChannel, 10);
      expect(d10).toBeLessThanOrEqual(3_600_000);
    });

    it('should use webhook-specific schedule', () => {
      const webhookChannel = {
        isWebhook: () => true,
        isEmail: () => false,
        isSms: () => false,
        isPush: () => false,
        isInApp: () => false,
      } as never;
      expect(NotificationRetryPolicyService.computeDelay(webhookChannel, 0)).toBe(10_000);
      expect(NotificationRetryPolicyService.computeDelay(webhookChannel, 1)).toBe(30_000);
      expect(NotificationRetryPolicyService.computeDelay(webhookChannel, 2)).toBe(120_000);
    });
  });

  describe('decide', () => {
    it('should allow retry for retryable reason', () => {
      const decision = NotificationRetryPolicyService.decide({
        channel: emailChannel,
        attempt: 1,
        failureReason: {
          value: 'gateway_error',
          isRetryable: () => true,
        } as never,
        lastAttemptAt: new Date().toISOString(),
      });
      expect(decision.shouldRetry).toBe(true);
      expect(decision.delayMs).toBeDefined();
      expect(decision.nextAttemptAt).toBeDefined();
    });

    it('should deny when attempts exhausted', () => {
      const decision = NotificationRetryPolicyService.decide({
        channel: emailChannel,
        attempt: 5,
        failureReason: {
          value: 'gateway_error',
          isRetryable: () => true,
        } as never,
        lastAttemptAt: new Date().toISOString(),
        maxAttempts: 3,
      });
      expect(decision.shouldRetry).toBe(false);
      expect(decision.reason).toMatch(/exhausted/i);
    });

    it('should deny when failure is permanent', () => {
      const decision = NotificationRetryPolicyService.decide({
        channel: emailChannel,
        attempt: 1,
        failureReason: {
          value: 'invalid_address',
          isRetryable: () => false,
        } as never,
        lastAttemptAt: new Date().toISOString(),
      });
      expect(decision.shouldRetry).toBe(false);
      expect(decision.reason).toMatch(/permanent/i);
    });
  });
});
