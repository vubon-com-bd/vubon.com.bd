import { ScheduleTypeVO } from '@domain/primitives/schedule-type.vo.js';
import { InvalidScheduleTypeError } from '@domain/errors/schedule.errors.js';

describe('ScheduleTypeVO', () => {
  it.each(['immediate', 'scheduled', 'recurring', 'delayed', 'triggered'])('accepts "%s"', (t) => {
    expect(ScheduleTypeVO.create(t).value).toBe(t);
  });

  it('rejects invalid', () => {
    expect(() => ScheduleTypeVO.create('cron')).toThrow(InvalidScheduleTypeError);
  });

  it('rejects non-string', () => {
    expect(() => ScheduleTypeVO.create({} as any)).toThrow(InvalidScheduleTypeError);
  });

  it('isImmediate / isDelayed / isRecurring / isTriggered', () => {
    expect(ScheduleTypeVO.create('immediate').isImmediate()).toBe(true);
    expect(ScheduleTypeVO.create('delayed').isDelayed()).toBe(true);
    expect(ScheduleTypeVO.create('recurring').isRecurring()).toBe(true);
    expect(ScheduleTypeVO.create('triggered').isTriggered()).toBe(true);
    expect(ScheduleTypeVO.create('scheduled').isRecurring()).toBe(false);
  });
});
