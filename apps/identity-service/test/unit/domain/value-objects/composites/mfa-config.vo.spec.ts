/**
 * MfaConfigVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { MfaConfigVO } from '@domain/value-objects/composites/mfa-config.vo.js';
import { AuthIdVO } from '@domain/value-objects/primitives/auth-id.vo.js';
import { MfaMethodVO } from '@domain/value-objects/primitives/mfa-method.vo.js';
import { MfaSecretVO } from '@domain/value-objects/primitives/mfa-secret.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS, TEST_MFA_SECRET } from '@fixtures/index';
import { TEST_DATES } from '@fixtures/index';

const makeProps = (overrides: Record<string, unknown> = {}) => ({
  authId: AuthIdVO.create(TEST_IDS.AUTH_ID),
  enabled: false,
  primaryMethod: MfaMethodVO.totp(),
  backupMethods: [] as readonly MfaMethodVO[],
  secret: MfaSecretVO.create(TEST_MFA_SECRET),
  verified: false,
  createdAt: TEST_DATES.NOW,
  updatedAt: TEST_DATES.NOW,
  ...overrides,
});

describe('MfaConfigVO', () => {
  describe('create()', () => {
    it('should create valid', () => {
      const vo = MfaConfigVO.create(makeProps());
      expect(vo.enabled).toBe(false);
      expect(vo.primaryMethod.isTotp()).toBe(true);
    });

    it('should throw when enabled but not verified', () => {
      expect(() => MfaConfigVO.create(makeProps({ enabled: true, verified: false }))).toThrow(
        ValidationError,
      );
    });

    it('should throw when TOTP has no secret', () => {
      expect(() =>
        MfaConfigVO.create(
          makeProps({ primaryMethod: MfaMethodVO.totp(), secret: undefined, enabled: true, verified: true }),
        ),
      ).toThrow(ValidationError);
    });

    it('should throw when primary in backup', () => {
      expect(() =>
        MfaConfigVO.create(
          makeProps({ backupMethods: [MfaMethodVO.totp()] }),
        ),
      ).toThrow(ValidationError);
    });

    it('should freeze', () => {
      expect(Object.isFrozen(MfaConfigVO.create(makeProps()))).toBe(true);
    });
  });

  describe('isEnabledAndVerified()', () => {
    it('true only when both', () => {
      const vo = MfaConfigVO.create(makeProps({ enabled: true, verified: true, verifiedAt: TEST_DATES.NOW }));
      expect(vo.isEnabledAndVerified()).toBe(true);
    });

    it('false when disabled', () => {
      const vo = MfaConfigVO.create(makeProps({ verified: true, verifiedAt: TEST_DATES.NOW }));
      expect(vo.isEnabledAndVerified()).toBe(false);
    });
  });

  describe('hasMethod()', () => {
    it('checks primary + backups', () => {
      const vo = MfaConfigVO.create(
        makeProps({ backupMethods: [MfaMethodVO.sms()] }),
      );
      expect(vo.hasMethod(MfaMethodVO.totp())).toBe(true);
      expect(vo.hasMethod(MfaMethodVO.sms())).toBe(true);
      expect(vo.hasMethod(MfaMethodVO.email())).toBe(false);
    });
  });

  describe('reconstitute()', () => {
    it('should skip validation', () => {
      const vo = MfaConfigVO.reconstitute(makeProps({ enabled: true, verified: false }));
      expect(vo.enabled).toBe(true);
    });
  });
});
