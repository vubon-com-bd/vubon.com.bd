/**
 * E2E — Token Flow: issue → use → reuse detection → refresh
 */
import { describe, it, expect } from '@jest/globals';
import { TokenEntity } from '@domain/entities/token.entity.js';
import { TokenIdVO } from '@domain/value-objects/primitives/token-id.vo.js';
import { SessionIdVO } from '@domain/value-objects/primitives/session-id.vo.js';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo.js';
import { TokenTypeVO } from '@domain/value-objects/primitives/token-type.vo.js';
import { TokenValueVO } from '@domain/value-objects/primitives/token-value.vo.js';
import { TokenExpiryVO } from '@domain/value-objects/primitives/token-expiry.vo.js';
import { TokenGeneratorService } from '@domain/services/token-generator.service.js';
import { CanRefreshTokenSpecification } from '@domain/specifications/can-refresh-token.specification.js';
import {
  E2E_IDS,
  E2E_CONSTANTS,
  E2E_DATES,
  E2EEventCollector,
} from './setup/e2e-fixtures.js';
import { activeAccessToken, activeSession } from '@fixtures/index';

describe('E2E — Token Flow', () => {
  it('issue access + refresh → use → reuse detected', () => {
    const events = new E2EEventCollector();

    // Step 1: Build payloads
    const accessPayload = TokenGeneratorService.accessTokenPayload({
      sub: E2E_IDS.USER,
      sid: E2E_IDS.SESSION,
      iss: TokenGeneratorService.issuer(),
      jti: E2E_CONSTANTS.JTI,
    });
    expect(accessPayload.type).toBe('access');
    expect(accessPayload.exp).toBeGreaterThan(accessPayload.iat);

    const refreshPayload = TokenGeneratorService.refreshTokenPayload({
      sub: E2E_IDS.USER,
      sid: E2E_IDS.SESSION,
      iss: TokenGeneratorService.issuer(),
      jti: E2E_CONSTANTS.JTI + '-refresh',
    });
    expect(refreshPayload.type).toBe('refresh');

    // Step 2: Issue access token entity
    const accessToken = TokenEntity.create({
      id: TokenIdVO.create(E2E_IDS.TOKEN),
      props: {
        userId: UserIdVO.create(E2E_IDS.USER),
        sessionId: SessionIdVO.create(E2E_IDS.SESSION),
        type: TokenTypeVO.access(),
        value: TokenValueVO.create(E2E_CONSTANTS.ACCESS_TOKEN),
        expiry: TokenExpiryVO.fromEpochSeconds(accessPayload.exp),
        jti: E2E_CONSTANTS.JTI,
      },
      now: E2E_DATES.NOW,
    });
    accessToken.pullDomainEvents().forEach((e) => events.record(e.type, e.aggregateId, e.payload));
    expect(accessToken.isUsable()).toBe(true);

    // Step 3: Use token once (mark used)
    accessToken.markUsed(E2E_DATES.NOW);
    expect(accessToken.isUsed()).toBe(true);

    // Step 4: Reuse detection — should throw + emit reuse event
    expect(() => accessToken.markUsed(E2E_DATES.FUTURE)).toThrow();
    accessToken.pullDomainEvents().forEach((e) => events.record(e.type, e.aggregateId, e.payload));

    // Events
    expect(events.countByType('identity.token.issued')).toBe(1);
    expect(events.countByType('identity.token.reused')).toBe(1);
  });

  it('refresh token rotation: old used + new issued', () => {
    // Old refresh token (unused)
    const oldRefresh = TokenEntity.create({
      id: TokenIdVO.create(E2E_IDS.TOKEN),
      props: {
        userId: UserIdVO.create(E2E_IDS.USER),
        sessionId: SessionIdVO.create(E2E_IDS.SESSION),
        type: TokenTypeVO.refresh(),
        value: TokenValueVO.create(E2E_CONSTANTS.REFRESH_TOKEN),
        expiry: TokenExpiryVO.fromEpochSeconds(E2E_DATES.FAR_FUTURE_EPOCH),
        jti: E2E_CONSTANTS.JTI + '-1',
      },
      now: E2E_DATES.NOW,
    });

    // Verify can refresh
    const spec = new CanRefreshTokenSpecification();
    expect(spec.isSatisfiedBy({ token: oldRefresh })).toBe(true);

    // Mark old used
    oldRefresh.markUsed(E2E_DATES.NOW);
    oldRefresh.revoke('rotated', E2E_DATES.NOW);

    // New refresh token
    const newRefresh = TokenEntity.create({
      id: TokenIdVO.create(E2E_IDS.TOKEN_2),
      props: {
        userId: UserIdVO.create(E2E_IDS.USER),
        sessionId: SessionIdVO.create(E2E_IDS.SESSION),
        type: TokenTypeVO.refresh(),
        value: TokenValueVO.create(E2E_CONSTANTS.REFRESH_TOKEN + '2'),
        expiry: TokenExpiryVO.fromEpochSeconds(E2E_DATES.FAR_FUTURE_EPOCH),
        jti: E2E_CONSTANTS.JTI + '-2',
      },
      now: E2E_DATES.FUTURE,
    });

    // Old token now invalid
    expect(spec.isSatisfiedBy({ token: oldRefresh })).toBe(false);
    // New token valid
    expect(spec.isSatisfiedBy({ token: newRefresh })).toBe(true);
  });

  it('expired token cannot refresh', () => {
    const expired = TokenEntity.reconstitute({
      id: E2E_IDS.TOKEN,
      createdAt: E2E_DATES.PAST,
      updatedAt: E2E_DATES.PAST,
      props: {
        userId: UserIdVO.create(E2E_IDS.USER),
        sessionId: SessionIdVO.create(E2E_IDS.SESSION),
        type: TokenTypeVO.access(),
        value: TokenValueVO.create(E2E_CONSTANTS.ACCESS_TOKEN),
        expiry: TokenExpiryVO.fromEpochSeconds(E2E_DATES.PAST_EPOCH),
        jti: E2E_CONSTANTS.JTI,
      },
    });
    const spec = new CanRefreshTokenSpecification();
    expect(spec.isSatisfiedBy({ token: expired })).toBe(false);
    expect(spec.explain({ token: expired })).toContain('expired');
  });

  it('revoke all tokens for session', () => {
    const t1 = activeAccessToken();
    t1.pullDomainEvents();
    t1.revoke('session_revoked', E2E_DATES.NOW);
    expect(t1.isRevoked()).toBe(true);

    const events = t1.pullDomainEvents();
    expect(events.some((e) => e.type === 'identity.token.revoked')).toBe(true);
  });
});
