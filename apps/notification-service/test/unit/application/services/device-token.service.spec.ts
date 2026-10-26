import { DeviceTokenService } from '@application/services/impl/device-token.service.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';
import { DATES } from '@domain-fixtures/dates.fixture.js';
import { jest } from '@jest/globals';

const MOCK = {
  id: 'dt-1',
  deviceId: { value: IDS.deviceId },
  token: { masked: 'mask' },
  platform: { value: 'android' },
  active: true, revokedAt: undefined, createdAt: DATES.now,
};

function makeService() {
  const repo = {
    findByDevice: jest.fn(), findActiveByDevice: jest.fn(), findActiveTokensForUser: jest.fn(),
    countActiveByDevice: jest.fn(), revokeAllForDevice: jest.fn(),
  };
  return { svc: new DeviceTokenService(repo as never), repo };
}

describe('DeviceTokenService', () => {
  it('listByDevice maps', async () => {
    const { svc, repo } = makeService();
    repo.findByDevice.mockResolvedValue([MOCK]);
    expect((await svc.listByDevice(IDS.deviceId)).length).toBe(1);
  });

  it('listActiveByDevice', async () => {
    const { svc, repo } = makeService();
    repo.findActiveByDevice.mockResolvedValue([MOCK]);
    expect((await svc.listActiveByDevice(IDS.deviceId)).length).toBe(1);
  });

  it('listActiveTokensForUser', async () => {
    const { svc, repo } = makeService();
    repo.findActiveTokensForUser.mockResolvedValue([]);
    expect((await svc.listActiveTokensForUser(IDS.userId)).length).toBe(0);
  });

  it('countActiveByDevice', async () => {
    const { svc, repo } = makeService();
    repo.countActiveByDevice.mockResolvedValue(2);
    expect(await svc.countActiveByDevice(IDS.deviceId)).toBe(2);
  });

  it('revokeAllForDevice', async () => {
    const { svc, repo } = makeService();
    repo.revokeAllForDevice.mockResolvedValue(3);
    expect(await svc.revokeAllForDevice(IDS.deviceId, 'a')).toBe(3);
  });
});
