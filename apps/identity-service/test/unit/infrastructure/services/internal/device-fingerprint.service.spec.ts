/**
 * DeviceFingerprintService tests
 */
import { describe, it, expect } from '@jest/globals';
import { DeviceFingerprintService } from '@infrastructure/services/internal/device-fingerprint.service.js';

describe('DeviceFingerprintService', () => {
  const service = new DeviceFingerprintService();

  describe('compute()', () => {
    it('should produce 64-char hex hash', () => {
      const fp = service.compute({ userAgent: 'Mozilla', platform: 'web' });
      expect(fp).toHaveLength(64);
      expect(/^[a-f0-9]+$/.test(fp)).toBe(true);
    });

    it('should be deterministic for same input', () => {
      const fp1 = service.compute({ userAgent: 'A', platform: 'B' });
      const fp2 = service.compute({ userAgent: 'A', platform: 'B' });
      expect(fp1).toBe(fp2);
    });

    it('should differ for different input', () => {
      const fp1 = service.compute({ userAgent: 'A' });
      const fp2 = service.compute({ userAgent: 'B' });
      expect(fp1).not.toBe(fp2);
    });

    it('should handle empty input', () => {
      const fp = service.compute({});
      expect(fp).toHaveLength(64);
    });
  });

  describe('matches()', () => {
    it('should match identical strings', () => {
      expect(service.matches('abc', 'abc')).toBe(true);
    });

    it('should not match different lengths', () => {
      expect(service.matches('abc', 'abcd')).toBe(false);
    });

    it('should not match different content', () => {
      expect(service.matches('abc', 'xyz')).toBe(false);
    });
  });

  describe('isValid()', () => {
    it('should accept 64-char hex', () => {
      expect(service.isValid('a'.repeat(64))).toBe(true);
    });

    it('should reject short', () => {
      expect(service.isValid('abc')).toBe(false);
    });

    it('should reject non-hex', () => {
      expect(service.isValid('z'.repeat(64))).toBe(false);
    });
  });
});
