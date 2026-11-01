/**
 * Payment Gateway Query Handlers — Barrel
 * @module payment-service/modules/payment-gateway/queries
 */
import { ListGatewaysHandler } from '@application/queries/gateway/list-gateways.handler';
import { GetGatewayHealthHandler } from '@application/queries/gateway/get-gateway-health.handler';

export const PAYMENT_GATEWAY_QUERY_HANDLERS = [
  ListGatewaysHandler,
  GetGatewayHealthHandler,
] as const;
