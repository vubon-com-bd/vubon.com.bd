import { describe, it, expect, beforeEach } from '@jest/globals';
import { GetUserPreferencesHandler } from '@application/queries/user/get-user-preferences.handler.js';
import { GetUserPreferencesQuery } from '@application/queries/user/get-user-preferences.query.js';
import { makeUserPreferencesServiceMock, TEST_IDS } from '@fixtures/index.js';

describe('GetUserPreferencesHandler', () => {
  let handler: GetUserPreferencesHandler;
  let service: ReturnType<typeof makeUserPreferencesServiceMock>;

  beforeEach(() => {
    service = makeUserPreferencesServiceMock();
    handler = new GetUserPreferencesHandler(service as never);
  });

  it('queryType = user.get-preferences', () => {
    expect(handler.queryType).toBe('user.get-preferences');
  });

  it('should return null', async () => {
    service.findForUser.mockResolvedValue(null);
    const result = await handler.execute(new GetUserPreferencesQuery(TEST_IDS.USER_ID));
    expect(result).toBeNull();
  });
});
