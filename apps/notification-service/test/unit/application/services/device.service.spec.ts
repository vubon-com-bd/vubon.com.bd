import { DeviceService } from '@application/services/impl/device.service.js';
import { createMockDeviceRepo, createMockEventBridge } from '@application-fixtures/mock-repos.fixture.js';
import { DEVICE_DTO } from '@application-fixtures/dtos.fixture.js';
import {
  DeviceNotFoundApplicationError, DeviceRegistrationError, DeviceLimitExceededApplicationError,
  DeviceTokenConflictError, DeviceUpdateError,
} from '@application/errors/device.errors.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';
import { DATES } from '@domain-fixtures/dates.fixture.js';
import { jest } from '@jest/globals';

const MOCK = {
  id: IDS.deviceId,
  vo: {
    userId: { value: IDS.userId }, type: { value: 'android' }, status: { value: 'active' },
    token: { masked: 'mask' }, platform: { value: 'android' },
    appVersion: undefined, osVersion: undefined, deviceName: 'P',
    lastActiveAt: DATES.now, registeredAt: DATES.now,
  },
  createdAt: DATES.now, updatedAt: DATES.now,
  refreshToken: jest.fn(),
  unregister: jest.fn(),
};

function makeService() {
  const repo = createMockDeviceRepo();
  return { svc: new DeviceService(repo as never, createMockEventBridge() as never), repo };
}

describe('DeviceService', () => {
  it('register rejects when limit exceeded', async () => {
    const { svc, repo } = makeService();
    repo.countForUser.mockResolvedValue(10);
    await expect(svc.register(DEVICE_DTO.register, 'a')).rejects.toBeInstanceOf(DeviceLimitExceededApplicationError);
  });

  it('register rejects when token exists', async () => {
    const { svc, repo } = makeService();
    repo.countForUser.mockResolvedValue(0);
    repo.findByToken.mockResolvedValue(MOCK);
    await expect(svc.register(DEVICE_DTO.register, 'a')).rejects.toBeInstanceOf(DeviceTokenConflictError);
  });

  it('register succeeds on valid device', async () => {
    const { svc, repo } = makeService();
    repo.countForUser.mockResolvedValue(0);
    repo.findByToken.mockResolvedValue(null);
    repo.save.mockImplementation(async (entity: unknown) => entity);

    const result = await svc.register(DEVICE_DTO.register, 'a');
    expect(result).toBeDefined();
    expect(repo.save).toHaveBeenCalled();
  });

  it('updateToken succeeds', async () => {
    const { svc, repo } = makeService();
    MOCK.refreshToken.mockImplementation(() => {});
    repo.findByIdVO.mockResolvedValue(MOCK);
    repo.save.mockResolvedValue(MOCK);
    const r = await svc.updateToken(DEVICE_DTO.updateToken, 'a');
    expect(r.id).toBe(IDS.deviceId);
  });

  it('updateToken throws on invalid token', async () => {
    const { svc, repo } = makeService();
    repo.findByIdVO.mockResolvedValue(MOCK);
    await expect(svc.updateToken({ deviceId: IDS.deviceId, newToken: 'short' } as never, 'a'))
      .rejects.toBeInstanceOf(DeviceUpdateError);
  });

  it('unregister succeeds', async () => {
    const { svc, repo } = makeService();
    MOCK.unregister.mockImplementation(() => {});
    repo.findByIdVO.mockResolvedValue(MOCK);
    repo.save.mockResolvedValue(MOCK);
    await svc.unregister(DEVICE_DTO.unregister, 'a');
    expect(MOCK.unregister).toHaveBeenCalled();
  });

  it('getById NotFound', async () => {
    const { svc, repo } = makeService();
    repo.findByIdVO.mockResolvedValue(null);
    await expect(svc.getById(IDS.deviceId)).rejects.toBeInstanceOf(DeviceNotFoundApplicationError);
  });

  it('getById returns mapped', async () => {
    const { svc, repo } = makeService();
    repo.findByIdVO.mockResolvedValue(MOCK);
    expect((await svc.getById(IDS.deviceId)).id).toBe(IDS.deviceId);
  });

  it('listByUser', async () => {
    const { svc, repo } = makeService();
    repo.findByUser.mockResolvedValue([MOCK]);
    expect((await svc.listByUser(IDS.userId)).length).toBe(1);
  });

  it('list delegates', async () => {
    const { svc, repo } = makeService();
    repo.findPaginated.mockResolvedValue({ items: [], total: 0, page: 1, limit: 10 });
    expect((await svc.list({ page: 1, limit: 10 })).total).toBe(0);
  });
});
