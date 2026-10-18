import { describe, it, expect, beforeEach } from '@jest/globals';
import { AuthTokenService } from '@application/services/impl/auth-token.service.js';
import { makeTokenRepositoryMock, makeEventBridgeMock, TEST_IDS } from '@fixtures/index.js';

describe('AuthTokenService', () => {
  let service: AuthTokenService;
  let repo: ReturnType<typeof makeTokenRepositoryMock>;
  let eventBridge: ReturnType<typeof makeEventBridgeMock>;

  beforeEach(() => {
    repo = makeTokenRepositoryMock();
    eventBridge = makeEventBridgeMock();
    eventBridge.publishFromEntity.mockResolvedValue(undefined);
    service = new AuthTokenService(repo as never, eventBridge as never);
  });

  it('name', () => expect(service.name).toBe('AuthTokenService'));

  it('issue() should return tokens', async () => {
    const result = await service.issue({ userId: TEST_IDS.USER_ID, sessionId: TEST_IDS.SESSION_ID });
    expect(result.accessToken).toBeDefined();
    expect(result.refreshToken).toBeDefined();
    expect(result.tokenType).toBe('Bearer');
  });

  it('verify() should return null (stub)', async () => {
    const result = await service.verify('some-token');
    expect(result).toBeNull();
  });

  it('revoke() should not throw when token missing', async () => {
    repo.findById.mockResolvedValue(null);
    await service.revoke(TEST_IDS.TOKEN_ID, 'test');
  });

  it('revokeAllForUser() should delegate', async () => {
    repo.revokeAllByUserId.mockResolvedValue(3);
    const count = await service.revokeAllForUser(TEST_IDS.USER_ID, 'bulk');
    expect(count).toBe(3);
  });
});
