/**
 * CircuitBreakerService — Unit Tests
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { CircuitBreakerService } from '@infrastructure/services/internal/circuit-breaker.service';

describe('CircuitBreakerService', () => {
  let breaker: CircuitBreakerService;

  beforeEach(() => {
    breaker = new CircuitBreakerService();
  });

  it('starts in CLOSED state', () => {
    expect(breaker.getState('stripe')).toBe('CLOSED');
  });

  it('passes through on success', async () => {
    const fn = async () => 'ok';
    const result = await breaker.execute('stripe', fn);
    expect(result).toBe('ok');
    expect(breaker.getState('stripe')).toBe('CLOSED');
  });

  it('opens circuit after 5 failures', async () => {
    const fn = async () => {
      throw new Error('boom');
    };
    for (let i = 0; i < 5; i++) {
      await expect(breaker.execute('stripe', fn)).rejects.toThrow('boom');
    }
    expect(breaker.getState('stripe')).toBe('OPEN');
  });

  it('rejects while OPEN', async () => {
    const fn = async () => {
      throw new Error('boom');
    };
    for (let i = 0; i < 5; i++) {
      await expect(breaker.execute('stripe', fn)).rejects.toThrow();
    }
    // Next call should reject without calling fn
    let called = false;
    const nextFn = async () => {
      called = true;
      return 'ok';
    };
    await expect(breaker.execute('stripe', nextFn)).rejects.toThrow(
      /Circuit open/,
    );
    expect(called).toBe(false);
  });

  it('resets to CLOSED on reset()', async () => {
    const fn = async () => {
      throw new Error('boom');
    };
    for (let i = 0; i < 5; i++) {
      await expect(breaker.execute('stripe', fn)).rejects.toThrow();
    }
    breaker.reset('stripe');
    expect(breaker.getState('stripe')).toBe('CLOSED');
  });

  it('isolates per key', async () => {
    const fn = async () => {
      throw new Error('boom');
    };
    for (let i = 0; i < 5; i++) {
      await expect(breaker.execute('stripe', fn)).rejects.toThrow();
    }
    expect(breaker.getState('stripe')).toBe('OPEN');
    expect(breaker.getState('paypal')).toBe('CLOSED');
  });
});
