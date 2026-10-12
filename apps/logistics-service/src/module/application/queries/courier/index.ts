// queries/courier/index.ts
export * from './get-courier.query.js';
export * from './get-courier.handler.js';
export * from './list-couriers.query.js';
export * from './list-couriers.handler.js';
export * from './get-default-courier.query.js';
export * from './get-default-courier.handler.js';

import { GetCourierHandler } from './get-courier.handler.js';
import { ListCouriersHandler } from './list-couriers.handler.js';
import { GetDefaultCourierHandler } from './get-default-courier.handler.js';

export const COURIER_QUERY_HANDLERS = [
  GetCourierHandler, ListCouriersHandler, GetDefaultCourierHandler,
] as const;
