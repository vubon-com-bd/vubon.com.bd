import { CreateVehicleHandler } from './create-vehicle.handler.js';
import { UpdateVehicleHandler } from './update.handler.js';
import { AssignVehicleHandler } from './assign.handler.js';
import { ReleaseVehicleHandler } from './release.handler.js';
import { StartMaintenanceVehicleHandler } from './start-maintenance.handler.js';
import { CompleteMaintenanceVehicleHandler } from './complete-maintenance.handler.js';
import { RetireVehicleHandler } from './retire.handler.js';
import { AssignDriverVehicleHandler } from './assign-driver.handler.js';
import { UnassignDriverVehicleHandler } from './unassign-driver.handler.js';

export const VEHICLE_COMMAND_HANDLERS = [
  CreateVehicleHandler,
  UpdateVehicleHandler,
  AssignVehicleHandler,
  ReleaseVehicleHandler,
  StartMaintenanceVehicleHandler,
  CompleteMaintenanceVehicleHandler,
  RetireVehicleHandler,
  AssignDriverVehicleHandler,
  UnassignDriverVehicleHandler,
] as const;
