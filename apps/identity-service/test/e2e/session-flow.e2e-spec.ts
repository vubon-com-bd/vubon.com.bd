/**
 * E2E — Session Flow: create → access → refresh → revoke
 */
import { describe, it, expect } from '@jest/globals';
import { SessionEntity } from '@domain/entities/session.entity.js';
import { SessionIdVO } from '@domain/value-objects/primitives/session-id.vo.js';
import { AuthIdVO } from '@domain/value-objects/primitives/auth-id.vo.js';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo.js';
import { SessionExpiryVO } from '@domain/value-objects/primitives/session-expiry.vo.js';
import { IpAddressVO } from '@domain/value-objects/primitives/ip-address.vo.js';
import { UserAgentVO } from '@domain/value-objects/primitives/user-agent.vo.js';
import { SessionManagerService } from '@domain/services/session-manager.service.js';
import {
  E2E_IDS,
  E2E_CONSTANTS,
  E2E_DATES,
  E2EEventCollector,
} from './setup/e2e-fixtures.js';
import { activeSession } from '@fixtures/index';

describe('E2E — Session Flow', () => {
  it('create → touch → refresh → logout', () => {
    const events = new E2EEventCollector();

    // Step 1: Create
    const session = SessionEntity.create({
      id: SessionIdVO.create(E2E_IDS.SESSION),
      props: {
        authId: AuthIdVO.create(E2E_IDS.AUTH),
        userId: UserIdVO.create(E2E_IDS.USER),
        expiry: SessionManagerService.buildExpiry(false),
        ipAddress: IpAddressVO.create(E2E_CONSTANTS.IP),
        userAgent: UserAgentVO.create(E2E_CONSTANTS.USER_AGENT),
        rememberMe: false,
      },
      now: E2E_DATES.NOW,
    });
    session.pullDomainEvents().forEach((e) => events.record(e.type, e.aggregateId, e.payload));
    expect(session.isActive()).toBe(true);
    expect(session.canAccess()).toBe(true);

    // Step 2: Touch access
    session.touchAccess(E2E_DATES.FUTURE);
    expect(session.lastAccessedAt).toBe(E2E_DATES.FUTURE);

    // Step 3: Refresh
    const newExpiry = SessionExpiryVO.create({
      absoluteExpiresAt: E2E_DATES.FAR_FUTURE_EPOCH,
      idleTimeoutSeconds: 1800,
    });
    session.refresh(newExpiry, E2E_DATES.FUTURE);
    session.pullDomainEvents().forEach((e) => events.record(e.type, e.aggregateId, e.payload));
    expect(session.refreshedAt).toBeDefined();

    // Step 4: Logout
    session.logout(E2E_DATES.FUTURE);
    session.pullDomainEvents().forEach((e) => events.record(e.type, e.aggregateId, e.payload));
    expect(session.status.isRevoked()).toBe(true);
    expect(session.canAccess()).toBe(false);

    // Events
    expect(events.countByType('identity.session.created')).toBe(1);
    expect(events.countByType('identity.session.refreshed')).toBe(1);
    expect(events.countByType('identity.session.logout')).toBe(1);
  });

  it('expired session cannot access', () => {
    const s = SessionEntity.reconstitute({
      id: E2E_IDS.SESSION,
      createdAt: E2E_DATES.PAST,
      updatedAt: E2E_DATES.PAST,
      props: {
        authId: AuthIdVO.create(E2E_IDS.AUTH),
        userId: UserIdVO.create(E2E_IDS.USER),
        status: activeSession().status,
        expiry: SessionExpiryVO.create({
          absoluteExpiresAt: E2E_DATES.PAST_EPOCH,
          idleTimeoutSeconds: 1800,
        }),
        rememberMe: false,
        lastAccessedAt: E2E_DATES.PAST,
      },
    });
    expect(s.canAccess()).toBe(false);
  });

  it('revoked session rejects refresh', () => {
    const session = activeSession();
    session.revoke('security_breach', E2E_DATES.NOW);
    const newExpiry = SessionExpiryVO.create({
      absoluteExpiresAt: E2E_DATES.FAR_FUTURE_EPOCH,
      idleTimeoutSeconds: 1800,
    });
    expect(() => session.refresh(newExpiry)).toThrow();
  });

  it('idle timeout detection', () => {
    const s = SessionEntity.reconstitute({
      id: E2E_IDS.SESSION,
      createdAt: E2E_DATES.PAST,
      updatedAt: E2E_DATES.PAST,
      props: {
        authId: AuthIdVO.create(E2E_IDS.AUTH),
        userId: UserIdVO.create(E2E_IDS.USER),
        status: activeSession().status,
        expiry: SessionExpiryVO.create({
          absoluteExpiresAt: E2E_DATES.FAR_FUTURE_EPOCH,
          idleTimeoutSeconds: 60,
        }),
        rememberMe: false,
        lastAccessedAt: new Date(Date.now() - 120000).toISOString(), // 2 min ago
      },
    });
    expect(s.isIdle()).toBe(true);
  });
});
