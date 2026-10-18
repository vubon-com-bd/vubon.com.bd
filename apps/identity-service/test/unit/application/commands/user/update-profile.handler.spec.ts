import { describe, it, expect, beforeEach } from '@jest/globals';
import { UpdateProfileHandler } from '@application/commands/user/update-profile.handler.js';
import { UpdateProfileCommand } from '@application/commands/user/update-profile.command.js';
import { makeUserProfileServiceMock, TEST_IDS } from '@fixtures/index.js';

describe('UpdateProfileHandler', () => {
  let handler: UpdateProfileHandler;
  let service: ReturnType<typeof makeUserProfileServiceMock>;

  beforeEach(() => {
    service = makeUserProfileServiceMock();
    service.upsert.mockResolvedValue({ userId: TEST_IDS.USER_ID } as never);
    handler = new UpdateProfileHandler(service as never);
  });

  it('commandType = user.update-profile', () => { expect(handler.commandType).toBe('user.update-profile'); });

  it('should call service.upsert', async () => {
    const cmd = new UpdateProfileCommand(TEST_IDS.USER_ID, { bio: 'x' } as never);
    await handler.execute(cmd);
    expect(service.upsert).toHaveBeenCalledWith(TEST_IDS.USER_ID, expect.anything());
  });
});
