import { describe, it, expect, beforeEach } from '@jest/globals';
import { GetUserSettingsHandler } from '@application/queries/user/get-user-settings.handler.js';
import { GetUserSettingsQuery } from '@application/queries/user/get-user-settings.query.js';
import { makeUserSettingsServiceMock, TEST_IDS } from '@fixtures/index.js';

describe('GetUserSettingsHandler', () => {
  let handler: GetUserSettingsHandler;
  let service: ReturnType<typeof makeUserSettingsServiceMock>;

  beforeEach(() => {
    service = makeUserSettingsServiceMock();
    handler = new GetUserSettingsHandler(service as never);
  });

  it('queryType = user.get-settings', () => {
    expect(handler.queryType).toBe('user.get-settings');
  });

  it('should return null when none', async () => {
    service.findForUser.mockResolvedValue(null);
    const result = await handler.execute(new GetUserSettingsQuery(TEST_IDS.USER_ID));
    expect(result).toBeNull();
  });
});
