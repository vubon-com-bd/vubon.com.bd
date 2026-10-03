/**
 * Payment Gateway Schema
 * @module shared-schemas/business/payment
 *
 * Values আসে shared-constants/business/payment-gateway.constants থেকে।
 */

import { z } from 'zod';
import {
  PAYMENT_GATEWAY,
  PAYMENT_GATEWAY_STATUS,
  PAYMENT_GATEWAY_ENV,
} from '@vubon/shared-constants/business';

export const PaymentGatewaySchema = z.enum(Object.values(PAYMENT_GATEWAY) as [string, ...string[]]);

export const PaymentGatewayStatusSchema = z.enum(
  Object.values(PAYMENT_GATEWAY_STATUS) as [string, ...string[]]
);

export const PaymentGatewayEnvSchema = z.enum(
  Object.values(PAYMENT_GATEWAY_ENV) as [string, ...string[]]
);

export type PaymentGatewaySchemaType = z.infer<typeof PaymentGatewaySchema>;
export type PaymentGatewayStatusSchemaType = z.infer<typeof PaymentGatewayStatusSchema>;
export type PaymentGatewayEnvSchemaType = z.infer<typeof PaymentGatewayEnvSchema>;
