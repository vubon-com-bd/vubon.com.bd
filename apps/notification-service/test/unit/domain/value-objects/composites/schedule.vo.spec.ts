import { ScheduleVO } from '@domain/composites/schedule.vo.js';
import { ScheduleIdVO } from '@domain/primitives/schedule-id.vo.js';
import { ScheduleTypeVO } from '@domain/primitives/schedule-type.vo.js';
import { ScheduleStatusVO } from '@domain/primitives/schedule-status.vo.js';
import { ScheduleFrequencyVO } from '@domain/primitives/schedule-frequency.vo.js';
import { ScheduleTimeVO } from '@domain/primitives/schedule-time.vo.js';
import { TemplateIdVO } from '@domain/primitives/template-id.vo.js';
import { UserIdVO } from '@domain/primitives/user-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { IDS } from '@domain-fixtures/ids.fixture.js';
import { DATES } from '@domain-fixtures/dates.fixture.js';

const makeProps = (overrides: any = {}) => ({
  id: ScheduleIdVO.create(IDS.scheduleId),
  name: 'Daily report',
  type: ScheduleTypeVO.create('recurring'),
  status: ScheduleStatusVO.pending(),
  frequency: ScheduleFrequencyVO.create('daily'),
  time: ScheduleTimeVO.create({ scheduledAt: DATES.future, timezone: 'UTC' }),
  templateId: TemplateIdVO.create(IDS.templateId),
  recipientIds: [UserIdVO.create(IDS.userId)],
  runCount: 0,
  ...overrides,
});

describe('ScheduleVO', () => {
  describe('create()', () => {
    it('creates valid schedule', () => {
      const vo = ScheduleVO.create(makeProps());
      expect(vo.name).toBe('Daily report');
    });

    it('rejects empty name', () => {
      expect(() => ScheduleVO.create(makeProps({ name: '' }))).toThrow(ValidationError);
    });

    it('rejects negative runCount', () => {
      expect(() => ScheduleVO.create(makeProps({ runCount: -1 }))).toThrow(ValidationError);
    });

    it('rejects recurring without frequency', () => {
      expect(() =>
        ScheduleVO.create(
          makeProps({
            type: ScheduleTypeVO.create('recurring'),
            frequency: ScheduleFrequencyVO.none(),
          }),
        ),
      ).toThrow(ValidationError);
    });

    it('rejects non-recurring with frequency', () => {
      expect(() =>
        ScheduleVO.create(
          makeProps({
            type: ScheduleTypeVO.create('immediate'),
            frequency: ScheduleFrequencyVO.create('daily'),
          }),
        ),
      ).toThrow(ValidationError);
    });

    it('rejects cronExpression for non-recurring', () => {
      expect(() =>
        ScheduleVO.create(
          makeProps({
            type: ScheduleTypeVO.create('immediate'),
            frequency: ScheduleFrequencyVO.none(),
            cronExpression: '0 * * * *',
          }),
        ),
      ).toThrow(ValidationError);
    });

    it('accepts cronExpression for recurring', () => {
      const vo = ScheduleVO.create(makeProps({ cronExpression: '0 0 * * *' }));
      expect(vo.cronExpression).toBe('0 0 * * *');
    });

    it('rejects no recipients without cron', () => {
      expect(() =>
        ScheduleVO.create(makeProps({ recipientIds: [] })),
      ).toThrow(ValidationError);
    });

    it('accepts no recipients with cronExpression', () => {
      const vo = ScheduleVO.create(
        makeProps({ recipientIds: [], cronExpression: '0 * * * *' }),
      );
      expect(vo.recipientCount()).toBe(0);
    });

    it('rejects past scheduledAt for delayed/recurring without lastRunAt', () => {
      expect(() =>
        ScheduleVO.create(
          makeProps({
            time: ScheduleTimeVO.create({ scheduledAt: DATES.past, timezone: 'UTC' }),
          }),
        ),
      ).toThrow(ValidationError);
    });
  });

  describe('reconstitute', () => {
    it('skips validation', () => {
      const vo = ScheduleVO.reconstitute(makeProps());
      expect(vo.id).toBeDefined();
    });
  });

  describe('status predicates', () => {
    it.each([
      ['pending', 'isPending'],
      ['active', 'isActive'],
      ['paused', 'isPaused'],
      ['completed', 'isCompleted'],
      ['cancelled', 'isCancelled'],
      ['failed', 'isFailed'],
    ] as const)('%s → %s', (status, pred) => {
      const vo = ScheduleVO.reconstitute(makeProps({ status: ScheduleStatusVO.create(status) }));
      expect((vo[pred] as () => boolean)()).toBe(true);
    });

    it('isRunnable for active', () => {
      expect(
        ScheduleVO.reconstitute(makeProps({ status: ScheduleStatusVO.active() })).isRunnable(),
      ).toBe(true);
    });

    it('isTerminal for completed', () => {
      expect(
        ScheduleVO.reconstitute(makeProps({ status: ScheduleStatusVO.completed() })).isTerminal(),
      ).toBe(true);
    });
  });

  describe('type predicates', () => {
    it.each([
      ['immediate', 'isImmediate'],
      ['delayed', 'isDelayed'],
      ['recurring', 'isRecurring'],
      ['triggered', 'isTriggered'],
    ] as const)('%s → %s', (type, pred) => {
      const vo = ScheduleVO.reconstitute(
        makeProps({
          type: ScheduleTypeVO.create(type),
          frequency: type === 'recurring' ? ScheduleFrequencyVO.create('daily') : ScheduleFrequencyVO.none(),
        }),
      );
      expect((vo[pred] as () => boolean)()).toBe(true);
    });
  });

  describe('hasRecipients / recipientCount', () => {
    it('hasRecipients true', () => {
      expect(ScheduleVO.reconstitute(makeProps()).hasRecipients()).toBe(true);
    });

    it('hasRecipients false', () => {
      expect(ScheduleVO.reconstitute(makeProps({ recipientIds: [] })).hasRecipients()).toBe(false);
    });

    it('recipientCount', () => {
      expect(ScheduleVO.reconstitute(makeProps()).recipientCount()).toBe(1);
    });
  });

  describe('withStatus / withNextRun / recordRun', () => {
    const base = ScheduleVO.reconstitute(makeProps());

    it('withStatus returns new VO', () => {
      const updated = base.withStatus(ScheduleStatusVO.active());
      expect(updated.status.isActive()).toBe(true);
    });

    it('withNextRun returns new VO', () => {
      const updated = base.withNextRun(DATES.future24h);
      expect(updated.nextRunAt).toBe(DATES.future24h);
    });

    it('recordRun increments runCount and sets lastRunAt', () => {
      const updated = base.recordRun(DATES.now);
      expect(updated.runCount).toBe(1);
      expect(updated.lastRunAt).toBe(DATES.now);
    });
  });

  describe('getters', () => {
    const vo = ScheduleVO.reconstitute(makeProps());
    it('exposes all fields', () => {
      expect(vo.id).toBeDefined();
      expect(vo.name).toBe('Daily report');
      expect(vo.type).toBeDefined();
      expect(vo.status).toBeDefined();
      expect(vo.frequency).toBeDefined();
      expect(vo.time).toBeDefined();
      expect(vo.templateId).toBeDefined();
      expect(vo.recipientIds.length).toBe(1);
      expect(vo.cronExpression).toBeUndefined();
      expect(vo.nextRunAt).toBeUndefined();
      expect(vo.lastRunAt).toBeUndefined();
      expect(vo.runCount).toBe(0);
    });
  });
});
