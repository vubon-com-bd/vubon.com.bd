// queries/insurance/index.ts
export * from './get-insurance.query.js'; export * from './get-insurance.handler.js';
export * from './get-insurance-by-shipment.query.js'; export * from './get-insurance-by-shipment.handler.js';
export * from './list-insurances.query.js'; export * from './list-insurances.handler.js';

import { GetInsuranceHandler } from './get-insurance.handler.js';
import { GetInsuranceByShipmentHandler } from './get-insurance-by-shipment.handler.js';
import { ListInsurancesHandler } from './list-insurances.handler.js';

export const INSURANCE_QUERY_HANDLERS = [
  GetInsuranceHandler, GetInsuranceByShipmentHandler, ListInsurancesHandler,
] as const;
