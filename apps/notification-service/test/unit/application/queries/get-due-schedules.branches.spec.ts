import { describe, it, expect, jest } from '@jest/globals';
import { GetDueSchedulesHandler } from '../../../../src/module/application/queries/schedule/get-due-schedules.handler.js';
import { GetDueSchedulesQuery } from '../../../../src/module/application/queries/schedule/get-due-schedules.query.js';

describe('GetDueSchedulesHandler — date branches', () => {
  it('with at param', async () => {
    const svc = { getDue: jest.fn().mockResolvedValue([]) } as never;
    const h = new GetDueSchedulesHandler(svc);
    await h.execute(new GetDueSchedulesQuery(new Date().toISOString()));
    expect(svc.getDue).toHaveBeenCalledWith(expect.any(Date));
  });

  it('without at param', async () => {
    const svc = { getDue: jest.fn().mockResolvedValue([]) } as never;
    const h = new GetDueSchedulesHandler(svc);
    await h.execute(new GetDueSchedulesQuery());
    expect(svc.getDue).toHaveBeenCalledWith(undefined);
  });
});
