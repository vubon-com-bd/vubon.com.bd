/**
 * AccountLockReasonVO — Unit Tests
 * @module auth-service/domain/value-objects/primitives
 */
import { AccountLockReasonVO } from './account-lock-reason.vo';

describe('AccountLockReasonVO', () => {
  describe('of()', () => {
    it('should accept all valid reasons', () => {
      const reasons = [
        'too_many_attempts',
        'suspicious_activity',
        'admin_action',
        'payment_fraud',
        'policy_violation',
        'security_incident',
      ];
      reasons.forEach((r) => {
        const vo = AccountLockReasonVO.of(r);
        expect(vo.value).toBe(r);
      });
    });

    it('should reject invalid reason', () => {
      expect(() => AccountLockReasonVO.of('unknown')).toThrow();
      expect(() => AccountLockReasonVO.of('')).toThrow();
    });
  });

  describe('static factories', () => {
    it('should create tooManyAttempts', () => {
      const vo = AccountLockReasonVO.tooManyAttempts();
      expect(vo.value).toBe('too_many_attempts');
    });
  });

  describe('requiresManualUnlock()', () => {
    it('should return true for admin_action', () => {
      expect(AccountLockReasonVO.of('admin_action').requiresManualUnlock()).toBe(true);
    });

    it('should return true for payment_fraud', () => {
      expect(AccountLockReasonVO.of('payment_fraud').requiresManualUnlock()).toBe(true);
    });

    it('should return true for policy_violation', () => {
      expect(AccountLockReasonVO.of('policy_violation').requiresManualUnlock()).toBe(true);
    });

    it('should return true for security_incident', () => {
      expect(AccountLockReasonVO.of('security_incident').requiresManualUnlock()).toBe(true);
    });

    it('should return false for too_many_attempts', () => {
      expect(AccountLockReasonVO.of('too_many_attempts').requiresManualUnlock()).toBe(false);
    });

    it('should return false for suspicious_activity', () => {
      expect(AccountLockReasonVO.of('suspicious_activity').requiresManualUnlock()).toBe(false);
    });
  });
});
