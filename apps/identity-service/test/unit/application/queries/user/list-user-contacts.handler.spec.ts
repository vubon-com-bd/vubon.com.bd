import { describe, it, expect, beforeEach } from '@jest/globals';
import { ListUserContactsHandler } from '@application/queries/user/list-user-contacts.handler.js';
import { ListUserContactsQuery } from '@application/queries/user/list-user-contacts.query.js';
import { makeUserContactServiceMock, TEST_IDS } from '@fixtures/index.js';

describe('ListUserContactsHandler', () => {
  let handler: ListUserContactsHandler;
  let service: ReturnType<typeof makeUserContactServiceMock>;

  beforeEach(() => {
    service = makeUserContactServiceMock();
    handler = new ListUserContactsHandler(service as never);
  });

  it('queryType = user.list-contacts', () => {
    expect(handler.queryType).toBe('user.list-contacts');
  });

  it('should return empty', async () => {
    service.listForUser.mockResolvedValue([]);
    const result = await handler.execute(new ListUserContactsQuery(TEST_IDS.USER_ID));
    expect(result).toEqual([]);
  });
});
