/**
 * DeviceTrustService — Unit Tests
 * @module auth-service/domain/services
 */
import { DeviceTrustService } from './device-trust.service';
import { AuthDeviceEntity } from '../entities/auth-device.entity';
import { DeviceFingerprintVO } from '../value-objects/primitives/device-fingerprint.vo';
import { DeviceTypeVO } from '../value-objects/primitives/device-type.vo';
import { DeviceStatusVO } from '../value-objects/primitives/device-status.vo';
import { UntrustedDeviceError } from '../errors/device.errors';

const NOW = '2024-01-01T00:00:00.000Z';
const NOW_MS = new Date(NOW).getTime();

const buildDevice = (status: 'pending' | 'trusted' | 'untrusted' | 'blocked' | 'revoked') =>
  AuthDeviceEntity.create({
    id: 'dev-1',
    userId: 'user-1' as never,
    fingerprint: DeviceFingerprintVO.of('a'.repeat(64)),
    type: DeviceTypeVO.of('mobile'),
    status: DeviceStatusVO.of(status),
    name: 'iPhone',
    firstSeenAt: NOW_MS,
    lastSeenAt: NOW_MS,
    createdAt: NOW,
    updatedAt: NOW,
  });

describe('DeviceTrustService', () => {
  describe('shouldAutoTrust()', () => {
    it('should promote pending device after 3 logins', () => {
      expect(
        DeviceTrustService.shouldAutoTrust(buildDevice('pending'), 3, false),
      ).toBe(true);
    });

    it('should NOT promote with < 3 logins', () => {
      expect(
        DeviceTrustService.shouldAutoTrust(buildDevice('pending'), 2, false),
      ).toBe(false);
    });

    it('should NOT promote already trusted device', () => {
      expect(
        DeviceTrustService.shouldAutoTrust(buildDevice('trusted'), 10, false),
      ).toBe(false);
    });

    it('should NOT promote privileged users\' devices', () => {
      expect(
        DeviceTrustService.shouldAutoTrust(buildDevice('pending'), 10, true),
      ).toBe(false);
    });

    it('should NOT promote blocked devices', () => {
      expect(
        DeviceTrustService.shouldAutoTrust(buildDevice('blocked'), 10, false),
      ).toBe(false);
    });

    it('should NOT promote revoked devices', () => {
      expect(
        DeviceTrustService.shouldAutoTrust(buildDevice('revoked'), 10, false),
      ).toBe(false);
    });
  });

  describe('assertTrusted()', () => {
    it('should not throw for trusted device', () => {
      expect(() =>
        DeviceTrustService.assertTrusted(buildDevice('trusted')),
      ).not.toThrow();
    });

    it('should throw for blocked device', () => {
      expect(() =>
        DeviceTrustService.assertTrusted(buildDevice('blocked')),
      ).toThrow(UntrustedDeviceError);
    });

    it('should throw for revoked device', () => {
      expect(() =>
        DeviceTrustService.assertTrusted(buildDevice('revoked')),
      ).toThrow(UntrustedDeviceError);
    });

    it('should throw for pending device', () => {
      expect(() =>
        DeviceTrustService.assertTrusted(buildDevice('pending')),
      ).toThrow(UntrustedDeviceError);
    });

    it('should throw for untrusted device', () => {
      expect(() =>
        DeviceTrustService.assertTrusted(buildDevice('untrusted')),
      ).toThrow(UntrustedDeviceError);
    });
  });

  describe('canLogin()', () => {
    it('should return true for trusted', () => {
      expect(DeviceTrustService.canLogin(buildDevice('trusted'))).toBe(true);
    });

    it('should return true for pending', () => {
      expect(DeviceTrustService.canLogin(buildDevice('pending'))).toBe(true);
    });

    it('should return false for blocked', () => {
      expect(DeviceTrustService.canLogin(buildDevice('blocked'))).toBe(false);
    });

    it('should return false for revoked', () => {
      expect(DeviceTrustService.canLogin(buildDevice('revoked'))).toBe(false);
    });

    it('should return false for untrusted', () => {
      expect(DeviceTrustService.canLogin(buildDevice('untrusted'))).toBe(false);
    });
  });

  describe('PROMOTION_THRESHOLD', () => {
    it('should be 3', () => {
      expect(DeviceTrustService.PROMOTION_THRESHOLD).toBe(3);
    });
  });
});
