/**
 * PaymentCryptoService — Unit Tests
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { PaymentCryptoService } from '@infrastructure/services/internal/crypto.service';

describe('PaymentCryptoService', () => {
  let service: PaymentCryptoService;

  beforeEach(() => {
    service = new PaymentCryptoService();
  });

  describe('fingerprint()', () => {
    it('returns a deterministic hex hash', async () => {
      const a = await service.fingerprint('hello');
      const b = await service.fingerprint('hello');
      expect(a).toBe(b);
      expect(a).toMatch(/^[0-9a-f]{64}$/);
    });

    it('different inputs give different hashes', async () => {
      const a = await service.fingerprint('a');
      const b = await service.fingerprint('b');
      expect(a).not.toBe(b);
    });
  });

  describe('sign()', () => {
    it('returns hmac hex', async () => {
      const sig = await service.sign('payload', 'secret');
      expect(sig).toMatch(/^[0-9a-f]{64}$/);
    });

    it('different secret produces different signature', async () => {
      const a = await service.sign('payload', 'secret1');
      const b = await service.sign('payload', 'secret2');
      expect(a).not.toBe(b);
    });
  });

  describe('compare()', () => {
    it('returns true for equal strings', () => {
      expect(service.compare('abc', 'abc')).toBe(true);
    });

    it('returns false for unequal strings', () => {
      expect(service.compare('abc', 'abd')).toBe(false);
    });

    it('returns false for different lengths', () => {
      expect(service.compare('a', 'ab')).toBe(false);
    });
  });

  describe('generateToken()', () => {
    it('generates hex token of correct length', () => {
      const token = service.generateToken(16);
      expect(token).toMatch(/^[0-9a-f]{32}$/);
    });

    it('generates unique tokens', () => {
      const a = service.generateToken();
      const b = service.generateToken();
      expect(a).not.toBe(b);
    });
  });

  describe('idempotencyFingerprint()', () => {
    it('is deterministic regardless of key order', async () => {
      const a = await service.idempotencyFingerprint({ a: 1, b: 2 });
      const b = await service.idempotencyFingerprint({ b: 2, a: 1 });
      expect(a).toBe(b);
    });

    it('different payloads give different hashes', async () => {
      const a = await service.idempotencyFingerprint({ a: 1 });
      const b = await service.idempotencyFingerprint({ a: 2 });
      expect(a).not.toBe(b);
    });
  });
});
