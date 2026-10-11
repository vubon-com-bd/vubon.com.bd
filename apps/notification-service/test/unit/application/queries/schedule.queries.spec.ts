import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { GetScheduleHandler } from '../../../../src/module/application/queries/schedule/get-schedule.handler.js';
import { GetScheduleQuery } from '../../../../src/module/application/queries/schedule/get-schedule.query.js';
import { ListSchedulesHandler } from '../../../../src/module/application/queries/schedule/list-schedules.handler.js';
import { ListSchedulesQuery } from '../../../../src/module/application/queries/schedule/list-schedules.query.js';
import { GetDueSchedulesHandler } from '../../../../src/module/application/queries/schedule/get-due-schedules.handler.js';
import { GetDueSchedulesQuery } from '../../../../src/module/application/queries/schedule/get-due-schedules.query.js';

function mockSvc() {
  return {
    getById: jest.fn().mockResolvedValue({ id: 's-1' }),
    list: jest.fn().mockResolvedValue({ items: [], total: 0 }),
    getDue: jest.fn().mockResolvedValue([]),
  } as never;
}

describe('Schedule query handlers', () => {
  let svc: ReturnType<typeof mockSvc>;
  beforeEach(() => { svc = mockSvc(); });
  it('GetScheduleHandler', async () => {
    await new GetScheduleHandler(svc).execute(new GetScheduleQuery('s-1'));
    expect(svc.getById).toHaveBeenCalled();
  });
  it('ListSchedulesHandler', async () => {
    await new ListSchedulesHandler(svc).execute(new ListSchedulesQuery({ page: 1, limit: 20 } as never));
    expect(svc.list).toHaveBeenCalled();
  });
  it('GetDueSchedulesHandler', async () => {
    await new GetDueSchedulesHandler(svc).execute(new GetDueSchedulesQuery());
    expect(svc.getDue).toHaveBeenCalled();
  });
});
