/**
 * Device Command Handlers Barrel
 * @module notification-service/modules/device/commands
 */
import { RegisterDeviceHandler } from '@application/commands/device/register-device.handler.js';
import { UpdateDeviceTokenHandler } from '@application/commands/device/update-device-token.handler.js';
import { UnregisterDeviceHandler } from '@application/commands/device/unregister-device.handler.js';

export const DEVICE_COMMAND_HANDLERS = [
  RegisterDeviceHandler,
  UpdateDeviceTokenHandler,
  UnregisterDeviceHandler,
] as const;

export {
  RegisterDeviceHandler,
  UpdateDeviceTokenHandler,
  UnregisterDeviceHandler,
};
