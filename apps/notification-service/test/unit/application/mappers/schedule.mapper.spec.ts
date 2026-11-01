import { ScheduleMapper } from '@application/mappers/schedule.mapper.js';
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
import { DATES } from '@domain-fixtures/dates.fixture.js';

function build(opts: { withCron?: boolean } = {}) {
  // Cron only allowed for recurring type → frequency != none
  const type = opts.withCron ? 'recurring' : 'scheduled';
  const frequency = opts.withCron ? 'daily' : 'none';

  const vo = ScheduleVO.create({
    id: ScheduleIdVO.create(IDS.scheduleId),
    name: 'Daily',
    type: ScheduleTypeVO.create(type),
    status: ScheduleStatusVO.pending(),
    frequency: ScheduleFrequencyVO.create(frequency),
    time: ScheduleTimeVO.create({
      scheduledAt: DATES.future24h,
      timezone: 'Asia/Dhaka',
    }),
    templateId: TemplateIdVO.create(IDS.templateId),
    recipientIds: [UserIdVO.create(IDS.userId)],
    cronExpression: opts.withCron ? '0 9 * * *' : undefined,
    nextRunAt: DATES.future24h,
    runCount: 0,
  });
  return ScheduleEntity.create({
    id: ScheduleIdVO.create(IDS.scheduleId),
    vo,
    now: DATES.now,
  });
}

describe('ScheduleMapper', () => {
  it('toResponse without cron', () => {
    const r = ScheduleMapper.toResponse(build());
    expect(r.id).toBe(IDS.scheduleId);
    expect(r.cronExpression).toBeUndefined();
  });

  it('toResponse with cron', () => {
    const r = ScheduleMapper.toResponse(build({ withCron: true }));
    expect(r.cronExpression).toBe('0 9 * * *');
  });

  it('toSummary', () => {
    const r = ScheduleMapper.toSummary(build());
    expect(r.id).toBe(IDS.scheduleId);
    expect(r.runCount).toBe(0);
  });

  it('toListResponse', () => {
    const r = ScheduleMapper.toListResponse([build()], 5, 1, 10);
    expect(r.totalPages).toBe(1);
  });
});
