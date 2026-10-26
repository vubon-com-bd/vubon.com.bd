/**
 * Schedule Execution E2E
 * @module notification-service/test/e2e/domain
 */
import { ScheduleEntity } from '@domain/entities/schedule.entity.js';
import { ScheduleVO } from '@domain/composites/schedule.vo.js';
import { ScheduleIdVO } from '@domain/primitives/schedule-id.vo.js';
import { ScheduleTypeVO } from '@domain/primitives/schedule-type.vo.js';
import { ScheduleStatusVO } from '@domain/primitives/schedule-status.vo.js';
import { ScheduleFrequencyVO } from '@domain/primitives/schedule-frequency.vo.js';
import { ScheduleTimeVO } from '@domain/primitives/schedule-time.vo.js';
import { TemplateIdVO } from '@domain/primitives/template-id.vo.js';
import { UserIdVO } from '@domain/primitives/user-id.vo.js';

import { ScheduleCalculatorService } from '@domain/services/schedule-calculator.service.js';
import { ScheduleMatcherService } from '@domain/services/schedule-matcher.service.js';
import { CanScheduleSpecification } from '@domain/specifications/can-schedule.specification.js';

import { IDS } from '@domain-fixtures/ids.fixture.js';

const NOW = new Date().toISOString();
const NOW_MS = Date.now();
const FUTURE = new Date(NOW_MS + 3_600_000).toISOString();

describe('Schedule Execution — E2E', () => {
  it('create → activate → execute → complete', () => {
    // 1. Create schedule
    const entity = ScheduleEntity.create({
      id: ScheduleIdVO.create(IDS.scheduleId),
      vo: ScheduleVO.create({
        id: ScheduleIdVO.create(IDS.scheduleId),
        name: 'Daily Report',
        type: ScheduleTypeVO.create('recurring'),
        status: ScheduleStatusVO.pending(),
        frequency: ScheduleFrequencyVO.create('daily'),
        time: ScheduleTimeVO.create({ scheduledAt: FUTURE, timezone: 'UTC' }),
        templateId: TemplateIdVO.create(IDS.templateId),
        recipientIds: [UserIdVO.create(IDS.userId)],
        runCount: 0,
      }),
      now: NOW,
    });
    expect(entity.isPending()).toBe(true);

    // 2. Calculate next run
    const calc = ScheduleCalculatorService.nextRun({ frequency: 'daily', from: NOW });
    expect(calc.intervalMs).toBe(86_400_000);

    // 3. Spec check
    expect(CanScheduleSpecification.strict().isSatisfiedBy({ schedule: entity })).toBe(true);

    // 4. Activate
    entity.activate(FUTURE, NOW);
    expect(entity.isActive()).toBe(true);
    expect(entity.nextRunAt).toBe(FUTURE);

    // 5. Execute
    entity.recordExecution(100, NOW);
    expect(entity.runCount).toBe(1);

    // 6. Complete
    entity.complete(NOW);
    expect(entity.isCompleted()).toBe(true);
  });

  it('matcher — due schedule', () => {
    const pastRun = new Date(NOW_MS - 60_000).toISOString();
    const entity = ScheduleEntity.reconstitute({
      id: IDS.scheduleId, createdAt: NOW, updatedAt: NOW,
      props: {
        vo: ScheduleVO.create({
          id: ScheduleIdVO.create(IDS.scheduleId),
          name: 'R',
          type: ScheduleTypeVO.create('recurring'),
          status: ScheduleStatusVO.active(),
          frequency: ScheduleFrequencyVO.create('daily'),
          time: ScheduleTimeVO.reconstitute({ scheduledAt: FUTURE, timezone: 'UTC' }),
          templateId: TemplateIdVO.create(IDS.templateId),
          recipientIds: [UserIdVO.create(IDS.userId)],
          runCount: 0,
          nextRunAt: pastRun,
        }),
      },
    });
    const result = ScheduleMatcherService.match({ schedule: entity, now: NOW });
    expect(result.shouldRun).toBe(true);
  });

  it('pause → resume cycle', () => {
    const entity = ScheduleEntity.reconstitute({
      id: IDS.scheduleId, createdAt: NOW, updatedAt: NOW,
      props: {
        vo: ScheduleVO.create({
          id: ScheduleIdVO.create(IDS.scheduleId),
          name: 'R',
          type: ScheduleTypeVO.create('recurring'),
          status: ScheduleStatusVO.active(),
          frequency: ScheduleFrequencyVO.create('daily'),
          time: ScheduleTimeVO.create({ scheduledAt: FUTURE, timezone: 'UTC' }),
          templateId: TemplateIdVO.create(IDS.templateId),
          recipientIds: [UserIdVO.create(IDS.userId)],
          runCount: 0,
        }),
      },
    });
    entity.pause('maintenance', NOW);
    expect(entity.isPaused()).toBe(true);
    entity.resume(FUTURE, NOW);
    expect(entity.isActive()).toBe(true);
  });
});
