import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { RegisterDeviceHandler } from '../../../../src/module/application/commands/device/register-device.handler.js';
import { RegisterDeviceCommand } from '../../../../src/module/application/commands/device/register-device.command.js';
import { UpdateDeviceHandler } from '../../../../src/module/application/commands/device/update-device.handler.js';
import { UpdateDeviceCommand } from '../../../../src/module/application/commands/device/update-device.command.js';
import { RefreshDeviceTokenHandler } from '../../../../src/module/application/commands/device/refresh-device-token.handler.js';
import { RefreshDeviceTokenCommand } from '../../../../src/module/application/commands/device/refresh-device-token.command.js';
import { RemoveDeviceHandler } from '../../../../src/module/application/commands/device/remove-device.handler.js';
import { RemoveDeviceCommand } from '../../../../src/module/application/commands/device/remove-device.command.js';
import { BlockDeviceHandler } from '../../../../src/module/application/commands/device/block-device.handler.js';
import { BlockDeviceCommand } from '../../../../src/module/application/commands/device/block-device.command.js';

function mockSvc() {
  const r = jest.fn().mockResolvedValue({ id: 'd-1' });
  return {
    register: r, update: r, refreshToken: r,
    remove: jest.fn().mockResolvedValue(undefined), block: r,
  } as never;
}

describe('Device command handlers', () => {
  let svc: ReturnType<typeof mockSvc>;
  beforeEach(() => { svc = mockSvc(); });
  it('RegisterDeviceHandler', async () => {
    await new RegisterDeviceHandler(svc).execute(new RegisterDeviceCommand({
      userId: 'u', type: 'android', token: 'abcdefghijklmnop1234',
    } as never));
    expect(svc.register).toHaveBeenCalled();
  });
  it('UpdateDeviceHandler', async () => {
    await new UpdateDeviceHandler(svc).execute(new UpdateDeviceCommand({ deviceId: 'd-1' } as never));
    expect(svc.update).toHaveBeenCalled();
  });
  it('RefreshDeviceTokenHandler', async () => {
    await new RefreshDeviceTokenHandler(svc).execute(new RefreshDeviceTokenCommand({
      deviceId: 'd-1', newToken: 'abcdefghijklmnop1234',
    } as never));
    expect(svc.refreshToken).toHaveBeenCalled();
  });
  it('RemoveDeviceHandler', async () => {
    await new RemoveDeviceHandler(svc).execute(new RemoveDeviceCommand({ deviceId: 'd-1' } as never));
    expect(svc.remove).toHaveBeenCalled();
  });
  it('BlockDeviceHandler', async () => {
    await new BlockDeviceHandler(svc).execute(new BlockDeviceCommand({ deviceId: 'd-1', reason: 'abuse' } as never));
    expect(svc.block).toHaveBeenCalled();
  });
});
