/**
 * BackupCodeService unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { BackupCodeService } from '@domain/services/backup-code.service.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('BackupCodeService', () => {
  describe('count() / length()', () => {
    it('should return positive', () => {
      expect(BackupCodeService.count()).toBeGreaterThan(0);
      expect(BackupCodeService.length()).toBeGreaterThan(0);
    });
  });

  describe('generate()', () => {
    it('should generate N codes', () => {
      const codes = BackupCodeService.generate(5);
      expect(codes.length).toBe(5);
    });

    it('should generate unique codes', () => {
      const codes = BackupCodeService.generate(10);
      const set = new Set(codes);
      expect(set.size).toBe(10);
    });

    it('should use correct length', () => {
      const codes = BackupCodeService.generate(3);
      codes.forEach((c) => expect(c.length).toBe(BackupCodeService.length()));
    });

    it('should only use safe alphabet (no confusing chars)', () => {
      const codes = BackupCodeService.generate(20);
      const all = codes.join('');
      expect(all).not.toMatch(/[01IO]/);
    });

    it('should throw on count < 1', () => {
      expect(() => BackupCodeService.generate(0)).toThrow(ValidationError);
    });

    it('should throw on count > 30', () => {
      expect(() => BackupCodeService.generate(31)).toThrow(ValidationError);
    });

    it('should default to count()', () => {
      const codes = BackupCodeService.generate();
      expect(codes.length).toBe(BackupCodeService.count());
    });
  });

  describe('generateOne()', () => {
    it('should return single code', () => {
      const code = BackupCodeService.generateOne();
      expect(code.length).toBe(BackupCodeService.length());
    });
  });

  describe('normalize()', () => {
    it('should trim + uppercase + remove spaces/dashes', () => {
      expect(BackupCodeService.normalize(' abcd-1234 ')).toBe('ABCD1234');
      expect(BackupCodeService.normalize('abcd 1234')).toBe('ABCD1234');
    });
  });

  describe('isLow()', () => {
    it('true for <= 2', () => {
      expect(BackupCodeService.isLow(2)).toBe(true);
      expect(BackupCodeService.isLow(1)).toBe(true);
      expect(BackupCodeService.isLow(0)).toBe(true);
      expect(BackupCodeService.isLow(5)).toBe(false);
    });
  });

  describe('isExhausted()', () => {
    it('true only for 0', () => {
      expect(BackupCodeService.isExhausted(0)).toBe(true);
      expect(BackupCodeService.isExhausted(1)).toBe(false);
    });
  });
});
