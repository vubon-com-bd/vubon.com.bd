import { describe, it, expect } from '@jest/globals';
import { ScheduleEntity } from '../../../../src/module/domain/entities/schedule.entity.js';
import { ScheduleTypeVO } from '../../../../src/module/domain/value-objects/primitives/schedule-type.vo.js';
import { ScheduleRecurrenceVO } from '../../../../src/module/domain/value-objects/primitives/schedule-recurrence.vo.js';
import { FIXED_USER_ID, makeUuid } from '../../../helpers/test-factories.js';

function build(overrides: Partial<{
  type: ScheduleTypeVO;
  recurrence: ScheduleRecurrenceVO;
  maxOccurrences?: number;
}> = {}): ScheduleEntity {
  return ScheduleEntity.create({
    id: makeUuid(),
    now: new Date().toISOString(),
    props: {
      type: overrides.type ?? ScheduleTypeVO.scheduled(),
      recurrence: overrides.recurrence ?? ScheduleRecurrenceVO.none(),
      scheduledAt: new Date(Date.now() + 3600_000).toISOString(),
      timezone: 'Asia/Dhaka',
      userId: FIXED_USER_ID,
      maxOccurrences: overrides.maxOccurrences,
      createdBy: FIXED_USER_ID,
    },
  });
}

describe('ScheduleEntity', () => {
  it('create → pending status', () => {
    const e = build();
    expect(e.isActive()).toBe(false);
    expect(e.status.value).toBe('pending');
    expect(e.occurrenceCount).toBe(0);
  });

  it('create requires recurrence for recurring type', () => {
    expect(() =>
      ScheduleEntity.create({
        id: makeUuid(),
        now: new Date().toISOString(),
        props: {
          type: ScheduleTypeVO.recurring(),
          recurrence: ScheduleRecurrenceVO.none(),
          scheduledAt: new Date().toISOString(),
          timezone: 'Asia/Dhaka',
          createdBy: FIXED_USER_ID,
        },
      }),
    ).toThrow();
  });

  it('activate → active', () => {
    const e = build();
    e.activate();
    expect(e.isActive()).toBe(true);
  });

  it('pause active → paused', () => {
    const e = build();
    e.activate();
    e.pause('maintenance');
    expect(e.isPaused()).toBe(true);
  });

  it('pause from non-active throws', () => {
    const e = build();
    expect(() => e.pause()).toThrow();
  });

  it('resume paused → active', () => {
    const e = build();
    e.activate();
    e.pause();
    e.resume();
    expect(e.isActive()).toBe(true);
  });

  it('trigger one-shot → completes', () => {
    const e = build();
    e.activate();
    e.trigger(undefined);
    expect(e.occurrenceCount).toBe(1);
    expect(e.isFinal()).toBe(true);
  });

  it('trigger recurring → next occurrence set', () => {
    const e = build({
      type: ScheduleTypeVO.recurring(),
      recurrence: ScheduleRecurrenceVO.daily(),
    });
    e.activate();
    e.trigger();
    expect(e.occurrenceCount).toBe(1);
    expect(e.nextOccurrenceAt).toBeDefined();
    expect(e.isActive()).toBe(true);
  });

  it('trigger non-active throws', () => {
    const e = build();
    expect(() => e.trigger()).toThrow();
  });

  it('trigger respects maxOccurrences', () => {
    const e = build({
      type: ScheduleTypeVO.recurring(),
      recurrence: ScheduleRecurrenceVO.daily(),
      maxOccurrences: 2,
    });
    e.activate();
    e.trigger();
    e.trigger();
    expect(() => e.trigger()).toThrow();
  });

  it('complete → completed', () => {
    const e = build();
    e.activate();
    e.complete();
    expect(e.status.value).toBe('completed');
  });

  it('cancel → cancelled', () => {
    const e = build();
    e.cancel(FIXED_USER_ID, 'no longer needed');
    expect(e.status.value).toBe('cancelled');
  });

  it('fail → failed', () => {
    const e = build();
    e.activate();
    e.fail('downstream error', 'E001');
    expect(e.status.value).toBe('failed');
    expect(e.lastFailureReason).toBe('downstream error');
  });

  it('invalid transition throws', () => {
    const e = build();
    e.cancel(FIXED_USER_ID);
    expect(() => e.activate()).toThrow();
  });
});
