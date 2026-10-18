import { describe, it, expect, beforeEach } from '@jest/globals';
import { UpdatePreferencesHandler } from '@application/commands/user/update-preferences.handler.js';
import { UpdatePreferencesCommand } from '@application/commands/user/update-preferences.command.js';
import { makeUserPreferencesServiceMock, TEST_IDS } from '@fixtures/index.js';

describe('UpdatePreferencesHandler', () => {
  let handler: UpdatePreferencesHandler;
  let service: ReturnType<typeof makeUserPreferencesServiceMock>;

  beforeEach(() => {
    service = makeUserPreferencesServiceMock();
    service.update.mockResolvedValue({ userId: TEST_IDS.USER_ID } as never);
    handler = new UpdatePreferencesHandler(service as never);
  });

  it('commandType = user.update-preferences', () => { expect(handler.commandType).toBe('user.update-preferences'); });

  it('should call update', async () => {
    const cmd = new UpdatePreferencesCommand(TEST_IDS.USER_ID, { promotions: true } as never);
    await handler.execute(cmd);
    expect(service.update).toHaveBeenCalled();
  });
});
