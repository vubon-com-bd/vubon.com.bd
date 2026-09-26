/**
 * AuthDeviceVO — Unit Tests
 * @module auth-service/domain/value-objects/composites
 */
import { AuthDeviceVO } from './auth-device.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { DeviceFingerprintVO } from '../primitives/device-fingerprint.vo';
import { DeviceTypeVO } from '../primitives/device-type.vo';
import { DeviceStatusVO } from '../primitives/device-status.vo';

describe('AuthDeviceVO', () => {
  const userId = UserIdVO.of('user-1');
  const now = Date.now();

  const valid = {
    deviceId: 'dev-1',
    userId,
    fingerprint: DeviceFingerprintVO.of('a'.repeat(64)),
    type: DeviceTypeVO.of('mobile'),
    status: DeviceStatusVO.of('trusted'),
    name: 'iPhone 15',
    firstSeenAt: now - 86_400_000,
    lastSeenAt: now,
  };

  describe('of()', () => {
    it('should create valid device', () => {
      const vo = AuthDeviceVO.of(valid);
      expect(vo.userId.value).toBe('user-1');
      expect(vo.isTrusted()).toBe(true);
    });

    it('should reject lastSeenAt < firstSeenAt', () => {
      expect(() => AuthDeviceVO.of({
        ...valid,
        lastSeenAt: now - 100_000_000,
      })).toThrow('lastSeenAt must be >= firstSeenAt');
    });
  });

  describe('isTrusted()', () => {
    it('should return true for trusted', () => {
      expect(AuthDeviceVO.of(valid).isTrusted()).toBe(true);
    });

    it('should return false for untrusted', () => {
      const vo = AuthDeviceVO.of({ ...valid, status: DeviceStatusVO.of('untrusted') });
      expect(vo.isTrusted()).toBe(false);
    });
  });

  describe('canLogin()', () => {
    it('should return true for trusted', () => {
      expect(AuthDeviceVO.of(valid).canLogin()).toBe(true);
    });

    it('should return true for pending', () => {
      const vo = AuthDeviceVO.of({ ...valid, status: DeviceStatusVO.of('pending') });
      expect(vo.canLogin()).toBe(true);
    });

    it('should return false for blocked', () => {
      const vo = AuthDeviceVO.of({ ...valid, status: DeviceStatusVO.of('blocked') });
      expect(vo.canLogin()).toBe(false);
    });
  });
});
