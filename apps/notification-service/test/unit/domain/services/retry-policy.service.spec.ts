import { RetryPolicyService } from '@domain/services/retry-policy.service.js';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

describe('RetryPolicyService', () => {
  describe('decide()', () => {
    it('allows retry for attempt 1', () => {
      const r = RetryPolicyService.decide({ attemptNumber: 1 });
      expect(r.shouldRetry).toBe(true);
      expect(r.nextDelayMs).toBeGreaterThan(0);
    });

    it('denies at max attempts', () => {
      const r = RetryPolicyService.decide({ attemptNumber: 3 });
      expect(r.shouldRetry).toBe(false);
      expect(r.reason).toBe('max-attempts-reached');
    });

    it('denies for non-retryable error codes', () => {
      const r = RetryPolicyService.decide({
        attemptNumber: 1,
        errorCode: 'INVALID_ADDRESS',
      });
      expect(r.shouldRetry).toBe(false);
      expect(r.reason).toContain('non-retryable');
    });

    it('denies for INVALID_PHONE', () => {
      const r = RetryPolicyService.decide({ attemptNumber: 1, errorCode: 'INVALID_PHONE' });
      expect(r.shouldRetry).toBe(false);
    });

    it('denies for INVALID_TOKEN', () => {
      const r = RetryPolicyService.decide({ attemptNumber: 1, errorCode: 'INVALID_TOKEN' });
      expect(r.shouldRetry).toBe(false);
    });

    it('denies for UNSUBSCRIBED', () => {
      const r = RetryPolicyService.decide({ attemptNumber: 1, errorCode: 'UNSUBSCRIBED' });
      expect(r.shouldRetry).toBe(false);
    });

    it('denies for BLOCKED', () => {
      const r = RetryPolicyService.decide({ attemptNumber: 1, errorCode: 'BLOCKED' });
      expect(r.shouldRetry).toBe(false);
    });

    it('allows retry for retryable errors', () => {
      const r = RetryPolicyService.decide({ attemptNumber: 1, errorCode: 'TIMEOUT' });
      expect(r.shouldRetry).toBe(true);
    });

    it('respects custom maxAttempts', () => {
      const r = RetryPolicyService.decide({
        attemptNumber: 5,
        config: { maxAttempts: 10 },
      });
      expect(r.shouldRetry).toBe(true);
    });

    it('throws on invalid attemptNumber', () => {
      expect(() => RetryPolicyService.decide({ attemptNumber: 0 })).toThrow(BusinessRuleError);
    });

    it('throws on negative attemptNumber', () => {
      expect(() => RetryPolicyService.decide({ attemptNumber: -1 })).toThrow(BusinessRuleError);
    });
  });

  describe('maxAttempts()', () => {
    it('returns default 3', () => {
      expect(RetryPolicyService.maxAttempts()).toBe(3);
    });

    it('returns custom config', () => {
      expect(RetryPolicyService.maxAttempts({ maxAttempts: 5 })).toBe(5);
    });
  });
});
