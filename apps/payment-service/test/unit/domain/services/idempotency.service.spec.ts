/**
 * IdempotencyService unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { IdempotencyService } from '@domain/services/idempotency.service';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS, TEST_DATES } from '@fixtures/index';

describe('IdempotencyService', () => {
  describe('validate()', () => {
    it('accepts valid key', () => {
      expect(() => IdempotencyService.validate(TEST_IDS.IDEMPOTENCY_KEY)).not.toThrow();
    });
    it('rejects too short', () => {
      expect(() => IdempotencyService.validate('abc')).toThrow(ValidationError);
    });
    it('rejects too long (>128)', () => {
      expect(() => IdempotencyService.validate('a'.repeat(129))).toThrow(ValidationError);
    });
    it('rejects non-printable', () => {
      expect(() => IdempotencyService.validate('key\twith\ttab')).toThrow(ValidationError);
    });
    it('rejects non-string', () => {
      expect(() => IdempotencyService.validate(123 as unknown as string)).toThrow(ValidationError);
    });
  });

  describe('check()', () => {
    const refDate = new Date(TEST_DATES.NOW);

    it('no existing record → isReplay false', () => {
      const r = IdempotencyService.check(null, 'hash', refDate);
      expect(r.isReplay).toBe(false);
      expect(r.conflict).toBe(false);
    });

    it('same payload → isReplay true, no conflict', () => {
      const r = IdempotencyService.check(
        {
          key: 'key',
          payloadHash: 'hash',
          resultId: 'res-1',
          createdAt: TEST_DATES.NOW,
        },
        'hash',
        refDate,
      );
      expect(r.isReplay).toBe(true);
      expect(r.conflict).toBe(false);
      expect(r.existingId).toBe('res-1');
    });

    it('different payload → conflict true', () => {
      const r = IdempotencyService.check(
        {
          key: 'key',
          payloadHash: 'old',
          resultId: 'res-1',
          createdAt: TEST_DATES.NOW,
        },
        'new',
        refDate,
      );
      expect(r.isReplay).toBe(true);
      expect(r.conflict).toBe(true);
    });

    it('expired record → not replay', () => {
      const r = IdempotencyService.check(
        {
          key: 'key',
          payloadHash: 'hash',
          resultId: 'res-1',
          createdAt: TEST_DATES.LAST_YEAR,
        },
        'hash',
        refDate,
      );
      expect(r.isReplay).toBe(false);
    });
  });

  describe('assertNotConflict()', () => {
    it('throws on conflict', () => {
      expect(() =>
        IdempotencyService.assertNotConflict(
          { isReplay: true, conflict: true, existingId: 'res-1' },
          'key',
        ),
      ).toThrow(BusinessRuleError);
    });
    it('no throw on non-conflict', () => {
      expect(() =>
        IdempotencyService.assertNotConflict(
          { isReplay: true, conflict: false, existingId: 'res-1' },
          'key',
        ),
      ).not.toThrow();
    });
  });

  describe('isExpired()', () => {
    it('true for old records', () => {
      expect(IdempotencyService.isExpired(TEST_DATES.LAST_YEAR, new Date(TEST_DATES.NOW))).toBe(true);
    });
    it('false for recent records', () => {
      expect(IdempotencyService.isExpired(TEST_DATES.NOW, new Date(TEST_DATES.NOW))).toBe(false);
    });
  });
});
