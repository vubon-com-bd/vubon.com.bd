import { GetInsuranceHandler } from './get-insurance.handler.js';
import { GetInsuranceByPolicyHandler } from './get-insurance-by-policy.handler.js';
import { GetInsuranceByShipmentHandler } from './get-insurance-by-shipment.handler.js';
import { ListInsurancesHandler } from './list-insurances.handler.js';
import { ListInsurancesByOrderHandler } from './list-insurances-by-order.handler.js';
import { ListInsurancesByUserHandler } from './list-insurances-by-user.handler.js';
import { ListClaimableInsurancesHandler } from './list-claimable-insurances.handler.js';
import { ListExpiringInsurancesHandler } from './list-expiring-insurances.handler.js';
import { GetInsuranceStatsHandler } from './get-insurance-stats.handler.js';

export const INSURANCE_QUERY_HANDLERS = [
  GetInsuranceHandler,
  GetInsuranceByPolicyHandler,
  GetInsuranceByShipmentHandler,
  ListInsurancesHandler,
  ListInsurancesByOrderHandler,
  ListInsurancesByUserHandler,
  ListClaimableInsurancesHandler,
  ListExpiringInsurancesHandler,
  GetInsuranceStatsHandler,
] as const;
