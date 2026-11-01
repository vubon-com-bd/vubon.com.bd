import { describe, it, expect, beforeEach } from '@jest/globals';
import { GetUserAddressHandler } from '@application/queries/user/get-user-address.handler.js';
import { GetUserAddressQuery } from '@application/queries/user/get-user-address.query.js';
import { makeUserAddressServiceMock, TEST_IDS } from '@fixtures/index.js';

describe('GetUserAddressHandler', () => {
  let handler: GetUserAddressHandler;
  let service: ReturnType<typeof makeUserAddressServiceMock>;

  beforeEach(() => {
    service = makeUserAddressServiceMock();
    handler = new GetUserAddressHandler(service as never);
  });

  it('queryType = user.get-address', () => {
    expect(handler.queryType).toBe('user.get-address');
  });

  it('should return null when not found', async () => {
    service.findById.mockResolvedValue(null);
    const result = await handler.execute(new GetUserAddressQuery(TEST_IDS.ADDRESS_ID));
    expect(result).toBeNull();
  });
});
