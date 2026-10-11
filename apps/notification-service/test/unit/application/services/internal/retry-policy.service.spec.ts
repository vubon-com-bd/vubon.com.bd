import { describe, it, expect } from '@jest/globals';
import { RetryPolicyService } from '../../../../../src/module/infrastructure/services/internal/retry-policy.service.js';

describe('RetryPolicyService', () => {
  const s = new RetryPolicyService();

  it('decide retryable email', () => {
    const d = s.decide({
      channel: 'email',
      attempt: 1,
      failureReason: 'gateway_error',
    });
    expect(d.shouldRetry).toBe(true);
    expect(d.delayMs).toBeDefined();
  });

  it('decide sms channel', () => {
    const d = s.decide({
      channel: 'sms',
      attempt: 1,
      failureReason: 'timeout',
    });
    expect(d.shouldRetry).toBe(true);
  });

  it('decide push channel', () => {
    const d = s.decide({
      channel: 'push',
      attempt: 1,
      failureReason: 'network_error',
    });
    expect(d.shouldRetry).toBe(true);
  });

  it('decide webhook channel', () => {
    const d = s.decide({
      channel: 'webhook',
      attempt: 1,
      failureReason: 'rate_limited',
    });
    expect(d.shouldRetry).toBe(true);
  });

  it('decide in_app channel', () => {
    const d = s.decide({
      channel: 'in_app',
      attempt: 1,
      failureReason: 'gateway_error',
    });
    expect(d.shouldRetry).toBe(true);
  });

  it('decide unknown channel', () => {
    const d = s.decide({
      channel: 'unknown',
      attempt: 1,
      failureReason: 'gateway_error',
    });
    expect(d.shouldRetry).toBe(true);
  });

  it('decide denied when maxAttempts reached', () => {
    const d = s.decide({
      channel: 'email',
      attempt: 5,
      failureReason: 'timeout',
      maxAttempts: 3,
    });
    expect(d.shouldRetry).toBe(false);
  });

  it('computeDelay email', () => {
    expect(s.computeDelay('email', 1)).toBe(60_000);
  });

  it('computeDelay webhook', () => {
    expect(s.computeDelay('webhook', 0)).toBe(10_000);
  });

  it('computeDelay sms', () => {
    expect(s.computeDelay('sms', 1)).toBe(30_000);
  });

  it('computeDelay push', () => {
    expect(s.computeDelay('push', 1)).toBe(30_000);
  });

  it('computeDelay in_app', () => {
    expect(s.computeDelay('in_app', 1)).toBe(5_000);
  });

  it('computeDelay unknown', () => {
    expect(s.computeDelay('other', 1)).toBe(60_000);
  });
});
