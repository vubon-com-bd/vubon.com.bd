import { RateLimiterService } from '@domain/services/rate-limiter.service.js';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

const NOW = Date.now();
const config = { limit: 10, windowMs: 60_000 };

describe('RateLimiterService', () => {
  describe('consume()', () => {
    it('allows within limit', () => {
      const state = RateLimiterService.empty(config, NOW);
      const r = RateLimiterService.consume(state, config, NOW, 1);
      expect(r.allowed).toBe(true);
      expect(r.remaining).toBe(9);
    });

    it('denies when tokens depleted', () => {
      const state = RateLimiterService.empty(config, NOW);
      const r = RateLimiterService.consume(state, config, NOW, 10);
      expect(r.allowed).toBe(true);
      const r2 = RateLimiterService.consume(r.newState, config, NOW, 1);
      expect(r2.allowed).toBe(false);
      expect(r2.retryAfterMs).toBeGreaterThan(0);
    });

    it('resets window after expiry', () => {
      const state = { tokens: 0, windowStartMs: NOW };
      const later = NOW + 60_001;
      const r = RateLimiterService.consume(state, config, later, 5);
      expect(r.allowed).toBe(true);
    });

    it('throws on invalid limit', () => {
      expect(() =>
        RateLimiterService.consume({ tokens: 1, windowStartMs: NOW }, { limit: 0, windowMs: 60_000 }, NOW, 1),
      ).toThrow(BusinessRuleError);
    });

    it('throws on invalid windowMs', () => {
      expect(() =>
        RateLimiterService.consume({ tokens: 1, windowStartMs: NOW }, { limit: 5, windowMs: 0 }, NOW, 1),
      ).toThrow(BusinessRuleError);
    });

    it('throws on invalid cost', () => {
      const state = RateLimiterService.empty(config, NOW);
      expect(() => RateLimiterService.consume(state, config, NOW, 20)).toThrow(BusinessRuleError);
    });
  });

  describe('canConsume()', () => {
    it('true when enough', () => {
      const state = RateLimiterService.empty(config, NOW);
      expect(RateLimiterService.canConsume(state, config, NOW, 5)).toBe(true);
    });

    it('false when depleted', () => {
      const state = { tokens: 2, windowStartMs: NOW };
      expect(RateLimiterService.canConsume(state, config, NOW, 5)).toBe(false);
    });
  });

  describe('empty()', () => {
    it('initializes full tokens', () => {
      const s = RateLimiterService.empty(config, NOW);
      expect(s.tokens).toBe(10);
      expect(s.windowStartMs).toBe(NOW);
    });
  });
});
