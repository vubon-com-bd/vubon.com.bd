import { ScheduleService } from '@application/services/impl/schedule.service.js';
import { createMockScheduleRepo, createMockEventBridge } from '@application-fixtures/mock-repos.fixture.js';
import { SCHEDULE_DTO } from '@application-fixtures/dtos.fixture.js';
import {
  ScheduleNotFoundApplicationError,
  ScheduleCreationError,
  ScheduleValidationError,
  ScheduleCancelError,
} from '@application/errors/schedule.errors.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';
import { DATES } from '@domain-fixtures/dates.fixture.js';
import { jest } from '@jest/globals';

function makeService() {
  const repo = createMockScheduleRepo();
  return { svc: new ScheduleService(repo as never, createMockEventBridge() as never), repo };
}

const MOCK = {
  id: IDS.scheduleId,
  vo: {
    name: 'Daily', type: { value: 'recurring' }, status: { value: 'pending' },
    frequency: { value: 'daily' }, time: { scheduledAt: DATES.future24h, timezone: 'UTC' },
    templateId: { value: IDS.templateId }, cronExpression: undefined,
    recipientCount: () => 1, hasRecipients: () => true,
  },
  nextRunAt: DATES.future24h, lastRunAt: undefined, runCount: 0,
  createdAt: DATES.now, updatedAt: DATES.now,
  activate: jest.fn(),
  cancel: jest.fn(),
};

describe('ScheduleService', () => {
  it('create requires scheduledAt or cron', async () => {
    const { svc } = makeService();
    await expect(svc.create({ ...SCHEDULE_DTO.create, scheduledAt: undefined, cronExpression: undefined }, 'a'))
      .rejects.toBeInstanceOf(ScheduleValidationError);
  });

  it('create via scheduledAt succeeds', async () => {
    const { svc, repo } = makeService();
    repo.save.mockImplementation(async (entity: unknown) => entity);

    const result = await svc.create(SCHEDULE_DTO.create, 'a');
    expect(result).toBeDefined();
    expect(repo.save).toHaveBeenCalled();
  });

  it('create via cronExpression reaches stub', async () => {
    const { svc } = makeService();
    await expect(svc.create({
      ...SCHEDULE_DTO.create,
      scheduledAt: undefined,
      cronExpression: '0 9 * * *',
      recurrence: 'daily',
    } as never, 'a')).rejects.toBeInstanceOf(ScheduleCreationError);
  });

  it('getById throws NotFound', async () => {
    const { svc, repo } = makeService();
    repo.findByIdVO.mockResolvedValue(null);
    await expect(svc.getById(IDS.scheduleId)).rejects.toBeInstanceOf(ScheduleNotFoundApplicationError);
  });

  it('getById succeeds', async () => {
    const { svc, repo } = makeService();
    repo.findByIdVO.mockResolvedValue(MOCK);
    expect((await svc.getById(IDS.scheduleId)).id).toBe(IDS.scheduleId);
  });

  it('update with scheduledAt activates', async () => {
    const { svc, repo } = makeService();
    repo.findByIdVO.mockResolvedValue(MOCK);
    repo.save.mockResolvedValue(MOCK);
    await svc.update({ scheduleId: IDS.scheduleId, scheduledAt: DATES.future24h }, 'a');
    expect(MOCK.activate).toHaveBeenCalled();
  });

  it('update without scheduledAt skips', async () => {
    const { svc, repo } = makeService();
    repo.findByIdVO.mockResolvedValue(MOCK);
    repo.save.mockResolvedValue(MOCK);
    await svc.update({ scheduleId: IDS.scheduleId, name: 'X' } as never, 'a');
    expect(MOCK.activate).not.toHaveBeenCalled();
  });

  it('cancel throws CancelError', async () => {
    const { svc, repo } = makeService();
    MOCK.cancel.mockImplementation(() => { throw new Error('nope'); });
    repo.findByIdVO.mockResolvedValue(MOCK);
    await expect(svc.cancel(SCHEDULE_DTO.cancel, 'a')).rejects.toBeInstanceOf(ScheduleCancelError);
  });

  it('list delegates', async () => {
    const { svc, repo } = makeService();
    repo.findPaginated.mockResolvedValue({ items: [], total: 0, page: 1, limit: 10 });
    const r = await svc.list({ page: 1, limit: 10 });
    expect(r.total).toBe(0);
  });
});
