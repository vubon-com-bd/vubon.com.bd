/**
 * SignatureService — Unit Tests
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { SignatureService } from '@infrastructure/services/internal/signature.service';
import { hmacSha256 } from '@vubon/shared-utils/infrastructure';

describe('SignatureService', () => {
  let service: SignatureService;

  beforeEach(() => {
    service = new SignatureService();
  });

  describe('verifyHmacSha256()', () => {
    it('returns true for correct signature', async () => {
      const payload = 'hello';
      const secret = 'my-secret';
      const expected = await hmacSha256(payload, secret);
      const ok = await service.verifyHmacSha256(payload, expected, secret);
      expect(ok).toBe(true);
    });

    it('returns false for wrong signature', async () => {
      const ok = await service.verifyHmacSha256('hello', 'wrong', 'secret');
      expect(ok).toBe(false);
    });
  });

  describe('verifyStripeStyle()', () => {
    it('returns true for valid timestamped signature', async () => {
      const timestamp = Math.floor(Date.now() / 1000);
      const rawBody = '{"data":1}';
      const secret = 'whsec_test';
      const expected = await hmacSha256(`${timestamp}.${rawBody}`, secret);
      const header = `t=${timestamp},v1=${expected}`;
      const ok = await service.verifyStripeStyle(rawBody, header, secret);
      expect(ok).toBe(true);
    });

    it('returns false for stale timestamp', async () => {
      const oldTs = Math.floor(Date.now() / 1000) - 1000;
      const rawBody = '{}';
      const secret = 'whsec';
      const expected = await hmacSha256(`${oldTs}.${rawBody}`, secret);
      const header = `t=${oldTs},v1=${expected}`;
      const ok = await service.verifyStripeStyle(rawBody, header, secret);
      expect(ok).toBe(false);
    });

    it('returns false on malformed header', async () => {
      const ok = await service.verifyStripeStyle('{}', 'garbage', 'sec');
      expect(ok).toBe(false);
    });

    it('returns false on wrong signature', async () => {
      const timestamp = Math.floor(Date.now() / 1000);
      const header = `t=${timestamp},v1=wrong`;
      const ok = await service.verifyStripeStyle('{}', header, 'secret');
      expect(ok).toBe(false);
    });
  });

  describe('verifySharedSecret()', () => {
    it('returns true for equal strings', () => {
      expect(service.verifySharedSecret('abc', 'abc')).toBe(true);
    });

    it('returns false for unequal', () => {
      expect(service.verifySharedSecret('abc', 'abd')).toBe(false);
    });
  });
});
