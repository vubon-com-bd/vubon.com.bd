// commands/vehicle/index.ts
export * from './register-vehicle.command.js'; export * from './register-vehicle.handler.js';
export * from './update-vehicle.command.js'; export * from './update-vehicle.handler.js';
export * from './set-vehicle-status.command.js'; export * from './set-vehicle-status.handler.js';
export * from './assign-vehicle-driver.command.js'; export * from './assign-vehicle-driver.handler.js';
export * from './update-vehicle-mileage.command.js'; export * from './update-vehicle-mileage.handler.js';

import { RegisterVehicleHandler } from './register-vehicle.handler.js';
import { UpdateVehicleHandler } from './update-vehicle.handler.js';
import { SetVehicleStatusHandler } from './set-vehicle-status.handler.js';
import { AssignVehicleDriverHandler } from './assign-vehicle-driver.handler.js';
import { UpdateVehicleMileageHandler } from './update-vehicle-mileage.handler.js';

export const VEHICLE_COMMAND_HANDLERS = [
  RegisterVehicleHandler, UpdateVehicleHandler, SetVehicleStatusHandler,
  AssignVehicleDriverHandler, UpdateVehicleMileageHandler,
] as const;
