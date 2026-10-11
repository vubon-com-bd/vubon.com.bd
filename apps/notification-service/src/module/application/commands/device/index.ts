// commands/device/index.ts
export * from './register-device.command.js';
export * from './register-device.handler.js';
export * from './update-device.command.js';
export * from './update-device.handler.js';
export * from './refresh-device-token.command.js';
export * from './refresh-device-token.handler.js';
export * from './remove-device.command.js';
export * from './remove-device.handler.js';
export * from './block-device.command.js';
export * from './block-device.handler.js';

import { RegisterDeviceHandler } from './register-device.handler.js';
import { UpdateDeviceHandler } from './update-device.handler.js';
import { RefreshDeviceTokenHandler } from './refresh-device-token.handler.js';
import { RemoveDeviceHandler } from './remove-device.handler.js';
import { BlockDeviceHandler } from './block-device.handler.js';

export const DEVICE_COMMAND_HANDLERS = [
  RegisterDeviceHandler,
  UpdateDeviceHandler,
  RefreshDeviceTokenHandler,
  RemoveDeviceHandler,
  BlockDeviceHandler,
] as const;
