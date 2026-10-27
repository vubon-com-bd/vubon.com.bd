/**
 * Schedule lifecycle E2E — create → update → cancel।
 */
import { jest } from '@jest/globals';

import { ScheduleService } from '@application/services/impl/schedule.service.js';
import {
  createMockScheduleRepo,
  createMockEventBridge,
} from '@application-fixtures/mock-repos.fixture.js';
import { SCHEDULE_DTO } from '@application-fixtures/dtos.fixture.js';
import { ScheduleCalculatorService } from '@domain/services/schedule-calculator.service.js';
import { ScheduleMatcherService } from '@domain/services/schedule-matcher.service.js';
import {
  ScheduleNotFoundApplicationError,
  ScheduleValidationError,
} from '@application/errors/schedule.errors.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';
import { DATES } from '@domain-fixtures/dates.fixture.js';

function buildService() {
  const repo = createMockScheduleRepo();
  return { svc: new ScheduleService(repo as never, createMockEventBridge() as never), repo };
}

function makeScheduleMock(overrides = {}) {
  return {
    id: IDS.scheduleId,
    vo: {
      name: 'Daily',
      type: { value: 'recurring' },
      status: { value: 'active' },
      frequency: { value: 'daily' },
      time: { scheduledAt: DATES.future24h, timezone: 'UTC' },
      templateId: { value: IDS.templateId },
      cronExpression: undefined,
      recipientCount: () => 5,
      hasRecipients: () => true,
    },
    nextRunAt: DATES.future24h,
    lastRunAt: undefined,
    runCount: 0,
    createdAt: DATES.now,
    updatedAt: DATES.now,
    activate: jest.fn(),
    cancel: jest.fn(),
    isRunnable: () => true,
    status: { value: 'active' },
    ...overrides,
  };
}

describe('Application E2E — Schedule lifecycle', () => {
  it('next-run computed via ScheduleCalculatorService', () => {
    const next = ScheduleCalculatorService.nextRun({
      frequency: 'daily',
      from: DATES.now,
    });
    expect(next.nextRunAt).toBeTruthy();
    expect(next.intervalMs).toBe(86_400_000);
  });

  it('schedule-matcher detects due', () => {
    const schedule = makeScheduleMock({
      nextRunAt: new Date(Date.now() - 60_000).toISOString(), // 1 minute ago
    });
    const result = ScheduleMatcherService.match({
      schedule: schedule as never,
      now: new Date().toISOString(),
    });
    expect(result.shouldRun).toBe(true);
  });

  it('schedule-matcher skips not-yet-due', () => {
    const schedule = makeScheduleMock({
      nextRunAt: DATES.future24h,
    });
    const result = ScheduleMatcherService.match({
      schedule: schedule as never,
      now: DATES.now,
    });
    expect(result.shouldRun).toBe(false);
  });

  it('create requires scheduledAt or cron', async () => {
    const { svc } = buildService();
    await expect(
      svc.create(
        {
          ...SCHEDULE_DTO.create,
          scheduledAt: undefined,
          cronExpression: undefined,
        } as never,
        'actor-1',
      ),
    ).rejects.toBeInstanceOf(ScheduleValidationError);
  });

  it('update activates scheduled one', async () => {
    const { svc, repo } = buildService();
    const m = makeScheduleMock();
    repo.findByIdVO.mockResolvedValue(m);
    repo.save.mockResolvedValue(m);

    await svc.update(
      { scheduleId: IDS.scheduleId, scheduledAt: DATES.future24h } as never,
      'actor-1',
    );

    expect(m.activate).toHaveBeenCalled();
  });

  it('cancel existing', async () => {
    const { svc, repo } = buildService();
    const m = makeScheduleMock();
    repo.findByIdVO.mockResolvedValue(m);
    repo.save.mockResolvedValue(m);

    const r = await svc.cancel(
      { scheduleId: IDS.scheduleId, reason: 'Not needed' } as never,
      'actor-1',
    );

    expect(r).toBeDefined();
    expect(m.cancel).toHaveBeenCalled();
  });

  it('getById not found', async () => {
    const { svc, repo } = buildService();
    repo.findByIdVO.mockResolvedValue(null);
    await expect(svc.getById(IDS.scheduleId)).rejects.toBeInstanceOf(
      ScheduleNotFoundApplicationError,
    );
  });

  it('list returns paginated', async () => {
    const { svc, repo } = buildService();
    repo.findPaginated.mockResolvedValue({
      items: [makeScheduleMock()],
      total: 1,
      page: 1,
      limit: 10,
    });
    const r = await svc.list({ page: 1, limit: 10 });
    expect(r.total).toBe(1);
  });
});
