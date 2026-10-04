import { jest } from '@jest/globals';
import { RetryPolicyService } from '../../../../src/module/infrastructure/services/internal/retry-policy.service.js';

describe('RetryPolicyService', () => {
  let service: RetryPolicyService;

  beforeEach(() => {
    service = new RetryPolicyService();
  });

  it('next() returns first backoff for attempt 0', () => {
    expect(service.next(0)).toBe(30_000);
  });

  it('next() returns sequential backoffs', () => {
    expect(service.next(0)).toBe(30_000);
    expect(service.next(1)).toBe(120_000);
    expect(service.next(2)).toBe(600_000);
  });

  it('next() returns undefined after exhausting backoffs', () => {
    expect(service.next(3)).toBeUndefined();
    expect(service.next(10)).toBeUndefined();
  });

  it('isExhausted() false before max', () => {
    expect(service.isExhausted(0)).toBe(false);
    expect(service.isExhausted(1)).toBe(false);
    expect(service.isExhausted(2)).toBe(false);
  });

  it('isExhausted() true at/after max', () => {
    expect(service.isExhausted(3)).toBe(true);
    expect(service.isExhausted(5)).toBe(true);
  });

  it('next() accepts custom backoff array', () => {
    expect(service.next(1, [1_000, 2_000, 4_000])).toBe(2_000);
  });
});
