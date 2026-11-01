import { ScheduleEntity } from '@domain/entities/schedule.entity.js';
import { ScheduleVO } from '@domain/composites/schedule.vo.js';
import { ScheduleIdVO } from '@domain/primitives/schedule-id.vo.js';
import { ScheduleTypeVO } from '@domain/primitives/schedule-type.vo.js';
import { ScheduleStatusVO } from '@domain/primitives/schedule-status.vo.js';
import { ScheduleFrequencyVO } from '@domain/primitives/schedule-frequency.vo.js';
import { ScheduleTimeVO } from '@domain/primitives/schedule-time.vo.js';
import { TemplateIdVO } from '@domain/primitives/template-id.vo.js';
import { UserIdVO } from '@domain/primitives/user-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { IDS } from '@domain-fixtures/ids.fixture.js';

const NOW = '2025-01-15T10:00:00.000Z';
const FUTURE = new Date(Date.now() + 3_600_000).toISOString();

const makeVO = (overrides: any = {}) =>
  ScheduleVO.create({
    id: ScheduleIdVO.create(IDS.scheduleId),
    name: 'Daily Report',
    type: ScheduleTypeVO.create('recurring'),
    status: ScheduleStatusVO.pending(),
    frequency: ScheduleFrequencyVO.create('daily'),
    time: ScheduleTimeVO.create({ scheduledAt: FUTURE, timezone: 'UTC' }),
    templateId: TemplateIdVO.create(IDS.templateId),
    recipientIds: [UserIdVO.create(IDS.userId)],
    runCount: 0,
    ...overrides,
  });

describe('ScheduleEntity (Aggregate Root)', () => {
  describe('create()', () => {
    it('creates with pending status + event', () => {
      const entity = ScheduleEntity.create({
        id: ScheduleIdVO.create(IDS.scheduleId),
        vo: makeVO(),
        now: NOW,
      });
      expect(entity.isPending()).toBe(true);
      expect(entity.version).toBe(1);
    });

    it('rejects non-pending status', () => {
      expect(() =>
        ScheduleEntity.create({
          id: ScheduleIdVO.create(IDS.scheduleId),
          vo: makeVO({ status: ScheduleStatusVO.active() }),
          now: NOW,
        }),
      ).toThrow(ValidationError);
    });
  });

  describe('reconstitute()', () => {
    it('rebuilds from state', () => {
      const entity = ScheduleEntity.reconstitute({
        id: IDS.scheduleId,
        createdAt: NOW,
        updatedAt: NOW,
        props: { vo: makeVO() },
      });
      expect(entity.id).toBe(IDS.scheduleId);
    });
  });

  describe('activate()', () => {
    it('pending → active', () => {
      const entity = ScheduleEntity.create({
        id: ScheduleIdVO.create(IDS.scheduleId),
        vo: makeVO(),
        now: NOW,
      });
      entity.activate(FUTURE, NOW);
      expect(entity.isActive()).toBe(true);
      expect(entity.nextRunAt).toBe(FUTURE);
    });
  });

  describe('pause() / resume()', () => {
    it('active → paused → active', () => {
      const entity = ScheduleEntity.reconstitute({
        id: IDS.scheduleId,
        createdAt: NOW,
        updatedAt: NOW,
        props: { vo: makeVO({ status: ScheduleStatusVO.active() }) },
      });
      entity.pause('maintenance', NOW);
      expect(entity.isPaused()).toBe(true);
      expect(entity.pausedReason).toBe('maintenance');

      entity.resume(FUTURE, NOW);
      expect(entity.isActive()).toBe(true);
      expect(entity.pausedAt).toBeUndefined();
    });
  });

  describe('recordExecution()', () => {
    it('increments runCount + emits event', () => {
      const entity = ScheduleEntity.reconstitute({
        id: IDS.scheduleId,
        createdAt: NOW,
        updatedAt: NOW,
        props: { vo: makeVO({ status: ScheduleStatusVO.active() }) },
      });
      entity.recordExecution(100, NOW);
      expect(entity.runCount).toBe(1);
    });
  });

  describe('complete()', () => {
    it('active → completed', () => {
      const entity = ScheduleEntity.reconstitute({
        id: IDS.scheduleId,
        createdAt: NOW,
        updatedAt: NOW,
        props: { vo: makeVO({ status: ScheduleStatusVO.active() }) },
      });
      entity.complete(NOW);
      expect(entity.isCompleted()).toBe(true);
    });
  });

  describe('cancel()', () => {
    it('pending → cancelled', () => {
      const entity = ScheduleEntity.create({
        id: ScheduleIdVO.create(IDS.scheduleId),
        vo: makeVO(),
        now: NOW,
      });
      entity.cancel('user request', IDS.userId, NOW);
      expect(entity.isCancelled()).toBe(true);
      expect(entity.cancelledBy).toBe(IDS.userId);
    });
  });

  describe('fail()', () => {
    it('active → failed', () => {
      const entity = ScheduleEntity.reconstitute({
        id: IDS.scheduleId,
        createdAt: NOW,
        updatedAt: NOW,
        props: { vo: makeVO({ status: ScheduleStatusVO.active() }) },
      });
      entity.fail('db error', NOW);
      expect(entity.isFailed()).toBe(true);
      expect(entity.failureReason).toBe('db error');
    });
  });

  describe('invalid transitions', () => {
    it('rejects complete from pending', () => {
      const entity = ScheduleEntity.create({
        id: ScheduleIdVO.create(IDS.scheduleId),
        vo: makeVO(),
        now: NOW,
      });
      expect(() => entity.complete(NOW)).toThrow(BusinessRuleError);
    });
  });

  describe('predicates', () => {
    it('isTerminal for cancelled', () => {
      const entity = ScheduleEntity.reconstitute({
        id: IDS.scheduleId,
        createdAt: NOW,
        updatedAt: NOW,
        props: {
          vo: makeVO({ status: ScheduleStatusVO.cancelled() }),
          cancelledAt: NOW,
        },
      });
      expect(entity.isTerminal()).toBe(true);
    });
  });

  describe('getters', () => {
    it('exposes all fields', () => {
      const entity = ScheduleEntity.create({
        id: ScheduleIdVO.create(IDS.scheduleId),
        vo: makeVO(),
        now: NOW,
      });
      expect(entity.id).toBe(IDS.scheduleId);
      expect(entity.scheduleId.value).toBe(IDS.scheduleId);
      expect(entity.vo).toBeDefined();
      expect(entity.status).toBeDefined();
      expect(entity.runCount).toBe(0);
      expect(entity.nextRunAt).toBeUndefined();
      expect(entity.lastRunAt).toBeUndefined();
      expect(entity.pausedAt).toBeUndefined();
      expect(entity.pausedReason).toBeUndefined();
      expect(entity.cancelledAt).toBeUndefined();
      expect(entity.cancelledBy).toBeUndefined();
      expect(entity.cancelledReason).toBeUndefined();
      expect(entity.failureReason).toBeUndefined();
    });
  });
});
