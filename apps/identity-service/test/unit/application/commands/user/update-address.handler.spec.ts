import { describe, it, expect, beforeEach } from '@jest/globals';
import { UpdateAddressHandler } from '@application/commands/user/update-address.handler.js';
import { UpdateAddressCommand } from '@application/commands/user/update-address.command.js';
import { makeUserAddressServiceMock, TEST_IDS } from '@fixtures/index.js';

describe('UpdateAddressHandler', () => {
  let handler: UpdateAddressHandler;
  let service: ReturnType<typeof makeUserAddressServiceMock>;

  beforeEach(() => {
    service = makeUserAddressServiceMock();
    service.update.mockResolvedValue({ id: TEST_IDS.ADDRESS_ID } as never);
    handler = new UpdateAddressHandler(service as never);
  });

  it('commandType = user.update-address', () => { expect(handler.commandType).toBe('user.update-address'); });

  it('should call update', async () => {
    const cmd = new UpdateAddressCommand(TEST_IDS.ADDRESS_ID, { city: 'Dhaka' } as never);
    await handler.execute(cmd);
    expect(service.update).toHaveBeenCalled();
  });
});
