import { DigestPeriodVO } from '@domain/primitives/digest-period.vo.js';
import { InvalidDigestPeriodError } from '@domain/errors/digest.errors.js';
import { DATES } from '@domain-fixtures/dates.fixture.js';

describe('DigestPeriodVO', () => {
  describe('create()', () => {
    it('accepts valid period', () => {
      const vo = DigestPeriodVO.create({
        frequency: 'daily',
        periodStart: DATES.dayAgo,
        periodEnd: DATES.now,
      });
      expect(vo.frequency).toBe('daily');
    });

    it('rejects invalid frequency', () => {
      expect(() =>
        DigestPeriodVO.create({
          frequency: 'bogus' as any,
          periodStart: DATES.dayAgo,
          periodEnd: DATES.now,
        }),
      ).toThrow(InvalidDigestPeriodError);
    });

    it('rejects invalid ISO', () => {
      expect(() =>
        DigestPeriodVO.create({
          frequency: 'daily',
          periodStart: 'nope',
          periodEnd: DATES.now,
        }),
      ).toThrow(InvalidDigestPeriodError);
    });

    it('rejects start >= end', () => {
      expect(() =>
        DigestPeriodVO.create({
          frequency: 'daily',
          periodStart: DATES.now,
          periodEnd: DATES.dayAgo,
        }),
      ).toThrow(InvalidDigestPeriodError);
    });

    it('rejects equal start/end', () => {
      expect(() =>
        DigestPeriodVO.create({
          frequency: 'daily',
          periodStart: DATES.now,
          periodEnd: DATES.now,
        }),
      ).toThrow(InvalidDigestPeriodError);
    });
  });

  describe('duration', () => {
    it('computes durationMs and durationDays', () => {
      const vo = DigestPeriodVO.create({
        frequency: 'daily',
        periodStart: DATES.dayAgo,
        periodEnd: DATES.now,
      });
      expect(vo.durationDays).toBe(1);
      expect(vo.durationMs).toBe(86_400_000);
    });
  });
});
