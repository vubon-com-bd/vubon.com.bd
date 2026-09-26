/**
 * AuthMfaEntity — Unit Tests (Aggregate Root)
 * @module auth-service/domain/entities
 */
import { AuthMfaEntity } from './auth-mfa.entity';
import { MfaSecretVO } from '../value-objects/primitives/mfa-secret.vo';
import { MfaTypeVO } from '../value-objects/primitives/mfa-type.vo';
import { MfaStatusVO } from '../value-objects/primitives/mfa-status.vo';
import { MfaAlreadyEnabledError } from '../errors/mfa.errors';

const NOW = '2024-01-01T00:00:00.000Z';
const NOW_MS = new Date(NOW).getTime();

const buildMfa = (overrides: Partial<Parameters<typeof AuthMfaEntity.create>[0]> = {}) =>
  AuthMfaEntity.create({
    id: 'mfa-1',
    userId: 'user-1' as never,
    type: MfaTypeVO.of('totp'),
    status: MfaStatusVO.of('disabled'),
    createdAt: NOW,
    updatedAt: NOW,
    ...overrides,
  });

describe('AuthMfaEntity (Aggregate Root)', () => {
  describe('create()', () => {
    it('should create disabled MFA', () => {
      const m = buildMfa();
      expect(m.type.value).toBe('totp');
      expect(m.isEnabled()).toBe(false);
    });
  });

  describe('beginEnrollment()', () => {
    it('should set status to pending', () => {
      const m = buildMfa();
      m.beginEnrollment(NOW_MS, MfaSecretVO.of('JBSWY3DPEHPK3PXP'));
      expect(m.status.value).toBe('pending');
      expect(m.secret?.value).toBe('JBSWY3DPEHPK3PXP');
    });

    it('should throw if MFA already enabled', () => {
      const m = buildMfa({ status: MfaStatusVO.enabled() });
      expect(() => m.beginEnrollment(NOW_MS, MfaSecretVO.of('JBSWY3DPEHPK3PXP')))
        .toThrow(MfaAlreadyEnabledError);
    });
  });

  describe('confirmEnrollment()', () => {
    it('should enable MFA from pending state', () => {
      const m = buildMfa({ status: MfaStatusVO.of('pending') });
      m.confirmEnrollment(NOW_MS);
      expect(m.status.value).toBe('enabled');
      expect(m.isEnabled()).toBe(true);
    });

    it('should throw if not pending', () => {
      const m = buildMfa({ status: MfaStatusVO.of('disabled') });
      expect(() => m.confirmEnrollment(NOW_MS)).toThrow('not pending enrollment');
    });
  });

  describe('disable()', () => {
    it('should disable and clear secret', () => {
      const m = buildMfa({
        status: MfaStatusVO.enabled(),
        secret: MfaSecretVO.of('JBSWY3DPEHPK3PXP'),
      });
      m.disable();
      expect(m.status.value).toBe('disabled');
      expect(m.secret).toBeUndefined();
    });
  });

  describe('isEnabled()', () => {
    it('should return true when enabled', () => {
      const m = buildMfa({ status: MfaStatusVO.enabled() });
      expect(m.isEnabled()).toBe(true);
    });

    it('should return false otherwise', () => {
      expect(buildMfa().isEnabled()).toBe(false);
    });
  });
});
