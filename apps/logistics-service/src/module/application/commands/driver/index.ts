// commands/driver/index.ts
export * from './register-driver.command.js'; export * from './register-driver.handler.js';
export * from './update-driver.command.js'; export * from './update-driver.handler.js';
export * from './set-driver-status.command.js'; export * from './set-driver-status.handler.js';
export * from './assign-driver-vehicle.command.js'; export * from './assign-driver-vehicle.handler.js';
export * from './receive-driver-cash.command.js'; export * from './receive-driver-cash.handler.js';
export * from './remit-driver-cash.command.js'; export * from './remit-driver-cash.handler.js';

import { RegisterDriverHandler } from './register-driver.handler.js';
import { UpdateDriverHandler } from './update-driver.handler.js';
import { SetDriverStatusHandler } from './set-driver-status.handler.js';
import { AssignDriverVehicleHandler } from './assign-driver-vehicle.handler.js';
import { ReceiveDriverCashHandler } from './receive-driver-cash.handler.js';
import { RemitDriverCashHandler } from './remit-driver-cash.handler.js';

export const DRIVER_COMMAND_HANDLERS = [
  RegisterDriverHandler, UpdateDriverHandler, SetDriverStatusHandler,
  AssignDriverVehicleHandler, ReceiveDriverCashHandler, RemitDriverCashHandler,
] as const;
