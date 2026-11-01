import { ScheduleMatcherService } from '@domain/services/schedule-matcher.service.js';
import { ScheduleEntity } from '@domain/entities/schedule.entity.js';
import { ScheduleVO } from '@domain/composites/schedule.vo.js';
import { ScheduleIdVO } from '@domain/primitives/schedule-id.vo.js';
import { ScheduleTypeVO } from '@domain/primitives/schedule-type.vo.js';
import { ScheduleStatusVO } from '@domain/primitives/schedule-status.vo.js';
import { ScheduleFrequencyVO } from '@domain/primitives/schedule-frequency.vo.js';
import { ScheduleTimeVO } from '@domain/primitives/schedule-time.vo.js';
import { TemplateIdVO } from '@domain/primitives/template-id.vo.js';
import { UserIdVO } from '@domain/primitives/user-id.vo.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';

const NOW_MS = Date.now();
const NOW = new Date(NOW_MS).toISOString();
const FUTURE = new Date(NOW_MS + 3_600_000).toISOString();

const make = (o: any = {}) => {
  const vo = ScheduleVO.create({
    id: ScheduleIdVO.create(IDS.scheduleId),
    name: 'R',
    type: ScheduleTypeVO.create('recurring'),
    status: ScheduleStatusVO.active(),
    frequency: ScheduleFrequencyVO.create('daily'),
    time: ScheduleTimeVO.create({ scheduledAt: FUTURE, timezone: 'UTC' }),
    templateId: TemplateIdVO.create(IDS.templateId),
    recipientIds: [UserIdVO.create(IDS.userId)],
    runCount: 0,
    ...o.vo,
  });
  return ScheduleEntity.reconstitute({
    id: IDS.scheduleId, createdAt: NOW, updatedAt: NOW,
    props: { vo, ...o.props },
  });
};

describe('ScheduleMatcherService', () => {
  describe('match()', () => {
    it('returns shouldRun=false when not runnable', () => {
      const schedule = make({ vo: { status: ScheduleStatusVO.pending() } });
      const r = ScheduleMatcherService.match({ schedule, now: NOW });
      expect(r.shouldRun).toBe(false);
      expect(r.reason).toContain('not-runnable');
    });

    it('returns shouldRun=false when no next run', () => {
      const schedule = make();
      const r = ScheduleMatcherService.match({ schedule, now: NOW });
      expect(r.shouldRun).toBe(false);
      expect(r.reason).toBe('no-next-run');
    });

    it('returns shouldRun=false when not yet due', () => {
      const schedule = make({ vo: { nextRunAt: FUTURE } });
      const r = ScheduleMatcherService.match({ schedule, now: NOW });
      expect(r.shouldRun).toBe(false);
      expect(r.reason).toBe('not-yet');
    });

    it('returns shouldRun=true when due', () => {
      const pastRun = new Date(NOW_MS - 60_000).toISOString();
      const schedule = make({ vo: { nextRunAt: pastRun } });
      const r = ScheduleMatcherService.match({ schedule, now: NOW });
      expect(r.shouldRun).toBe(true);
      expect(r.reason).toBe('due');
    });

    it('returns shouldRun=false when stale over 24h', () => {
      const oldRun = new Date(NOW_MS - 48 * 3_600_000).toISOString();
      const schedule = make({ vo: { nextRunAt: oldRun } });
      const r = ScheduleMatcherService.match({ schedule, now: NOW });
      expect(r.shouldRun).toBe(false);
      expect(r.reason).toBe('stale-over-24h');
    });

    it('accepts custom grace period', () => {
      const runSoon = new Date(NOW_MS + 60_000).toISOString();
      const schedule = make({ vo: { nextRunAt: runSoon } });
      const r = ScheduleMatcherService.match({
        schedule, now: NOW, gracePeriodMinutes: 2,
      });
      expect(r.shouldRun).toBe(true);
    });
  });

  describe('filterDue()', () => {
    it('returns only due schedules', () => {
      const pastRun = new Date(NOW_MS - 60_000).toISOString();
      const due = make({ vo: { nextRunAt: pastRun } });
      const notDue = make({ vo: { nextRunAt: FUTURE } });
      const result = ScheduleMatcherService.filterDue([due, notDue], NOW);
      expect(result.length).toBe(1);
    });
  });
});
