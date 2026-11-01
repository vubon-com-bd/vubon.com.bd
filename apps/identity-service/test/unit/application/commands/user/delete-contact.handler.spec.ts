import { describe, it, expect, beforeEach } from '@jest/globals';
import { DeleteContactHandler } from '@application/commands/user/delete-contact.handler.js';
import { DeleteContactCommand } from '@application/commands/user/delete-contact.command.js';
import { makeUserContactServiceMock, TEST_IDS } from '@fixtures/index.js';

describe('DeleteContactHandler', () => {
  let handler: DeleteContactHandler;
  let service: ReturnType<typeof makeUserContactServiceMock>;

  beforeEach(() => {
    service = makeUserContactServiceMock();
    service.remove.mockResolvedValue(undefined);
    handler = new DeleteContactHandler(service as never);
  });

  it('commandType = user.delete-contact', () => { expect(handler.commandType).toBe('user.delete-contact'); });

  it('should call remove', async () => {
    const cmd = new DeleteContactCommand({ contactId: TEST_IDS.CONTACT_ID } as never);
    const result = await handler.execute(cmd);
    expect(result.deleted).toBe(true);
  });
});
