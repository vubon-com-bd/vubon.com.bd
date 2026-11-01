import { describe, it, expect, beforeEach } from '@jest/globals';
import { UpdateSettingsHandler } from '@application/commands/user/update-settings.handler.js';
import { UpdateSettingsCommand } from '@application/commands/user/update-settings.command.js';
import { makeUserSettingsServiceMock, TEST_IDS } from '@fixtures/index.js';

describe('UpdateSettingsHandler', () => {
  let handler: UpdateSettingsHandler;
  let service: ReturnType<typeof makeUserSettingsServiceMock>;

  beforeEach(() => {
    service = makeUserSettingsServiceMock();
    service.update.mockResolvedValue({ userId: TEST_IDS.USER_ID } as never);
    handler = new UpdateSettingsHandler(service as never);
  });

  it('commandType = user.update-settings', () => { expect(handler.commandType).toBe('user.update-settings'); });

  it('should call service.update', async () => {
    const cmd = new UpdateSettingsCommand(TEST_IDS.USER_ID, { theme: 'dark' } as never);
    await handler.execute(cmd);
    expect(service.update).toHaveBeenCalled();
  });
});
