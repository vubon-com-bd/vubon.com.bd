import { describe, it, expect, beforeEach } from '@jest/globals';
import { GetAuthSessionHandler } from '@application/queries/auth/get-auth-session.handler.js';
import { makeGetAuthSessionQuery, makeAuthSessionServiceMock, TEST_IDS } from '@fixtures/index.js';
import { SessionNotFoundError } from '@domain/errors/session.errors.js';

describe('GetAuthSessionHandler', () => {
  let handler: GetAuthSessionHandler;
  let service: ReturnType<typeof makeAuthSessionServiceMock>;

  beforeEach(() => {
    service = makeAuthSessionServiceMock();
    handler = new GetAuthSessionHandler(service as never);
  });

  it('queryType = auth.get-session', () => {
    expect(handler.queryType).toBe('auth.get-session');
  });

  it('should throw when not found', async () => {
    service.findById.mockResolvedValue(null);
    await expect(handler.execute(makeGetAuthSessionQuery())).rejects.toThrow(SessionNotFoundError);
  });

  it('should return session DTO when found', async () => {
    const dto = { id: TEST_IDS.SESSION_ID, userId: TEST_IDS.USER_ID, status: 'active',
      createdAt: '', lastAccessedAt: '', expiresAt: '', isCurrent: false };
    service.findById.mockResolvedValue(dto as never);
    const result = await handler.execute(makeGetAuthSessionQuery());
    expect(result.id).toBe(TEST_IDS.SESSION_ID);
  });
});
