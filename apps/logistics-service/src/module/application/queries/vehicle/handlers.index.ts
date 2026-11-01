import { GetVehicleHandler } from './get-vehicle.handler.js';
import { GetVehicleByRegistrationHandler } from './get-vehicle-by-registration.handler.js';
import { ListVehiclesHandler } from './list-vehicles.handler.js';
import { ListAvailableVehiclesHandler } from './list-available-vehicles.handler.js';
import { ListVehiclesByWarehouseHandler } from './list-vehicles-by-warehouse.handler.js';
import { ListVehiclesByDriverHandler } from './list-vehicles-by-driver.handler.js';
import { GetVehicleStatsHandler } from './get-vehicle-stats.handler.js';

export const VEHICLE_QUERY_HANDLERS = [
  GetVehicleHandler,
  GetVehicleByRegistrationHandler,
  ListVehiclesHandler,
  ListAvailableVehiclesHandler,
  ListVehiclesByWarehouseHandler,
  ListVehiclesByDriverHandler,
  GetVehicleStatsHandler,
] as const;
