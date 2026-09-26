/**
 * AuthBiometricEntity — Unit Tests
 * @module auth-service/domain/entities
 */
import { AuthBiometricEntity } from './auth-biometric.entity';
import { BiometricIdVO } from '../value-objects/primitives/biometric-id.vo';

const NOW = '2024-01-01T00:00:00.000Z';
const NOW_MS = new Date(NOW).getTime();

const buildBiometric = (
  overrides: Partial<Parameters<typeof AuthBiometricEntity.create>[0]> = {},
) =>
  AuthBiometricEntity.create({
    id: 'bio-1',
    userId: 'user-1' as never,
    biometricId: BiometricIdVO.of('bio_abc12345'),
    kind: 'fingerprint',
    enrolledAt: NOW_MS,
    createdAt: NOW,
    updatedAt: NOW,
    ...overrides,
  });

describe('AuthBiometricEntity', () => {
  describe('create()', () => {
    it('should create biometric enrollment', () => {
      const b = buildBiometric();
      expect(b.userId).toBe('user-1');
      expect(b.kind).toBe('fingerprint');
      expect(b.enrolledAt).toBe(NOW_MS);
    });

    it('should accept all kinds', () => {
      ['fingerprint', 'face', 'voice', 'iris'].forEach((k) => {
        const b = buildBiometric({ kind: k as never });
        expect(b.kind).toBe(k);
      });
    });

    it('should accept optional deviceId', () => {
      const b = buildBiometric({ deviceId: 'device-abc' });
      expect(b.deviceId).toBe('device-abc');
    });
  });

  describe('isDeviceBound()', () => {
    it('should return true when deviceId set', () => {
      const b = buildBiometric({ deviceId: 'device-abc' });
      expect(b.isDeviceBound()).toBe(true);
    });

    it('should return false without deviceId', () => {
      expect(buildBiometric().isDeviceBound()).toBe(false);
    });
  });

  describe('rebindTo()', () => {
    it('should update deviceId', () => {
      const b = buildBiometric();
      b.rebindTo('new-device-xyz');
      expect(b.deviceId).toBe('new-device-xyz');
    });
  });

  describe('getters', () => {
    it('should expose biometricId', () => {
      expect(buildBiometric().biometricId.value).toBe('bio_abc12345');
    });

    it('should expose kind', () => {
      expect(buildBiometric().kind).toBe('fingerprint');
    });

    it('should expose deviceId as undefined initially', () => {
      expect(buildBiometric().deviceId).toBeUndefined();
    });

    it('should expose enrolledAt', () => {
      expect(buildBiometric().enrolledAt).toBe(NOW_MS);
    });
  });
});
