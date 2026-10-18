import { describe, it, expect, beforeEach } from '@jest/globals';
import { DeleteAddressHandler } from '@application/commands/user/delete-address.handler.js';
import { DeleteAddressCommand } from '@application/commands/user/delete-address.command.js';
import { makeUserAddressServiceMock, TEST_IDS } from '@fixtures/index.js';

describe('DeleteAddressHandler', () => {
  let handler: DeleteAddressHandler;
  let service: ReturnType<typeof makeUserAddressServiceMock>;

  beforeEach(() => {
    service = makeUserAddressServiceMock();
    service.remove.mockResolvedValue(undefined);
    handler = new DeleteAddressHandler(service as never);
  });

  it('commandType = user.delete-address', () => { expect(handler.commandType).toBe('user.delete-address'); });

  it('should call remove', async () => {
    const cmd = new DeleteAddressCommand({ addressId: TEST_IDS.ADDRESS_ID } as never);
    const result = await handler.execute(cmd);
    expect(result.deleted).toBe(true);
  });
});
