import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { GetBroadcastHandler } from '../../../../src/module/application/queries/broadcast/get-broadcast.handler.js';
import { GetBroadcastQuery } from '../../../../src/module/application/queries/broadcast/get-broadcast.query.js';
import { GetBroadcastStatsHandler } from '../../../../src/module/application/queries/broadcast/get-broadcast-stats.handler.js';
import { GetBroadcastStatsQuery } from '../../../../src/module/application/queries/broadcast/get-broadcast-stats.query.js';
import { GetBroadcastProgressHandler } from '../../../../src/module/application/queries/broadcast/get-broadcast-progress.handler.js';
import { GetBroadcastProgressQuery } from '../../../../src/module/application/queries/broadcast/get-broadcast-progress.query.js';
import { ListBroadcastsHandler } from '../../../../src/module/application/queries/broadcast/list-broadcasts.handler.js';
import { ListBroadcastsQuery } from '../../../../src/module/application/queries/broadcast/list-broadcasts.query.js';

function mockSvc() {
  const r = jest.fn().mockResolvedValue({ id: 'b-1' });
  return {
    getById: r,
    getStats: jest.fn().mockResolvedValue({ broadcastId: 'b-1' }),
    getProgress: jest.fn().mockResolvedValue({ broadcastId: 'b-1' }),
    list: jest.fn().mockResolvedValue({ items: [], total: 0 }),
  } as never;
}

describe('Broadcast query handlers', () => {
  let svc: ReturnType<typeof mockSvc>;
  beforeEach(() => { svc = mockSvc(); });
  it('GetBroadcastHandler', async () => {
    await new GetBroadcastHandler(svc).execute(new GetBroadcastQuery('b-1'));
    expect(svc.getById).toHaveBeenCalled();
  });
  it('GetBroadcastStatsHandler', async () => {
    await new GetBroadcastStatsHandler(svc).execute(new GetBroadcastStatsQuery('b-1'));
    expect(svc.getStats).toHaveBeenCalled();
  });
  it('GetBroadcastProgressHandler', async () => {
    await new GetBroadcastProgressHandler(svc).execute(new GetBroadcastProgressQuery('b-1'));
    expect(svc.getProgress).toHaveBeenCalled();
  });
  it('ListBroadcastsHandler', async () => {
    await new ListBroadcastsHandler(svc).execute(new ListBroadcastsQuery({ page: 1, limit: 20 } as never));
    expect(svc.list).toHaveBeenCalled();
  });
});
