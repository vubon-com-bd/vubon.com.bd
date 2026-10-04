/**
 * GuestTokenService — Unit Tests
 */
import { GuestTokenService } from '../../../../../src/module/infrastructure/services/internal/guest-token.service.js';

describe('GuestTokenService', () => {
  const svc = new GuestTokenService();

  describe('generate()', () => {
    it('produces a valid GuestTokenVO', () => {
      const t = svc.generate();
      expect(t.value.length).toBeGreaterThan(0);
    });

    it('produces unique tokens', () => {
      const a = svc.generate().value;
      const b = svc.generate().value;
      expect(a).not.toBe(b);
    });

    it('produces URL-safe base64 token', () => {
      const t = svc.generate().value;
      expect(t).toMatch(/^[A-Za-z0-9_-]+$/);
    });
  });

  describe('validate()', () => {
    it('accepts valid token', () => {
      const t = svc.generate();
      const v = svc.validate(t.value);
      expect(v.value).toBe(t.value);
    });

    it('throws on invalid token', () => {
      expect(() => svc.validate('short')).toThrow();
    });
  });

  describe('mask()', () => {
    it('masks last 4 chars only', () => {
      const t = svc.generate();
      const masked = svc.mask(t);
      expect(masked).toMatch(/\*+.{4}$/);
    });
  });
});
