// queries/device/index.ts
export * from './get-device.query.js';
export * from './get-device.handler.js';
export * from './list-devices.query.js';
export * from './list-devices.handler.js';
export * from './list-active-devices.query.js';
export * from './list-active-devices.handler.js';

import { GetDeviceHandler } from './get-device.handler.js';
import { ListDevicesHandler } from './list-devices.handler.js';
import { ListActiveDevicesHandler } from './list-active-devices.handler.js';

export const DEVICE_QUERY_HANDLERS = [
  GetDeviceHandler,
  ListDevicesHandler,
  ListActiveDevicesHandler,
] as const;
