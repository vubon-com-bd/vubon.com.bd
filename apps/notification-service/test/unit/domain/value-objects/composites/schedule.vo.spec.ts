import { describe, it, expect } from '@jest/globals';
import { ScheduleVO } from '../../../../../src/module/domain/value-objects/composites/schedule.vo.js';
import { ScheduleIdVO } from '../../../../../src/module/domain/value-objects/primitives/schedule-id.vo.js';
import { ScheduleTypeVO } from '../../../../../src/module/domain/value-objects/primitives/schedule-type.vo.js';
import { ScheduleStatusVO } from '../../../../../src/module/domain/value-objects/primitives/schedule-status.vo.js';
import { ScheduleRecurrenceVO } from '../../../../../src/module/domain/value-objects/primitives/schedule-recurrence.vo.js';
import { FIXED_USER_ID, makeUuid } from '../../../../helpers/test-factories.js';

function buildProps(overrides: Record<string, unknown> = {}) {
  return {
    id: ScheduleIdVO.create(makeUuid()),
    type: ScheduleTypeVO.scheduled(),
    status: ScheduleStatusVO.pending(),
    recurrence: ScheduleRecurrenceVO.none(),
    scheduledAt: new Date(Date.now() + 3600_000).toISOString(),
    timezone: 'Asia/Dhaka',
    occurrenceCount: 0,
    createdBy: FIXED_USER_ID,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  };
}

describe('ScheduleVO', () => {
  it('create valid', () => {
    const vo = ScheduleVO.create(buildProps());
    expect(vo.isRecurring()).toBe(false);
    expect(vo.isActive()).toBe(false);
  });
  it('recurring requires recurrence', () => {
    expect(() =>
      ScheduleVO.create(buildProps({
        type: ScheduleTypeVO.recurring(),
        recurrence: ScheduleRecurrenceVO.none(),
      })),
    ).toThrow();
  });
  it('rejects negative occurrenceCount', () => {
    expect(() => ScheduleVO.create(buildProps({ occurrenceCount: -1 }))).toThrow();
  });
  it('recurring + recurrence ok', () => {
    const vo = ScheduleVO.create(buildProps({
      type: ScheduleTypeVO.recurring(),
      recurrence: ScheduleRecurrenceVO.daily(),
    }));
    expect(vo.isRecurring()).toBe(true);
  });
  it('reconstitute', () => {
    const vo = ScheduleVO.reconstitute(buildProps());
    expect(vo.timezone).toBe('Asia/Dhaka');
  });
});
