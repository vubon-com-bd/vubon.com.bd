import { describe, it, expect, beforeEach } from '@jest/globals';
import { AddContactHandler } from '@application/commands/user/add-contact.handler.js';
import { AddContactCommand } from '@application/commands/user/add-contact.command.js';
import { makeUserContactServiceMock, TEST_IDS } from '@fixtures/index.js';

describe('AddContactHandler', () => {
  let handler: AddContactHandler;
  let service: ReturnType<typeof makeUserContactServiceMock>;

  beforeEach(() => {
    service = makeUserContactServiceMock();
    service.add.mockResolvedValue({ id: 'c1' } as never);
    handler = new AddContactHandler(service as never);
  });

  it('commandType = user.add-contact', () => { expect(handler.commandType).toBe('user.add-contact'); });

  it('should call add', async () => {
    const cmd = new AddContactCommand(TEST_IDS.USER_ID, {} as never);
    await handler.execute(cmd);
    expect(service.add).toHaveBeenCalled();
  });
});
