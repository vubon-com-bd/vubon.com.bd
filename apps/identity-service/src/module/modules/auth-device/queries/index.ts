import {
  GetAuthDeviceHandler,
  ListAuthDevicesHandler,
} from '../../../application/queries/auth/index.js';

export const DEVICE_QUERY_HANDLERS = [
  GetAuthDeviceHandler,
  ListAuthDevicesHandler,
] as const;
