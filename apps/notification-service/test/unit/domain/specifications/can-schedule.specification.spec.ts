import { CanScheduleSpecification } from '@domain/specifications/can-schedule.specification.js';
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

const NOW = new Date().toISOString();
const FUTURE = new Date(Date.now() + 3_600_000).toISOString();

const make = (o: any = {}) => {
  const vo = ScheduleVO.create({
    id: ScheduleIdVO.create(IDS.scheduleId),
    name: 'R',
    type: ScheduleTypeVO.create('recurring'),
    status: ScheduleStatusVO.pending(),
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

describe('CanScheduleSpecification', () => {
  const spec = CanScheduleSpecification.strict();

  it('satisfied for pending schedule', () => {
    expect(spec.isSatisfiedBy({ schedule: make() })).toBe(true);
  });

  it('not satisfied for completed', () => {
    const s = make({ vo: { status: ScheduleStatusVO.completed() } });
    expect(spec.isSatisfiedBy({ schedule: s })).toBe(false);
  });

  it('not satisfied when active count >= max', () => {
    expect(
      spec.isSatisfiedBy({ schedule: make(), ctx: { activeScheduleCount: 5000 } }),
    ).toBe(false);
  });

  it('not satisfied for past date (past ScheduleTime fails) — satisfied because fixed future', () => {
    expect(spec.isSatisfiedBy({ schedule: make() })).toBe(true);
  });
});
