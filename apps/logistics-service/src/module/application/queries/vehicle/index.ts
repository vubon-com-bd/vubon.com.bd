// queries/vehicle/index.ts
export * from './get-vehicle.query.js'; export * from './get-vehicle.handler.js';
export * from './list-vehicles.query.js'; export * from './list-vehicles.handler.js';

import { GetVehicleHandler } from './get-vehicle.handler.js';
import { ListVehiclesHandler } from './list-vehicles.handler.js';

export const VEHICLE_QUERY_HANDLERS = [GetVehicleHandler, ListVehiclesHandler] as const;
