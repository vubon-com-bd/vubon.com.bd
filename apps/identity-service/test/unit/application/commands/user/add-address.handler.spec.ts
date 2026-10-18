import { describe, it, expect, beforeEach } from '@jest/globals';
import { AddAddressHandler } from '@application/commands/user/add-address.handler.js';
import { AddAddressCommand } from '@application/commands/user/add-address.command.js';
import { makeUserAddressServiceMock, TEST_IDS } from '@fixtures/index.js';

describe('AddAddressHandler', () => {
  let handler: AddAddressHandler;
  let service: ReturnType<typeof makeUserAddressServiceMock>;

  beforeEach(() => {
    service = makeUserAddressServiceMock();
    service.add.mockResolvedValue({ userId: TEST_IDS.USER_ID, id: 'new-addr' } as never);
    handler = new AddAddressHandler(service as never);
  });

  it('commandType = user.add-address', () => { expect(handler.commandType).toBe('user.add-address'); });

  it('should call service.add', async () => {
    const cmd = new AddAddressCommand(TEST_IDS.USER_ID, {} as never);
    await handler.execute(cmd);
    expect(service.add).toHaveBeenCalled();
  });
});
