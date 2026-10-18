/**
 * E2E — Login Flow (Success + Failure + Lockout + Unlock)
 */
import { describe, it, expect } from '@jest/globals';
import { AuthEntity } from '@domain/entities/auth.entity.js';
import { LoginAttemptEntity } from '@domain/entities/login-attempt.entity.js';
import { AccountLockEntity } from '@domain/entities/account-lock.entity.js';
import { SessionEntity } from '@domain/entities/session.entity.js';
import { AuthIdVO } from '@domain/value-objects/primitives/auth-id.vo.js';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo.js';
import { SessionIdVO } from '@domain/value-objects/primitives/session-id.vo.js';
import { SessionExpiryVO } from '@domain/value-objects/primitives/session-expiry.vo.js';
import { LockReasonVO } from '@domain/value-objects/primitives/lock-reason.vo.js';
import { LockDurationVO } from '@domain/value-objects/primitives/lock-duration.vo.js';
import { IpAddressVO } from '@domain/value-objects/primitives/ip-address.vo.js';
import { UserAgentVO } from '@domain/value-objects/primitives/user-agent.vo.js';
import { LoginAttemptStatusVO } from '@domain/value-objects/primitives/login-attempt-status.vo.js';
import { IdentifierVO } from '@domain/value-objects/primitives/identifier.vo.js';
import { AccountLockPolicyService } from '@domain/services/account-lock-policy.service.js';
import { LoginAttemptTrackerService } from '@domain/services/login-attempt-tracker.service.js';
import { SessionManagerService } from '@domain/services/session-manager.service.js';
import { CanLoginSpecification } from '@domain/specifications/can-login.specification.js';
import {
  E2E_IDS,
  E2E_CONSTANTS,
  E2E_DATES,
  E2EEventCollector,
} from './setup/e2e-fixtures.js';
import { activeLocalAuth, makeLoginAttemptEntity } from '@fixtures/index';

describe('E2E — Login Flow', () => {
  it('successful login creates session + resets failures', () => {
    const events = new E2EEventCollector();

    // Active auth
    const auth = activeLocalAuth();
    auth.pullDomainEvents();

    // Simulate previous failed attempt
    auth.recordFailedAttempt(E2E_DATES.NOW);
    expect(auth.failedAttempts).toBe(1);

    // Successful login
    const attempt = LoginAttemptEntity.create({
      id: E2E_IDS.AUTH, // any
      props: {
        authId: AuthIdVO.create(E2E_IDS.AUTH),
        identifier: IdentifierVO.email(E2E_CONSTANTS.EMAIL),
        status: LoginAttemptStatusVO.success(),
        ipAddress: IpAddressVO.create(E2E_CONSTANTS.IP),
        userAgent: UserAgentVO.create(E2E_CONSTANTS.USER_AGENT),
        attemptedAt: E2E_DATES.NOW,
      },
      now: E2E_DATES.NOW,
    });
    expect(attempt.isSuccess()).toBe(true);

    // Create session
    const session = SessionEntity.create({
      id: SessionIdVO.create(E2E_IDS.SESSION),
      props: {
        authId: AuthIdVO.create(E2E_IDS.AUTH),
        userId: UserIdVO.create(E2E_IDS.USER),
        expiry: SessionExpiryVO.create({
          absoluteExpiresAt: E2E_DATES.FAR_FUTURE_EPOCH,
          idleTimeoutSeconds: 1800,
        }),
        ipAddress: IpAddressVO.create(E2E_CONSTANTS.IP),
        userAgent: UserAgentVO.create(E2E_CONSTANTS.USER_AGENT),
        rememberMe: false,
      },
      now: E2E_DATES.NOW,
    });
    session.pullDomainEvents().forEach((e) => events.record(e.type, e.aggregateId, e.payload));
    expect(session.isActive()).toBe(true);

    // Record login on auth + reset failures
    auth.recordLogin(IpAddressVO.create(E2E_CONSTANTS.IP), E2E_DATES.NOW);
    expect(auth.failedAttempts).toBe(0);
    expect(auth.lastLoginAt).toBeDefined();

    // Events verified
    expect(events.countByType('session.created')).toBe(1);
  });

  it('repeated failures trigger account lock', () => {
    const auth = activeLocalAuth();
    auth.pullDomainEvents();

    const now = E2E_DATES.NOW_MS;
    const max = LoginAttemptTrackerService.maxAttempts();

    // Simulate max failed attempts
    const attempts: { atMs: number; success: boolean }[] = [];
    for (let i = 0; i < max; i++) {
      auth.recordFailedAttempt(E2E_DATES.NOW);
      attempts.push({ atMs: now - i * 1000, success: false });
    }
    expect(auth.failedAttempts).toBe(max);

    // Tracker should flag as locked
    expect(LoginAttemptTrackerService.isLockedOut(attempts, now)).toBe(true);

    // Policy decides lock
    const decision = AccountLockPolicyService.decide(max);
    expect(decision.shouldLock).toBe(true);
    expect(decision.reason).toBe('too_many_attempts');

    // Create account lock
    const lock = AccountLockEntity.create({
      id: E2E_IDS.LOCK,
      props: {
        authId: AuthIdVO.create(E2E_IDS.AUTH),
        userId: UserIdVO.create(E2E_IDS.USER),
        reason: LockReasonVO.create('too_many_attempts'),
        duration: LockDurationVO.fromSeconds(decision.lockDurationSeconds),
        attemptCount: max,
        lockedAt: E2E_DATES.NOW,
        lockedUntil: E2E_DATES.FUTURE,
        ipAddress: IpAddressVO.create(E2E_CONSTANTS.IP),
      },
      now: E2E_DATES.NOW,
    });
    expect(lock.isActive()).toBe(true);
    expect(lock.attemptCount).toBe(max);

    // Lock the auth
    auth.lock(E2E_DATES.FUTURE, 'too_many_attempts', E2E_DATES.NOW);
    expect(auth.isLocked()).toBe(true);

    // CanLogin should fail
    const spec = new CanLoginSpecification();
    expect(spec.isSatisfiedBy({ auth })).toBe(false);
  });

  it('unlock resets failedAttempts and unlocks', () => {
    const auth = activeLocalAuth();
    auth.recordFailedAttempt();
    auth.recordFailedAttempt();
    auth.lock(E2E_DATES.FUTURE, 'too_many_attempts');
    expect(auth.failedAttempts).toBe(2);
    expect(auth.isLocked()).toBe(true);

    auth.unlock(E2E_DATES.NOW);
    expect(auth.isActive()).toBe(true);
    expect(auth.failedAttempts).toBe(0);
    expect(auth.lockedUntil).toBeUndefined();
  });

  it('session manager enforces max session limit', () => {
    const currentCount = SessionManagerService.maxSessionsPerUser();
    expect(() => SessionManagerService.enforceConcurrentLimit(currentCount)).toThrow();
  });

  it('shouldRefresh returns true near expiry', () => {
    const soon = Math.floor(Date.now() / 1000) + 60;
    expect(SessionManagerService.shouldRefresh(soon)).toBe(true);
  });

  it('selectForEviction returns oldest sessions first', () => {
    const sessions = [
      { id: 'a', createdAt: '2024-01-01T00:00:00Z' },
      { id: 'b', createdAt: '2024-06-01T00:00:00Z' },
      { id: 'c', createdAt: '2024-03-01T00:00:00Z' },
    ];
    const evict = SessionManagerService.selectForEviction(sessions, 2);
    expect(evict).toEqual(['a', 'c']);
  });
});
