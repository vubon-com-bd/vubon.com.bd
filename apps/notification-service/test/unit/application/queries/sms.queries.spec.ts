import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { GetSmsHandler } from '../../../../src/module/application/queries/sms/get-sms.handler.js';
import { GetSmsQuery } from '../../../../src/module/application/queries/sms/get-sms.query.js';
import { ListSmsHandler } from '../../../../src/module/application/queries/sms/list-sms.handler.js';
import { ListSmsQuery } from '../../../../src/module/application/queries/sms/list-sms.query.js';

function mockSvc() {
  return {
    getById: jest.fn().mockResolvedValue({ id: 's-1' }),
    list: jest.fn().mockResolvedValue({ items: [], total: 0 }),
  } as never;
}

describe('SMS query handlers', () => {
  let svc: ReturnType<typeof mockSvc>;
  beforeEach(() => { svc = mockSvc(); });
  it('GetSmsHandler', async () => {
    await new GetSmsHandler(svc).execute(new GetSmsQuery('s-1'));
    expect(svc.getById).toHaveBeenCalled();
  });
  it('ListSmsHandler', async () => {
    await new ListSmsHandler(svc).execute(new ListSmsQuery({ page: 1, limit: 20 } as never));
    expect(svc.list).toHaveBeenCalled();
  });
});
