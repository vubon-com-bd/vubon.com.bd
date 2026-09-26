/**
 * Interface Decorators — Unit Tests
 * @module auth-service/interfaces/decorators
 */
import 'reflect-metadata';
import {
  MfaRequired,
  MFA_REQUIRED_KEY,
} from './mfa-required.decorator';
import {
  BiometricRequired,
  BIOMETRIC_REQUIRED_KEY,
} from './biometric-required.decorator';
import {
  VerifiedRequired,
  VERIFIED_REQUIRED_KEY,
} from './verified-required.decorator';
import {
  DeviceTrusted,
  DEVICE_TRUSTED_KEY,
} from './device-trusted.decorator';

describe('Interface Decorators', () => {
  describe('MfaRequired', () => {
    it('should export MFA_REQUIRED_KEY', () => {
      expect(MFA_REQUIRED_KEY).toBe('auth:mfaRequired');
    });

    it('should set metadata to true on class method', () => {
      class Test {
        @MfaRequired()
        method() {}
      }
      const meta = Reflect.getMetadata(MFA_REQUIRED_KEY, Test.prototype.method);
      expect(meta).toBe(true);
    });
  });

  describe('BiometricRequired', () => {
    it('should export BIOMETRIC_REQUIRED_KEY', () => {
      expect(BIOMETRIC_REQUIRED_KEY).toBe('auth:biometricRequired');
    });

    it('should set metadata to true', () => {
      class Test {
        @BiometricRequired()
        method() {}
      }
      const meta = Reflect.getMetadata(BIOMETRIC_REQUIRED_KEY, Test.prototype.method);
      expect(meta).toBe(true);
    });
  });

  describe('VerifiedRequired', () => {
    it('should export VERIFIED_REQUIRED_KEY', () => {
      expect(VERIFIED_REQUIRED_KEY).toBe('auth:verifiedRequired');
    });

    it('should set metadata to "email" by default', () => {
      class Test {
        @VerifiedRequired()
        method() {}
      }
      const meta = Reflect.getMetadata(VERIFIED_REQUIRED_KEY, Test.prototype.method);
      expect(meta).toBe('any');
    });

    it('should set metadata to explicit channel', () => {
      class Test {
        @VerifiedRequired('phone')
        method() {}
      }
      const meta = Reflect.getMetadata(VERIFIED_REQUIRED_KEY, Test.prototype.method);
      expect(meta).toBe('phone');
    });
  });

  describe('DeviceTrusted', () => {
    it('should export DEVICE_TRUSTED_KEY', () => {
      expect(DEVICE_TRUSTED_KEY).toBe('auth:deviceTrusted');
    });

    it('should set metadata to true', () => {
      class Test {
        @DeviceTrusted()
        method() {}
      }
      const meta = Reflect.getMetadata(DEVICE_TRUSTED_KEY, Test.prototype.method);
      expect(meta).toBe(true);
    });
  });
});
