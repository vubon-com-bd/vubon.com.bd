import { ScheduleStatusVO } from '@domain/primitives/schedule-status.vo.js';
import { InvalidScheduleStatusError } from '@domain/errors/schedule.errors.js';

describe('ScheduleStatusVO', () => {
  it.each(['pending', 'active', 'paused', 'completed', 'cancelled', 'failed'])('accepts "%s"', (s) => {
    expect(ScheduleStatusVO.create(s).value).toBe(s);
  });

  it('rejects invalid', () => {
    expect(() => ScheduleStatusVO.create('bogus')).toThrow(InvalidScheduleStatusError);
  });

  it('rejects non-string', () => {
    expect(() => ScheduleStatusVO.create(0 as any)).toThrow(InvalidScheduleStatusError);
  });

  describe('factory', () => {
    it('all factories set predicates', () => {
      expect(ScheduleStatusVO.pending().isPending()).toBe(true);
      expect(ScheduleStatusVO.active().isActive()).toBe(true);
      expect(ScheduleStatusVO.paused().isPaused()).toBe(true);
      expect(ScheduleStatusVO.completed().isCompleted()).toBe(true);
      expect(ScheduleStatusVO.cancelled().isCancelled()).toBe(true);
      expect(ScheduleStatusVO.failed().isFailed()).toBe(true);
    });
  });

  describe('isTerminal / isRunnable', () => {
    it('completed/cancelled are terminal', () => {
      expect(ScheduleStatusVO.completed().isTerminal()).toBe(true);
      expect(ScheduleStatusVO.cancelled().isTerminal()).toBe(true);
    });
    it('active is only runnable', () => {
      expect(ScheduleStatusVO.active().isRunnable()).toBe(true);
      expect(ScheduleStatusVO.pending().isRunnable()).toBe(false);
      expect(ScheduleStatusVO.paused().isRunnable()).toBe(false);
    });
  });

  describe('canTransitionTo — state machine', () => {
    it('pending → active/cancelled', () => {
      expect(ScheduleStatusVO.pending().canTransitionTo('active')).toBe(true);
      expect(ScheduleStatusVO.pending().canTransitionTo('cancelled')).toBe(true);
      expect(ScheduleStatusVO.pending().canTransitionTo('completed')).toBe(false);
    });
    it('active → paused/completed/cancelled/failed', () => {
      const s = ScheduleStatusVO.active();
      expect(s.canTransitionTo('paused')).toBe(true);
      expect(s.canTransitionTo('completed')).toBe(true);
      expect(s.canTransitionTo('cancelled')).toBe(true);
      expect(s.canTransitionTo('failed')).toBe(true);
    });
    it('paused → active/cancelled', () => {
      expect(ScheduleStatusVO.paused().canTransitionTo('active')).toBe(true);
      expect(ScheduleStatusVO.paused().canTransitionTo('cancelled')).toBe(true);
    });
    it('failed → pending/cancelled', () => {
      expect(ScheduleStatusVO.failed().canTransitionTo('pending')).toBe(true);
      expect(ScheduleStatusVO.failed().canTransitionTo('cancelled')).toBe(true);
    });
    it('completed is terminal', () => {
      expect(ScheduleStatusVO.completed().canTransitionTo('active')).toBe(false);
    });
  });
});
