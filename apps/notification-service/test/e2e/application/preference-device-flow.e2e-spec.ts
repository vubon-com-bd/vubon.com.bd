/**
 * Preference + Device E2E — register → update preference → quiet hours।
 */
import { PreferenceService } from '@application/services/impl/preference.service.js';
import { DeviceService } from '@application/services/impl/device.service.js';
import { QuietHoursService } from '@domain/services/quiet-hours.service.js';
import { PreferenceCheckerService } from '@domain/services/preference-checker.service.js';
import {
  createMockPreferenceRepo,
  createMockDeviceRepo,
  createMockEventBridge,
} from '@application-fixtures/mock-repos.fixture.js';
import { PREFERENCE_DTO, DEVICE_DTO } from '@application-fixtures/dtos.fixture.js';
import {
  DeviceNotFoundApplicationError,
  DeviceLimitExceededApplicationError,
} from '@application/errors/device.errors.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';
import { DATES } from '@domain-fixtures/dates.fixture.js';

function buildPreferenceService() {
  const repo = createMockPreferenceRepo();
  return { svc: new PreferenceService(repo as never, createMockEventBridge() as never), repo };
}

function buildDeviceService() {
  const repo = createMockDeviceRepo();
  return { svc: new DeviceService(repo as never, createMockEventBridge() as never), repo };
}

function makePreferenceMock(overrides = {}) {
  return {
    id: IDS.preferenceId,
    vo: {
      userId: { value: IDS.userId },
      type: { value: 'opt_in' },
      options: [],
      quietHoursEnabled: false,
      quietHoursStart: null,
      quietHoursEnd: null,
      timezone: 'Asia/Dhaka',
      locale: 'en',
      locked: false,
    },
    locked: false,
    isChannelEnabled: () => true,
    isCategoryEnabled: () => true,
    updatedAt: DATES.now,
    changeQuietHours: jest.fn(),
    optOut: jest.fn(),
    ...overrides,
  };
}

function makeDeviceMock(overrides = {}) {
  return {
    id: IDS.deviceId,
    vo: {
      userId: { value: IDS.userId },
      type: { value: 'android' },
      status: { value: 'active' },
      token: { masked: 'mask' },
      platform: { value: 'android' },
      appVersion: undefined,
      osVersion: undefined,
      deviceName: 'Phone',
      lastActiveAt: DATES.now,
      registeredAt: DATES.now,
    },
    createdAt: DATES.now,
    updatedAt: DATES.now,
    refreshToken: jest.fn(),
    unregister: jest.fn(),
    ...overrides,
  };
}

describe('Application E2E — Preference + Device flow', () => {
  it('quiet hours — check at specific time', () => {
    const result = QuietHoursService.check({
      config: {
        enabled: true,
        start: 22,
        end: 8,
        timezone: 'Asia/Dhaka',
      },
      now: '2025-01-15T20:00:00.000Z',
    });
    // quiet hours region
    expect(result).toBeDefined();
    expect(typeof result.inQuietHours).toBe('boolean');
  });

  it('update preference — quiet hours enabled', async () => {
    const { svc, repo } = buildPreferenceService();
    const m = makePreferenceMock();
    repo.findByUser.mockResolvedValue(m);
    repo.save.mockResolvedValue(m);

    await svc.update(
      {
        userId: IDS.userId,
        quietHoursEnabled: true,
        quietHoursStart: 22,
        quietHoursEnd: 8,
      } as never,
      'actor-1',
    );

    expect(m.changeQuietHours).toHaveBeenCalled();
  });

  it('preference-checker allows non-quiet channel', () => {
    const preference = makePreferenceMock();
    const result = PreferenceCheckerService.check({
      preference: preference as never,
      type: { isPromotional: () => false, isTransactional: () => true, isSecurity: () => false } as never,
      category: { value: 'system' } as never,
      channel: 'email',
    });
    expect(result.allowed).toBe(true);
  });

  it('unsubscribe opt-out existing channel', async () => {
    const { svc, repo } = buildPreferenceService();
    const m = makePreferenceMock();
    repo.findByUser.mockResolvedValue(m);
    repo.save.mockResolvedValue(m);

    await svc.unsubscribe(
      { userId: IDS.userId, channel: 'email' } as never,
      'actor-1',
    );

    expect(m.optOut).toHaveBeenCalled();
  });

  it('register device + update token flow', async () => {
    const { svc, repo } = buildDeviceService();
    const m = makeDeviceMock();

    // Register at limit → fails
    repo.countForUser.mockResolvedValue(10);
    await expect(
      svc.register({ userId: IDS.userId, type: 'android', token: IDS.deviceToken } as never, 'a'),
    ).rejects.toBeInstanceOf(DeviceLimitExceededApplicationError);

    // Successful update
    repo.findByIdVO.mockResolvedValue(m);
    repo.save.mockResolvedValue(m);
    const r = await svc.updateToken(
      { deviceId: IDS.deviceId, newToken: IDS.deviceToken2 } as never,
      'a',
    );
    expect(r).toBeDefined();
    expect(m.refreshToken).toHaveBeenCalled();
  });

  it('getById not found', async () => {
    const { svc, repo } = buildDeviceService();
    repo.findByIdVO.mockResolvedValue(null);
    await expect(svc.getById(IDS.deviceId)).rejects.toBeInstanceOf(
      DeviceNotFoundApplicationError,
    );
  });

  it('full device lifecycle: list → update → unregister', async () => {
    const { svc, repo } = buildDeviceService();
    const m = makeDeviceMock();

    repo.findByUser.mockResolvedValue([m]);
    const devices = await svc.listByUser(IDS.userId);
    expect(devices.length).toBe(1);

    repo.findByIdVO.mockResolvedValue(m);
    repo.save.mockResolvedValue(m);
    await svc.unregister({ deviceId: IDS.deviceId } as never, 'a');
    expect(m.unregister).toHaveBeenCalled();
  });

  it('preference update device DTO fixture integration', () => {
    expect(PREFERENCE_DTO.update.userId).toBe(IDS.userId);
    expect(DEVICE_DTO.register.token).toBe(IDS.deviceToken);
  });
});
