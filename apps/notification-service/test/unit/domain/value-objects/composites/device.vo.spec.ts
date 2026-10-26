import { DeviceVO } from '@domain/composites/device.vo.js';
import { DeviceIdVO } from '@domain/primitives/device-id.vo.js';
import { DeviceStatusVO } from '@domain/primitives/device-status.vo.js';
import { DeviceTypeVO } from '@domain/primitives/device-type.vo.js';
import { DeviceTokenVO } from '@domain/primitives/device-token.vo.js';
import { DevicePlatformVO } from '@domain/primitives/device-platform.vo.js';
import { UserIdVO } from '@domain/primitives/user-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { IDS } from '@domain-fixtures/ids.fixture.js';

const NOW_MS = Date.now();

const makeProps = (overrides: any = {}) => ({
  id: DeviceIdVO.create(IDS.deviceId),
  userId: UserIdVO.create(IDS.userId),
  type: DeviceTypeVO.create('android'),
  status: DeviceStatusVO.active(),
  token: DeviceTokenVO.create(IDS.deviceToken),
  platform: DevicePlatformVO.create('android'),
  lastActiveAt: new Date(NOW_MS - 1000).toISOString(),
  registeredAt: new Date(NOW_MS - 86_400_000).toISOString(),
  ...overrides,
});

describe('DeviceVO', () => {
  describe('create()', () => {
    it('creates valid device', () => {
      const vo = DeviceVO.create(makeProps());
      expect(vo.type.value).toBe('android');
    });

    it('accepts optional metadata', () => {
      const vo = DeviceVO.create(
        makeProps({ appVersion: '1.0.0', osVersion: '14', deviceName: 'Pixel' }),
      );
      expect(vo.appVersion).toBe('1.0.0');
    });

    it('rejects invalid timestamps', () => {
      expect(() => DeviceVO.create(makeProps({ lastActiveAt: 'garbage' }))).toThrow(ValidationError);
    });

    it('rejects lastActive < registered', () => {
      expect(() =>
        DeviceVO.create(
          makeProps({
            lastActiveAt: new Date(NOW_MS - 100_000_000).toISOString(),
            registeredAt: new Date(NOW_MS).toISOString(),
          }),
        ),
      ).toThrow(ValidationError);
    });

    it('rejects empty deviceName', () => {
      expect(() => DeviceVO.create(makeProps({ deviceName: '' }))).toThrow(ValidationError);
    });

    it('rejects too-long deviceName (>100)', () => {
      expect(() =>
        DeviceVO.create(makeProps({ deviceName: 'a'.repeat(101) })),
      ).toThrow(ValidationError);
    });
  });

  describe('reconstitute', () => {
    it('skips validation', () => {
      const vo = DeviceVO.reconstitute(makeProps());
      expect(vo.id).toBeDefined();
    });
  });

  describe('predicates', () => {
    it('isActive for active', () => {
      expect(DeviceVO.reconstitute(makeProps()).isActive()).toBe(true);
    });
    it('isBlocked for blocked', () => {
      const vo = DeviceVO.reconstitute(makeProps({ status: DeviceStatusVO.blocked() }));
      expect(vo.isBlocked()).toBe(true);
    });
    it('canReceive for active', () => {
      expect(DeviceVO.reconstitute(makeProps()).canReceive()).toBe(true);
    });
  });

  describe('isStale / ageInDays', () => {
    it('isStale false for recent', () => {
      const vo = DeviceVO.reconstitute(makeProps());
      expect(vo.isStale()).toBe(false);
    });

    it('isStale true for >90 days', () => {
      const old = new Date(NOW_MS - 100 * 86_400_000).toISOString();
      const vo = DeviceVO.reconstitute(makeProps({ lastActiveAt: old }));
      expect(vo.isStale()).toBe(true);
    });

    it('ageInDays', () => {
      const vo = DeviceVO.reconstitute(makeProps());
      expect(vo.ageInDays()).toBe(1);
    });
  });

  describe('withStatus / withLastActive / withToken', () => {
    const base = DeviceVO.reconstitute(makeProps());

    it('withStatus returns new VO', () => {
      const updated = base.withStatus(DeviceStatusVO.blocked());
      expect(updated.isBlocked()).toBe(true);
    });

    it('withLastActive updates', () => {
      const newTime = new Date(NOW_MS).toISOString();
      const updated = base.withLastActive(newTime);
      expect(updated.lastActiveAt).toBe(newTime);
    });

    it('withToken updates', () => {
      const newToken = DeviceTokenVO.create(IDS.deviceToken2);
      const updated = base.withToken(newToken);
      expect(updated.token.value).toBe(IDS.deviceToken2);
    });
  });

  describe('getters', () => {
    const vo = DeviceVO.reconstitute(makeProps());
    it('exposes all fields', () => {
      expect(vo.id).toBeDefined();
      expect(vo.userId).toBeDefined();
      expect(vo.type).toBeDefined();
      expect(vo.status).toBeDefined();
      expect(vo.token).toBeDefined();
      expect(vo.platform).toBeDefined();
      expect(vo.appVersion).toBeUndefined();
      expect(vo.osVersion).toBeUndefined();
      expect(vo.deviceName).toBeUndefined();
      expect(vo.lastActiveAt).toBeDefined();
      expect(vo.registeredAt).toBeDefined();
    });
  });
});
