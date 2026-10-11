import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { GetEmailHandler } from '../../../../src/module/application/queries/email/get-email.handler.js';
import { GetEmailQuery } from '../../../../src/module/application/queries/email/get-email.query.js';
import { ListEmailsHandler } from '../../../../src/module/application/queries/email/list-emails.handler.js';
import { ListEmailsQuery } from '../../../../src/module/application/queries/email/list-emails.query.js';

function mockSvc() {
  return {
    getById: jest.fn().mockResolvedValue({ id: 'e-1' }),
    list: jest.fn().mockResolvedValue({ items: [], total: 0 }),
  } as never;
}

describe('Email query handlers', () => {
  let svc: ReturnType<typeof mockSvc>;
  beforeEach(() => { svc = mockSvc(); });
  it('GetEmailHandler', async () => {
    await new GetEmailHandler(svc).execute(new GetEmailQuery('e-1'));
    expect(svc.getById).toHaveBeenCalled();
  });
  it('ListEmailsHandler', async () => {
    await new ListEmailsHandler(svc).execute(new ListEmailsQuery({ page: 1, limit: 20 } as never));
    expect(svc.list).toHaveBeenCalled();
  });
});
