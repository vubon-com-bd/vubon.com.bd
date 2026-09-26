/**
 * AuthLoginAttemptEntity — Unit Tests
 * @module auth-service/domain/entities
 */
import { AuthLoginAttemptEntity } from './auth-login-attempt.entity';
import { LoginAttemptIpVO } from '../value-objects/primitives/login-attempt-ip.vo';
import { LoginAttemptStatusVO } from '../value-objects/primitives/login-attempt-status.vo';

const NOW = '2024-01-01T00:00:00.000Z';
const NOW_MS = new Date(NOW).getTime();

const buildAttempt = (
  overrides: Partial<Parameters<typeof AuthLoginAttemptEntity.create>[0]> = {},
) =>
  AuthLoginAttemptEntity.create({
    id: 'att-1',
    userId: 'user-1' as never,
    ip: LoginAttemptIpVO.of('192.168.1.1'),
    userAgent: 'Mozilla/5.0',
    status: LoginAttemptStatusVO.success(),
    attemptedAt: NOW_MS,
    createdAt: NOW,
    updatedAt: NOW,
    ...overrides,
  });

describe('AuthLoginAttemptEntity', () => {
  describe('create()', () => {
    it('should create successful attempt', () => {
      const a = buildAttempt();
      expect(a.isSuccess()).toBe(true);
      expect(a.isFailure()).toBe(false);
    });

    it('should create failure attempt', () => {
      const a = buildAttempt({
        status: LoginAttemptStatusVO.of('failure'),
        failureReason: 'Invalid password',
      });
      expect(a.isFailure()).toBe(true);
    });

    it('should accept attempt without userId (unknown user)', () => {
      const a = buildAttempt({ userId: undefined, email: 'unknown@test.com' });
      expect(a.userId).toBeUndefined();
      expect(a.email).toBe('unknown@test.com');
    });
  });

  describe('isSuccess() / isFailure()', () => {
    it('should identify success', () => {
      const a = buildAttempt();
      expect(a.isSuccess()).toBe(true);
      expect(a.isFailure()).toBe(false);
    });

    it('should identify failure', () => {
      const a = buildAttempt({ status: LoginAttemptStatusVO.of('failure') });
      expect(a.isFailure()).toBe(true);
      expect(a.isSuccess()).toBe(false);
    });

    it('should identify mfa_failed as failure', () => {
      const a = buildAttempt({ status: LoginAttemptStatusVO.of('mfa_failed') });
      expect(a.isFailure()).toBe(true);
    });

    it('should NOT count blocked as failure (blocked is final state)', () => {
      // Business rule: `blocked` is a terminal state, not a failure event.
      // Only `failure` and `mfa_failed` count as failure for lockout purposes.
      const a = buildAttempt({ status: LoginAttemptStatusVO.of('blocked') });
      expect(a.isFailure()).toBe(false);
    });

    it('should identify mfa_pending as NOT failure', () => {
      const a = buildAttempt({ status: LoginAttemptStatusVO.of('mfa_pending') });
      expect(a.isFailure()).toBe(false);
    });
  });

  describe('getters', () => {
    it('should expose ip', () => {
      expect(buildAttempt().ip.value).toBe('192.168.1.1');
    });

    it('should expose status', () => {
      expect(buildAttempt().status.value).toBe('success');
    });

    it('should expose attemptedAt', () => {
      expect(buildAttempt().attemptedAt).toBe(NOW_MS);
    });

    it('should expose userAgent', () => {
      expect(buildAttempt().userAgent).toBe('Mozilla/5.0');
    });

    it('should expose email', () => {
      const a = buildAttempt({ email: 'test@example.com' });
      expect(a.email).toBe('test@example.com');
    });
  });
});
