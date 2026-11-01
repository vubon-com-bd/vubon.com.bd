import { describe, it, expect, beforeEach } from '@jest/globals';
import { ListUserAddressesHandler } from '@application/queries/user/list-user-addresses.handler.js';
import { ListUserAddressesQuery } from '@application/queries/user/list-user-addresses.query.js';
import { makeUserAddressServiceMock, TEST_IDS } from '@fixtures/index.js';

describe('ListUserAddressesHandler', () => {
  let handler: ListUserAddressesHandler;
  let service: ReturnType<typeof makeUserAddressServiceMock>;

  beforeEach(() => {
    service = makeUserAddressServiceMock();
    handler = new ListUserAddressesHandler(service as never);
  });

  it('queryType = user.list-addresses', () => {
    expect(handler.queryType).toBe('user.list-addresses');
  });

  it('should return empty', async () => {
    service.listForUser.mockResolvedValue([]);
    const result = await handler.execute(new ListUserAddressesQuery(TEST_IDS.USER_ID));
    expect(result).toEqual([]);
  });
});
