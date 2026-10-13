/**
 * RecoveryCodeGeneratorService — Unit Tests
 */
import { describe, it, expect, beforeEach, afterEach, beforeAll, afterAll, jest } from '@jest/globals';
import { RecoveryCodeGeneratorService } from '../../../../src/module/infrastructure/services/internal/recovery-code-generator.service.js';

describe('RecoveryCodeGeneratorService', () => {
  let service: RecoveryCodeGeneratorService;

  beforeEach(() => {
    service = new RecoveryCodeGeneratorService();
  });

  describe('generate()', () => {
    it('generates 10 codes by default', () => {
      const codes = service.generate();
      expect(codes).toHaveLength(10);
    });

    it('all codes are unique', () => {
      const codes = service.generate();
      const set = new Set(codes);
      expect(set.size).toBe(codes.length);
    });

    it('all codes are alphanumeric uppercase', () => {
      const codes = service.generate();
      codes.forEach((code) => {
        expect(/^[A-Z0-9]+$/.test(code)).toBe(true);
      });
    });
  });

  describe('generateOne()', () => {
    it('generates single code with length', () => {
      const code = service.generateOne(10);
      expect(code).toHaveLength(10);
    });
  });

  describe('normalize()', () => {
    it('uppercases and strips spaces', () => {
      expect(service.normalize('abcd 1234-ef')).toBe('ABCD1234EF');
    });
  });

  describe('isLow()', () => {
    it('true when remaining <= 2', () => {
      expect(service.isLow(1)).toBe(true);
      expect(service.isLow(2)).toBe(true);
      expect(service.isLow(3)).toBe(false);
    });
  });

  describe('isExhausted()', () => {
    it('true when remaining is 0', () => {
      expect(service.isExhausted(0)).toBe(true);
      expect(service.isExhausted(1)).toBe(false);
    });
  });
});
