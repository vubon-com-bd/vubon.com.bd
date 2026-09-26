/**
 * AuthDeviceEntity — Unit Tests (Aggregate Root)
 * @module auth-service/domain/entities
 */
import { AuthDeviceEntity } from './auth-device.entity';
import { DeviceFingerprintVO } from '../value-objects/primitives/device-fingerprint.vo';
import { DeviceTypeVO } from '../value-objects/primitives/device-type.vo';
import { DeviceStatusVO } from '../value-objects/primitives/device-status.vo';

const NOW = '2024-01-01T00:00:00.000Z';
const NOW_MS = new Date(NOW).getTime();
const ONE_DAY = 86_400_000;

const buildDevice = (overrides: Partial<Parameters<typeof AuthDeviceEntity.create>[0]> = {}) =>
  AuthDeviceEntity.create({
    id: 'dev-1',
    userId: 'user-1' as never,
    fingerprint: DeviceFingerprintVO.of('a'.repeat(64)),
    type: DeviceTypeVO.of('mobile'),
    status: DeviceStatusVO.of('trusted'),
    name: 'iPhone 15',
    firstSeenAt: NOW_MS - ONE_DAY,
    lastSeenAt: NOW_MS,
    createdAt: NOW,
    updatedAt: NOW,
    ...overrides,
  });

describe('AuthDeviceEntity (Aggregate Root)', () => {
  describe('create()', () => {
    it('should create valid device', () => {
      const d = buildDevice();
      expect(d.userId).toBe('user-1');
      expect(d.name).toBe('iPhone 15');
      expect(d.isTrusted()).toBe(true);
    });
  });

  describe('isTrusted()', () => {
    it('should return true for trusted', () => {
      expect(buildDevice().isTrusted()).toBe(true);
    });

    it('should return false for untrusted', () => {
      const d = buildDevice({ status: DeviceStatusVO.of('untrusted') });
      expect(d.isTrusted()).toBe(false);
    });

    it('should return false for pending', () => {
      const d = buildDevice({ status: DeviceStatusVO.of('pending') });
      expect(d.isTrusted()).toBe(false);
    });
  });

  describe('canLogin()', () => {
    it('should return true for trusted', () => {
      expect(buildDevice().canLogin()).toBe(true);
    });

    it('should return true for pending', () => {
      const d = buildDevice({ status: DeviceStatusVO.of('pending') });
      expect(d.canLogin()).toBe(true);
    });

    it('should return false for blocked', () => {
      const d = buildDevice({ status: DeviceStatusVO.of('blocked') });
      expect(d.canLogin()).toBe(false);
    });

    it('should return false for revoked', () => {
      const d = buildDevice({ status: DeviceStatusVO.of('revoked') });
      expect(d.canLogin()).toBe(false);
    });
  });

  describe('touch()', () => {
    it('should update lastSeenAt', () => {
      const d = buildDevice();
      const newTime = NOW_MS + 1000;
      d.touch(newTime);
      expect(d.lastSeenAt).toBe(newTime);
    });
  });

  describe('trust()', () => {
    it('should change status to trusted', () => {
      const d = buildDevice({ status: DeviceStatusVO.of('pending') });
      d.trust();
      expect(d.isTrusted()).toBe(true);
    });
  });

  describe('block()', () => {
    it('should change status to blocked', () => {
      const d = buildDevice();
      d.block();
      expect(d.canLogin()).toBe(false);
    });
  });

  describe('revoke()', () => {
    it('should change status to revoked', () => {
      const d = buildDevice();
      d.revoke();
      expect(d.canLogin()).toBe(false);
    });
  });

  describe('rename()', () => {
    it('should update device name', () => {
      const d = buildDevice();
      d.rename('New Name');
      expect(d.name).toBe('New Name');
    });

    it('should trim and cap name length', () => {
      const d = buildDevice();
      d.rename('  ' + 'x'.repeat(100) + '  ');
      expect(d.name.length).toBeLessThanOrEqual(80);
    });

    it('should reject empty name', () => {
      const d = buildDevice();
      expect(() => d.rename('')).toThrow('Device name required');
      expect(() => d.rename('   ')).toThrow('Device name required');
    });
  });

  describe('getters', () => {
    it('should expose fingerprint', () => {
      expect(buildDevice().fingerprint.value.length).toBe(64);
    });

    it('should expose type', () => {
      expect(buildDevice().type.value).toBe('mobile');
    });

    it('should expose status', () => {
      expect(buildDevice().status.value).toBe('trusted');
    });

    it('should expose lastSeenAt', () => {
      expect(buildDevice().lastSeenAt).toBe(NOW_MS);
    });
  });
});
