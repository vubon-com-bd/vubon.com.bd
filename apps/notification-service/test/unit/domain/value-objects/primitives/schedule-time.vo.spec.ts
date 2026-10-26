import { ScheduleTimeVO } from '@domain/primitives/schedule-time.vo.js';
import { InvalidScheduleTimeError } from '@domain/errors/schedule.errors.js';

const FUTURE = new Date(Date.now() + 60 * 60 * 1000).toISOString();
const PAST = new Date(Date.now() - 60 * 60 * 1000).toISOString();
const FAR_FUTURE = new Date(Date.now() + 400 * 24 * 60 * 60 * 1000).toISOString();

describe('ScheduleTimeVO', () => {
  describe('create()', () => {
    it('accepts valid future time', () => {
      const vo = ScheduleTimeVO.create({ scheduledAt: FUTURE, timezone: 'Asia/Dhaka' });
      expect(vo.timezone).toBe('Asia/Dhaka');
    });

    it('rejects invalid ISO', () => {
      expect(() =>
        ScheduleTimeVO.create({ scheduledAt: 'not-a-date', timezone: 'UTC' }),
      ).toThrow(InvalidScheduleTimeError);
    });

    it('rejects empty scheduledAt', () => {
      expect(() =>
        ScheduleTimeVO.create({ scheduledAt: '', timezone: 'UTC' }),
      ).toThrow(InvalidScheduleTimeError);
    });

    it('rejects >365 days future', () => {
      expect(() =>
        ScheduleTimeVO.create({ scheduledAt: FAR_FUTURE, timezone: 'UTC' }),
      ).toThrow(InvalidScheduleTimeError);
    });

    it('rejects missing timezone', () => {
      expect(() =>
        ScheduleTimeVO.create({ scheduledAt: FUTURE, timezone: '' }),
      ).toThrow(InvalidScheduleTimeError);
    });
  });

  describe('predicates', () => {
    it('isFuture for future date', () => {
      const vo = ScheduleTimeVO.reconstitute({ scheduledAt: FUTURE, timezone: 'UTC' });
      expect(vo.isFuture).toBe(true);
      expect(vo.isPast).toBe(false);
    });

    it('isPast for past date', () => {
      const vo = ScheduleTimeVO.reconstitute({ scheduledAt: PAST, timezone: 'UTC' });
      expect(vo.isPast).toBe(true);
      expect(vo.isFuture).toBe(false);
    });
  });

  describe('reconstitute', () => {
    it('skips validation', () => {
      const vo = ScheduleTimeVO.reconstitute({ scheduledAt: 'invalid', timezone: 'X' });
      expect(vo.timezone).toBe('X');
    });
  });
});
