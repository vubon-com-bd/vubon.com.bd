import { describe, it, expect } from '@jest/globals';
import { ScheduleTypeVO } from '../../../../src/module/domain/value-objects/primitives/schedule-type.vo.js';

describe('ScheduleTypeVO', () => {
  it('create + reconstitute', () => {
    expect(ScheduleTypeVO.create('scheduled').value).toBe('scheduled');
    expect(() => ScheduleTypeVO.create('bad')).toThrow();
    expect(ScheduleTypeVO.reconstitute('any').value).toBe('any');
  });
  it('named constructors', () => {
    expect(ScheduleTypeVO.immediate().value).toBe('immediate');
    expect(ScheduleTypeVO.scheduled().value).toBe('scheduled');
    expect(ScheduleTypeVO.recurring().value).toBe('recurring');
    expect(ScheduleTypeVO.delayed().value).toBe('delayed');
    expect(ScheduleTypeVO.triggered().value).toBe('triggered');
  });
  it('predicates + helpers', () => {
    expect(ScheduleTypeVO.scheduled().isScheduled()).toBe(true);
    expect(ScheduleTypeVO.recurring().isRecurring()).toBe(true);
    expect(ScheduleTypeVO.recurring().requiresRecurrence()).toBe(true);
    expect(ScheduleTypeVO.scheduled().requiresExplicitTime()).toBe(true);
    expect(ScheduleTypeVO.immediate().requiresExplicitTime()).toBe(false);
  });
});
