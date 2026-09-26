/**
 * AuthLoginAttemptVO — Unit Tests
 * @module auth-service/domain/value-objects/composites
 */
import { AuthLoginAttemptVO } from './auth-login-attempt.vo';
import { LoginAttemptIpVO } from '../primitives/login-attempt-ip.vo';
import { LoginAttemptStatusVO } from '../primitives/login-attempt-status.vo';

describe('AuthLoginAttemptVO', () => {
  const now = Date.now();

  describe('of()', () => {
    it('should create successful attempt', () => {
      const vo = AuthLoginAttemptVO.of({
        attemptId: 'att-1',
        userId: 'user-1',
        ip: LoginAttemptIpVO.of('192.168.1.1'),
        status: LoginAttemptStatusVO.of('success'),
        userAgent: 'Mozilla/5.0',
        attemptedAt: now,
      });
      expect(vo.isSuccess()).toBe(true);
      expect(vo.countsForLockout()).toBe(false);
    });

    it('should create failed attempt with reason', () => {
      const vo = AuthLoginAttemptVO.of({
        attemptId: 'att-1',
        userId: 'user-1',
        ip: LoginAttemptIpVO.of('192.168.1.1'),
        status: LoginAttemptStatusVO.of('failure'),
        userAgent: 'Mozilla/5.0',
        attemptedAt: now,
        failureReason: 'Invalid password',
      });
      expect(vo.isSuccess()).toBe(false);
      expect(vo.countsForLockout()).toBe(true);
    });

    it('should require failureReason for failed attempts', () => {
      expect(() => AuthLoginAttemptVO.of({
        attemptId: 'att-1',
        userId: 'user-1',
        ip: LoginAttemptIpVO.of('192.168.1.1'),
        status: LoginAttemptStatusVO.of('failure'),
        userAgent: 'Mozilla/5.0',
        attemptedAt: now,
      })).toThrow('failureReason');
    });

    it('should allow attempt without userId (unknown user)', () => {
      const vo = AuthLoginAttemptVO.of({
        attemptId: 'att-1',
        email: 'unknown@test.com',
        ip: LoginAttemptIpVO.of('192.168.1.1'),
        status: LoginAttemptStatusVO.of('failure'),
        userAgent: 'Mozilla/5.0',
        attemptedAt: now,
        failureReason: 'User not found',
      });
      expect(vo.userId).toBeUndefined();
    });
  });
});
