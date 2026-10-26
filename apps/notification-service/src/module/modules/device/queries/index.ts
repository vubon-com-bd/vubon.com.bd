/**
 * Device Query Handlers Barrel
 * @module notification-service/modules/device/queries
 */
import { GetDeviceHandler } from '@application/queries/device/get-device.handler.js';
import { ListDevicesHandler } from '@application/queries/device/list-devices.handler.js';

export const DEVICE_QUERY_HANDLERS = [
  GetDeviceHandler,
  ListDevicesHandler,
] as const;

export { GetDeviceHandler, ListDevicesHandler };
