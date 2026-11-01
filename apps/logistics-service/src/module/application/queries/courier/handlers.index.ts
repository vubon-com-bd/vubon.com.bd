import { GetCourierHandler } from './get-courier.handler.js';
import { GetCourierPublicHandler } from './get-courier-public.handler.js';
import { GetCourierByCodeHandler } from './get-courier-by-code.handler.js';
import { ListCouriersHandler } from './list-couriers.handler.js';
import { ListOperationalCouriersHandler } from './list-operational-couriers.handler.js';
import { ListCouriersByZoneHandler } from './list-couriers-by-zone.handler.js';
import { GetDefaultCourierHandler } from './get-default-courier.handler.js';
import { GetCourierStatsHandler } from './get-courier-stats.handler.js';

export const COURIER_QUERY_HANDLERS = [
  GetCourierHandler,
  GetCourierPublicHandler,
  GetCourierByCodeHandler,
  ListCouriersHandler,
  ListOperationalCouriersHandler,
  ListCouriersByZoneHandler,
  GetDefaultCourierHandler,
  GetCourierStatsHandler,
] as const;
