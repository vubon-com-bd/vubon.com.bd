import { describe, it, expect } from '@jest/globals';
import { ScheduleStatusVO } from '../../../../src/module/domain/value-objects/primitives/schedule-status.vo.js';
import { NOTIFICATION_SCHEDULE_STATUS } from '@vubon/shared-constants/platform/notification';

describe('ScheduleStatusVO', () => {
  it('create + reconstitute', () => {
    expect(ScheduleStatusVO.create('active').value).toBe('active');
    expect(() => ScheduleStatusVO.create('bad')).toThrow();
    expect(ScheduleStatusVO.reconstitute('any').value).toBe('any');
  });
  it('named constructors', () => {
    expect(ScheduleStatusVO.pending().value).toBe('pending');
    expect(ScheduleStatusVO.active().value).toBe('active');
    expect(ScheduleStatusVO.paused().value).toBe('paused');
    expect(ScheduleStatusVO.completed().value).toBe('completed');
    expect(ScheduleStatusVO.cancelled().value).toBe('cancelled');
    expect(ScheduleStatusVO.failed().value).toBe('failed');
  });
  it('predicates', () => {
    expect(ScheduleStatusVO.active().isActive()).toBe(true);
    expect(ScheduleStatusVO.paused().isPaused()).toBe(true);
    expect(ScheduleStatusVO.completed().isCompleted()).toBe(true);
    expect(ScheduleStatusVO.cancelled().isCancelled()).toBe(true);
    expect(ScheduleStatusVO.failed().isFailed()).toBe(true);
    expect(ScheduleStatusVO.active().isRunnable()).toBe(true);
    expect(ScheduleStatusVO.completed().isFinal()).toBe(true);
  });
  it('canTransitionTo', () => {
    expect(ScheduleStatusVO.pending().canTransitionTo(NOTIFICATION_SCHEDULE_STATUS.ACTIVE)).toBe(true);
    expect(ScheduleStatusVO.active().canTransitionTo(NOTIFICATION_SCHEDULE_STATUS.PAUSED)).toBe(true);
    expect(ScheduleStatusVO.paused().canTransitionTo(NOTIFICATION_SCHEDULE_STATUS.ACTIVE)).toBe(true);
    expect(ScheduleStatusVO.completed().canTransitionTo(NOTIFICATION_SCHEDULE_STATUS.ACTIVE)).toBe(false);
  });
});
