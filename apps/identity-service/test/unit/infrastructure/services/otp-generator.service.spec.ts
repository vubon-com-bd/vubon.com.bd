/**
 * OtpGeneratorService — Unit Tests
 */
import { describe, it, expect, beforeEach, afterEach, beforeAll, afterAll, jest } from '@jest/globals';
import { OtpGeneratorService } from '../../../../src/module/infrastructure/services/internal/otp-generator.service.js';

describe('OtpGeneratorService', () => {
  let service: OtpGeneratorService;

  beforeEach(() => {
    service = new OtpGeneratorService();
  });

  describe('generate()', () => {
    it('generates 6-digit code by default', () => {
      const otp = service.generate();
      expect(otp).toHaveLength(6);
      expect(/^\d{6}$/.test(otp)).toBe(true);
    });

    it('generates custom length', () => {
      const otp = service.generate(4);
      expect(otp).toHaveLength(4);
    });

    it('generates unique codes on multiple calls', () => {
      const codes = new Set<string>();
      for (let i = 0; i < 20; i++) codes.add(service.generate());
      expect(codes.size).toBeGreaterThan(15);
    });

    it('never starts with 0', () => {
      for (let i = 0; i < 50; i++) {
        const otp = service.generate();
        expect(otp[0]).not.toBe('0');
      }
    });
  });

  describe('expiresAt()', () => {
    it('returns future date', () => {
      const expiry = service.expiresAt();
      expect(expiry.getTime()).toBeGreaterThan(Date.now());
    });
  });

  describe('cooldownRemainingSeconds()', () => {
    it('returns positive when within cooldown', () => {
      const remaining = service.cooldownRemainingSeconds(Date.now() - 1000);
      expect(remaining).toBeGreaterThan(0);
    });

    it('returns 0 when cooldown passed', () => {
      const remaining = service.cooldownRemainingSeconds(Date.now() - 120000);
      expect(remaining).toBe(0);
    });
  });
});
