import { describe, it, expect, beforeEach } from '@jest/globals';
import { UpdateContactHandler } from '@application/commands/user/update-contact.handler.js';
import { UpdateContactCommand } from '@application/commands/user/update-contact.command.js';
import { makeUserContactServiceMock, TEST_IDS } from '@fixtures/index.js';

describe('UpdateContactHandler', () => {
  let handler: UpdateContactHandler;
  let service: ReturnType<typeof makeUserContactServiceMock>;

  beforeEach(() => {
    service = makeUserContactServiceMock();
    service.update.mockResolvedValue({ id: TEST_IDS.CONTACT_ID } as never);
    handler = new UpdateContactHandler(service as never);
  });

  it('commandType = user.update-contact', () => { expect(handler.commandType).toBe('user.update-contact'); });

  it('should call update', async () => {
    const cmd = new UpdateContactCommand(TEST_IDS.CONTACT_ID, {} as never);
    await handler.execute(cmd);
    expect(service.update).toHaveBeenCalled();
  });
});
