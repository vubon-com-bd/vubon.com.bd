import { describe, it, expect, beforeEach } from '@jest/globals';
import { ListAuthSessionsHandler } from '@application/queries/auth/list-auth-sessions.handler.js';
import { makeListAuthSessionsQuery, makeAuthSessionServiceMock, TEST_IDS } from '@fixtures/index.js';

describe('ListAuthSessionsHandler', () => {
  let handler: ListAuthSessionsHandler;
  let service: ReturnType<typeof makeAuthSessionServiceMock>;

  beforeEach(() => {
    service = makeAuthSessionServiceMock();
    handler = new ListAuthSessionsHandler(service as never);
  });

  it('queryType = auth.list-sessions', () => {
    expect(handler.queryType).toBe('auth.list-sessions');
  });

  it('should return empty array', async () => {
    service.findActiveByUser.mockResolvedValue([]);
    const result = await handler.execute(makeListAuthSessionsQuery());
    expect(result).toEqual([]);
  });

  it('should delegate to service', async () => {
    service.findActiveByUser.mockResolvedValue([]);
    await handler.execute(makeListAuthSessionsQuery());
    expect(service.findActiveByUser).toHaveBeenCalledWith(TEST_IDS.USER_ID);
  });
});
