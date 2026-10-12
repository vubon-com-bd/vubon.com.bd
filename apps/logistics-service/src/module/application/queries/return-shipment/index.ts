// queries/return-shipment/index.ts
export * from './get-return-shipment.query.js'; export * from './get-return-shipment.handler.js';
export * from './get-return-by-rma.query.js'; export * from './get-return-by-rma.handler.js';
export * from './list-return-shipments.query.js'; export * from './list-return-shipments.handler.js';

import { GetReturnShipmentHandler } from './get-return-shipment.handler.js';
import { GetReturnByRmaHandler } from './get-return-by-rma.handler.js';
import { ListReturnShipmentsHandler } from './list-return-shipments.handler.js';

export const RETURN_SHIPMENT_QUERY_HANDLERS = [
  GetReturnShipmentHandler, GetReturnByRmaHandler, ListReturnShipmentsHandler,
] as const;
