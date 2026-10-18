/**
 * MfaEntity unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { MfaEntity } from '@domain/entities/mfa.entity.js';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { MfaIdVO } from '@domain/value-objects/primitives/mfa-id.vo.js';
import { AuthIdVO } from '@domain/value-objects/primitives/auth-id.vo.js';
import { MfaMethodVO } from '@domain/value-objects/primitives/mfa-method.vo.js';
import { MfaSecretVO } from '@domain/value-objects/primitives/mfa-secret.vo.js';
import {
  TEST_IDS,
  TEST_MFA_SECRET,
  TEST_DATES,
  makeMfaEntity,
  unverifiedMfa,
  verifiedMfa,
  enabledMfa,
  createNewMfa,
} from '@fixtures/index';

describe('MfaEntity', () => {
  describe('create()', () => {
    it('should create unverified + emit setup event', () => {
      const m = createNewMfa();
      expect(m.verified).toBe(false);
      expect(m.enabled).toBe(false);
      const events = m.pullDomainEvents();
      expect(events.some((e) => e.type === 'mfa.setup_started')).toBe(true);
    });
  });

  describe('invariants', () => {
    it('should reject enabled without verified', () => {
      expect(() =>
        MfaEntity.reconstitute({
          id: TEST_IDS.MFA_ID,
          createdAt: TEST_DATES.NOW,
          updatedAt: TEST_DATES.NOW,
          props: {
            authId: AuthIdVO.create(TEST_IDS.AUTH_ID),
            method: MfaMethodVO.totp(),
            secret: MfaSecretVO.create(TEST_MFA_SECRET),
            verified: false,
            enabled: true,
            failedAttempts: 0,
          },
        }),
      ).toThrow(ValidationError);
    });
  });

  describe('predicates', () => {
    it('isEnabledAndVerified', () => {
      expect(enabledMfa().isEnabledAndVerified()).toBe(true);
      expect(verifiedMfa().isEnabledAndVerified()).toBe(false);
    });
  });

  describe('markVerified()', () => {
    it('should set verified + emit event', () => {
      const m = unverifiedMfa();
      m.pullDomainEvents();
      m.markVerified();
      expect(m.verified).toBe(true);
      expect(m.verifiedAt).toBeDefined();
      const events = m.pullDomainEvents();
      expect(events.some((e) => e.type === 'mfa.verified')).toBe(true);
    });

    it('should be idempotent', () => {
      const m = verifiedMfa();
      m.pullDomainEvents();
      m.markVerified();
      expect(m.pullDomainEvents().length).toBe(0);
    });
  });

  describe('enable()', () => {
    it('should enable when verified', () => {
      const m = verifiedMfa();
      m.pullDomainEvents();
      m.enable();
      expect(m.enabled).toBe(true);
      expect(m.enabledAt).toBeDefined();
      const events = m.pullDomainEvents();
      expect(events.some((e) => e.type === 'mfa.enabled')).toBe(true);
    });

    it('should throw when not verified', () => {
      const m = unverifiedMfa();
      expect(() => m.enable()).toThrow(BusinessRuleError);
    });

    it('should be idempotent', () => {
      const m = enabledMfa();
      m.pullDomainEvents();
      m.enable();
      expect(m.pullDomainEvents().length).toBe(0);
    });
  });

  describe('disable()', () => {
    it('should disable + emit event', () => {
      const m = enabledMfa();
      m.pullDomainEvents();
      m.disable();
      expect(m.enabled).toBe(false);
      expect(m.disabledAt).toBeDefined();
      const events = m.pullDomainEvents();
      expect(events.some((e) => e.type === 'mfa.disabled')).toBe(true);
    });

    it('should be idempotent on non-enabled', () => {
      const m = verifiedMfa();
      m.pullDomainEvents();
      m.disable();
      expect(m.pullDomainEvents().length).toBe(0);
    });
  });

  describe('recordFailedAttempt() / resetFailedAttempts()', () => {
    it('should increment', () => {
      const m = verifiedMfa();
      m.recordFailedAttempt();
      m.recordFailedAttempt();
      expect(m.failedAttempts).toBe(2);
    });

    it('should reset', () => {
      const m = makeMfaEntity({ failedAttempts: 5 });
      m.resetFailedAttempts();
      expect(m.failedAttempts).toBe(0);
    });
  });
});
