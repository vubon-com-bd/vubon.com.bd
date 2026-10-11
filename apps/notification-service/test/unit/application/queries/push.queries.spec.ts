import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { GetPushHandler } from '../../../../src/module/application/queries/push/get-push.handler.js';
import { GetPushQuery } from '../../../../src/module/application/queries/push/get-push.query.js';
import { ListPushHandler } from '../../../../src/module/application/queries/push/list-push.handler.js';
import { ListPushQuery } from '../../../../src/module/application/queries/push/list-push.query.js';

function mockSvc() {
  return {
    getById: jest.fn().mockResolvedValue({ id: 'p-1' }),
    list: jest.fn().mockResolvedValue({ items: [], total: 0 }),
  } as never;
}

describe('Push query handlers', () => {
  let svc: ReturnType<typeof mockSvc>;
  beforeEach(() => { svc = mockSvc(); });
  it('GetPushHandler', async () => {
    await new GetPushHandler(svc).execute(new GetPushQuery('p-1'));
    expect(svc.getById).toHaveBeenCalled();
  });
  it('ListPushHandler', async () => {
    await new ListPushHandler(svc).execute(new ListPushQuery({ page: 1, limit: 20 } as never));
    expect(svc.list).toHaveBeenCalled();
  });
});
