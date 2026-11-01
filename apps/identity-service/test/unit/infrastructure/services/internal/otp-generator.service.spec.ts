/**
 * OtpGeneratorService tests
 */
import { describe, it, expect } from '@jest/globals';
import { OtpGeneratorService } from '@infrastructure/services/internal/otp-generator.service.js';

describe('OtpGeneratorService', () => {
  const service = new OtpGeneratorService();

  describe('generate()', () => {
    it('should generate default 6-digit code', () => {
      const code = service.generate();
      expect(code).toHaveLength(6);
      expect(/^\d+$/.test(code)).toBe(true);
    });

    it('should generate 8-digit code', () => {
      expect(service.generate(8)).toHaveLength(8);
    });

    it('should generate 4-digit code', () => {
      expect(service.generate(4)).toHaveLength(4);
    });

    it('should not start with zero', () => {
      for (let i = 0; i < 20; i++) {
        const code = service.generate();
        expect(code[0]).not.toBe('0');
      }
    });

    it('should generate different codes', () => {
      const codes = new Set<string>();
      for (let i = 0; i < 10; i++) codes.add(service.generate());
      expect(codes.size).toBeGreaterThan(1);
    });
  });

  describe('expiresAt()', () => {
    it('should return future Date', () => {
      const exp = service.expiresAt();
      expect(exp.getTime()).toBeGreaterThan(Date.now());
    });
  });

  describe('cooldownRemainingSeconds()', () => {
    it('should return >0 when cooldown active', () => {
      const r = service.cooldownRemainingSeconds(Date.now() - 5000);
      expect(r).toBeGreaterThan(0);
    });

    it('should return 0 when cooldown passed', () => {
      const r = service.cooldownRemainingSeconds(Date.now() - 120_000);
      expect(r).toBe(0);
    });
  });

  describe('length / maxAttempts', () => {
    it('should expose constants', () => {
      expect(service.length()).toBe(6);
      expect(service.maxAttempts()).toBeGreaterThan(0);
    });
  });
});
