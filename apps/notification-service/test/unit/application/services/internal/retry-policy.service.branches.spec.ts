import { describe, it, expect } from '@jest/globals';
import { NotificationRetryPolicyService } from '../../../../../src/module/domain/services/notification-retry-policy.service.js';
import { RetryPolicyService } from '../../../../../src/module/infrastructure/services/internal/retry-policy.service.js';

describe('RetryPolicyService (infra) branches', () => {
  const s = new RetryPolicyService();

  it('decide email retryable', () => {
    const d = s.decide({ channel: 'email', attempt: 1, failureReason: 'gateway_error' });
    expect(d.shouldRetry).toBe(true);
  });

  it('decide sms', () => {
    expect(s.decide({ channel: 'sms', attempt: 1, failureReason: 'timeout' }).shouldRetry).toBe(true);
  });

  it('decide push', () => {
    expect(s.decide({ channel: 'push', attempt: 1, failureReason: 'network_error' }).shouldRetry).toBe(true);
  });

  it('decide webhook', () => {
    expect(s.decide({ channel: 'webhook', attempt: 1, failureReason: 'rate_limited' }).shouldRetry).toBe(true);
  });

  it('decide in_app', () => {
    expect(s.decide({ channel: 'in_app', attempt: 1, failureReason: 'gateway_error' }).shouldRetry).toBe(true);
  });

  it('decide unknown channel', () => {
    expect(s.decide({ channel: 'unknown', attempt: 1, failureReason: 'gateway_error' }).shouldRetry).toBe(true);
  });

  it('decide denied when maxAttempts', () => {
    const d = s.decide({ channel: 'email', attempt: 5, failureReason: 'timeout', maxAttempts: 3 });
    expect(d.shouldRetry).toBe(false);
  });

  it('decide denied when permanent', () => {
    const d = s.decide({ channel: 'email', attempt: 1, failureReason: 'invalid_address' });
    expect(d.shouldRetry).toBe(false);
  });

  it('computeDelay per channel', () => {
    expect(s.computeDelay('email', 1)).toBe(60_000);
    expect(s.computeDelay('webhook', 0)).toBe(10_000);
    expect(s.computeDelay('sms', 1)).toBe(30_000);
    expect(s.computeDelay('push', 1)).toBe(30_000);
    expect(s.computeDelay('in_app', 1)).toBe(5_000);
    expect(s.computeDelay('unknown', 1)).toBe(60_000);
  });
});

describe('NotificationRetryPolicyService (domain)', () => {
  it('baseDelayMs branches', () => {
    const mk = (ch: string) => ({
      value: ch, isEmail: () => ch === 'email', isSms: () => ch === 'sms',
      isPush: () => ch === 'push', isWebhook: () => ch === 'webhook', isInApp: () => ch === 'in_app',
    } as never);
    expect(NotificationRetryPolicyService.baseDelayMs(mk('email'))).toBe(60_000);
    expect(NotificationRetryPolicyService.baseDelayMs(mk('sms'))).toBe(30_000);
    expect(NotificationRetryPolicyService.baseDelayMs(mk('push'))).toBe(30_000);
    expect(NotificationRetryPolicyService.baseDelayMs(mk('webhook'))).toBe(10_000);
    expect(NotificationRetryPolicyService.baseDelayMs(mk('in_app'))).toBe(5_000);
    expect(NotificationRetryPolicyService.baseDelayMs(mk('other'))).toBe(60_000);
  });

  it('computeDelay caps at 1h', () => {
    const mk = () => ({
      isEmail: () => true, isWebhook: () => false, isSms: () => false,
      isPush: () => false, isInApp: () => false,
    } as never);
    expect(NotificationRetryPolicyService.computeDelay(mk(), 20)).toBeLessThanOrEqual(3_600_000);
  });

  it('webhook retry delays fallback', () => {
    const mk = () => ({
      isWebhook: () => true, isEmail: () => false, isSms: () => false,
      isPush: () => false, isInApp: () => false,
    } as never);
    expect(NotificationRetryPolicyService.computeDelay(mk(), 100)).toBeGreaterThan(0);
  });

  it('assertRetryable throws when exhausted', () => {
    const mk = () => ({
      isEmail: () => true, isSms: () => false, isPush: () => false,
      isWebhook: () => false, isInApp: () => false,
    } as never);
    expect(() => NotificationRetryPolicyService.assertRetryable({
      channel: mk(), attempt: 10,
      failureReason: { value: 'timeout', isRetryable: () => true } as never,
      lastAttemptAt: new Date().toISOString(),
    })).toThrow();
  });

  it('assertRetryable ok', () => {
    const mk = () => ({
      isEmail: () => true, isSms: () => false, isPush: () => false,
      isWebhook: () => false, isInApp: () => false,
    } as never);
    const d = NotificationRetryPolicyService.assertRetryable({
      channel: mk(), attempt: 1,
      failureReason: { value: 'timeout', isRetryable: () => true } as never,
      lastAttemptAt: new Date().toISOString(),
    });
    expect(d.shouldRetry).toBe(true);
  });

  it('webhookRetryDelaysMs + maxAttempts', () => {
    expect(NotificationRetryPolicyService.webhookRetryDelaysMs().length).toBe(5);
    expect(NotificationRetryPolicyService.maxAttempts()).toBeGreaterThan(0);
  });
});
