import { GetDriverHandler } from './get-driver.handler.js';
import { GetDriverByLicenseHandler } from './get-driver-by-license.handler.js';
import { GetDriverByPhoneHandler } from './get-driver-by-phone.handler.js';
import { ListDriversHandler } from './list-drivers.handler.js';
import { ListAvailableDriversHandler } from './list-available-drivers.handler.js';
import { ListDriversByWarehouseHandler } from './list-drivers-by-warehouse.handler.js';
import { GetDriverStatsHandler } from './get-driver-stats.handler.js';

export const DRIVER_QUERY_HANDLERS = [
  GetDriverHandler,
  GetDriverByLicenseHandler,
  GetDriverByPhoneHandler,
  ListDriversHandler,
  ListAvailableDriversHandler,
  ListDriversByWarehouseHandler,
  GetDriverStatsHandler,
] as const;
