import { describe, it, expect, beforeEach } from '@jest/globals';
import { GetAuthDeviceHandler } from '@application/queries/auth/get-auth-device.handler.js';
import { GetAuthDeviceQuery } from '@application/queries/auth/get-auth-device.query.js';
import { makeDeviceRepositoryMock, makeDeviceEntity, TEST_IDS } from '@fixtures/index.js';
import { DeviceNotFoundError } from '@domain/errors/device.errors.js';

describe('GetAuthDeviceHandler', () => {
  let handler: GetAuthDeviceHandler;
  let repo: ReturnType<typeof makeDeviceRepositoryMock>;

  beforeEach(() => {
    repo = makeDeviceRepositoryMock();
    handler = new GetAuthDeviceHandler(repo as never);
  });

  it('queryType = auth.get-device', () => {
    expect(handler.queryType).toBe('auth.get-device');
  });

  it('should throw when not found', async () => {
    repo.findById.mockResolvedValue(null);
    await expect(handler.execute(new GetAuthDeviceQuery(TEST_IDS.DEVICE_ID))).rejects.toThrow(DeviceNotFoundError);
  });

  it('should return device DTO when found', async () => {
    const device = makeDeviceEntity();
    repo.findById.mockResolvedValue(device as never);
    const result = await handler.execute(new GetAuthDeviceQuery(TEST_IDS.DEVICE_ID));
    expect(result.id).toBe(device.id);
  });
});
