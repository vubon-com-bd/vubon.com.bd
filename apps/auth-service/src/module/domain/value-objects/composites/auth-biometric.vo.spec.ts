/**
 * AuthBiometricVO — Unit Tests
 * @module auth-service/domain/value-objects/composites
 */
import { AuthBiometricVO } from './auth-biometric.vo.js';
import { UserIdVO } from '../primitives/user-id.vo.js';
import { BiometricIdVO } from '../primitives/biometric-id.vo.js';

describe('AuthBiometricVO', () => {
  const userId = UserIdVO.of('user-1');
  const now = Date.now();

  describe('of()', () => {
    it('should create biometric enrollment', () => {
      const vo = AuthBiometricVO.of({
        userId,
        biometricId: BiometricIdVO.of('bio_abc12345'),
        kind: 'fingerprint',
        enrolledAt: now,
      });
      expect(vo.kind).toBe('fingerprint');
      expect(vo.isDeviceBound()).toBe(false);
    });

    it('should create device-bound biometric', () => {
      const vo = AuthBiometricVO.of({
        userId,
        biometricId: BiometricIdVO.of('bio_abc12345'),
        kind: 'face',
        deviceId: 'device-abc',
        enrolledAt: now,
      });
      expect(vo.isDeviceBound()).toBe(true);
    });
  });
});
