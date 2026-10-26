/**
 * Branch coverage booster — device.service.ts
 */
import { DeviceService } from '@application/services/impl/device.service.js';
import { createMockDeviceRepo, createMockEventBridge } from '@application-fixtures/mock-repos.fixture.js';
import { DEVICE_DTO } from '@application-fixtures/dtos.fixture.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';
import { DATES } from '@domain-fixtures/dates.fixture.js';
import { jest } from '@jest/globals';

function makeService() {
  const repo = createMockDeviceRepo();
  return { svc: new DeviceService(repo as never, createMockEventBridge() as never), repo };
}

function makeMock(overrides = {}) {
  return {
    id: IDS.deviceId,
    vo: {
      userId: { value: IDS.userId }, type: { value: 'android' }, status: { value: 'active' },
      token: { masked: 'mask' }, platform: { value: 'android' },
      appVersion: '1.0.0', osVersion: '14', deviceName: 'P',
      lastActiveAt: DATES.now, registeredAt: DATES.now,
    },
    createdAt: DATES.now, updatedAt: DATES.now,
    refreshToken: jest.fn(), unregister: jest.fn(),
    ...overrides,
  };
}

describe('DeviceService — branch coverage', () => {
  it('register at limit boundary (9 devices)', async () => {
    const { svc, repo } = makeService();
    repo.countForUser.mockResolvedValue(9);
    repo.findByToken.mockResolvedValue(null);
    await expect(svc.register(DEVICE_DTO.register, 'a')).rejects.toBeInstanceOf(Error);
  });

  it('updateToken when refreshToken throws', async () => {
    const { svc, repo } = makeService();
    const mock = makeMock({ refreshToken: jest.fn(() => { throw new Error('bad'); }) });
    repo.findByIdVO.mockResolvedValue(mock);
    await expect(svc.updateToken(DEVICE_DTO.updateToken, 'a')).rejects.toBeInstanceOf(Error);
  });

  it('unregister succeeds without actor', async () => {
    const { svc, repo } = makeService();
    const mock = makeMock();
    repo.findByIdVO.mockResolvedValue(mock);
    repo.save.mockResolvedValue(mock);
    await svc.unregister(DEVICE_DTO.unregister);
    expect(mock.unregister).toHaveBeenCalled();
  });

  it('listByUser empty', async () => {
    const { svc, repo } = makeService();
    repo.findByUser.mockResolvedValue([]);
    expect((await svc.listByUser(IDS.userId)).length).toBe(0);
  });
});
