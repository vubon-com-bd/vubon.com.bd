import { describe, it, expect, beforeEach } from '@jest/globals';
import { ListAuthLoginAttemptsHandler } from '@application/queries/auth/list-auth-login-attempts.handler.js';
import { ListAuthLoginAttemptsQuery } from '@application/queries/auth/list-auth-login-attempts.query.js';
import { makeAuthLoginAttemptServiceMock, TEST_EMAIL } from '@fixtures/index.js';

describe('ListAuthLoginAttemptsHandler', () => {
  let handler: ListAuthLoginAttemptsHandler;
  let service: ReturnType<typeof makeAuthLoginAttemptServiceMock>;

  beforeEach(() => {
    service = makeAuthLoginAttemptServiceMock();
    handler = new ListAuthLoginAttemptsHandler(service as never);
  });

  it('queryType = auth.list-login-attempts', () => {
    expect(handler.queryType).toBe('auth.list-login-attempts');
  });

  it('should delegate with window', async () => {
    service.listRecent.mockResolvedValue([]);
    await handler.execute(new ListAuthLoginAttemptsQuery(TEST_EMAIL, 300));
    expect(service.listRecent).toHaveBeenCalledWith(TEST_EMAIL, 300);
  });
});
