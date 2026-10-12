// queries/driver/index.ts
export * from './get-driver.query.js'; export * from './get-driver.handler.js';
export * from './list-drivers.query.js'; export * from './list-drivers.handler.js';

import { GetDriverHandler } from './get-driver.handler.js';
import { ListDriversHandler } from './list-drivers.handler.js';

export const DRIVER_QUERY_HANDLERS = [GetDriverHandler, ListDriversHandler] as const;
