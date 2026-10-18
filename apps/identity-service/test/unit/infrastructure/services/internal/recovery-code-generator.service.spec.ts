/**
 * RecoveryCodeGeneratorService tests
 */
import { describe, it, expect } from '@jest/globals';
import { RecoveryCodeGeneratorService } from '@infrastructure/services/internal/recovery-code-generator.service.js';

describe('RecoveryCodeGeneratorService', () => {
  const service = new RecoveryCodeGeneratorService();

  describe('generate()', () => {
    it('should generate 10 codes by default', () => {
      const codes = service.generate();
      expect(codes.length).toBe(10);
    });

    it('should generate 5 codes', () => {
      const codes = service.generate(5);
      expect(codes.length).toBe(5);
    });

    it('should generate unique codes', () => {
      const codes = service.generate(10);
      const set = new Set(codes);
      expect(set.size).toBe(10);
    });

    it('should generate alphanumeric codes', () => {
      const codes = service.generate(3);
      codes.forEach((c) => expect(/^[A-Z0-9]+$/.test(c)).toBe(true));
    });
  });

  describe('generateOne()', () => {
    it('should generate 10-char code', () => {
      const code = service.generateOne(10);
      expect(code.length).toBe(10);
    });
  });

  describe('normalize()', () => {
    it('should uppercase and trim', () => {
      expect(service.normalize('  abcd-1234  ')).toBe('ABCD1234');
    });
  });

  describe('isLow()', () => {
    it('should return true for <= 2', () => {
      expect(service.isLow(2)).toBe(true);
      expect(service.isLow(3)).toBe(false);
    });
  });

  describe('isExhausted()', () => {
    it('should return true for 0', () => {
      expect(service.isExhausted(0)).toBe(true);
      expect(service.isExhausted(1)).toBe(false);
    });
  });
});
