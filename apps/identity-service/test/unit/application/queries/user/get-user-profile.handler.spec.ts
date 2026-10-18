import { describe, it, expect, beforeEach } from '@jest/globals';
import { GetUserProfileHandler } from '@application/queries/user/get-user-profile.handler.js';
import { makeGetUserProfileQuery, makeUserProfileServiceMock, TEST_IDS } from '@fixtures/index.js';

describe('GetUserProfileHandler', () => {
  let handler: GetUserProfileHandler;
  let service: ReturnType<typeof makeUserProfileServiceMock>;

  beforeEach(() => {
    service = makeUserProfileServiceMock();
    handler = new GetUserProfileHandler(service as never);
  });

  it('queryType = user.get-profile', () => {
    expect(handler.queryType).toBe('user.get-profile');
  });

  it('should return null when not found', async () => {
    service.findForUser.mockResolvedValue(null);
    const result = await handler.execute(makeGetUserProfileQuery());
    expect(result).toBeNull();
  });

  it('should return profile when found', async () => {
    service.findForUser.mockResolvedValue({ userId: TEST_IDS.USER_ID } as never);
    const result = await handler.execute(makeGetUserProfileQuery());
    expect(result?.userId).toBe(TEST_IDS.USER_ID);
  });
});
