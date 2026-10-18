import { describe, it, expect, beforeEach } from '@jest/globals';
import { ListAuthDevicesHandler } from '@application/queries/auth/list-auth-devices.handler.js';
import { makeListAuthDevicesQuery, makeAuthDeviceServiceMock, TEST_IDS } from '@fixtures/index.js';

describe('ListAuthDevicesHandler', () => {
  let handler: ListAuthDevicesHandler;
  let service: ReturnType<typeof makeAuthDeviceServiceMock>;

  beforeEach(() => {
    service = makeAuthDeviceServiceMock();
    handler = new ListAuthDevicesHandler(service as never);
  });

  it('queryType = auth.list-devices', () => {
    expect(handler.queryType).toBe('auth.list-devices');
  });

  it('should return empty', async () => {
    service.findForUser.mockResolvedValue([]);
    const result = await handler.execute(makeListAuthDevicesQuery());
    expect(result).toEqual([]);
  });
});
