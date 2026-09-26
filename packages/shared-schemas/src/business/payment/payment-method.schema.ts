/**
 * Payment Method Schema
 * @module shared-schemas/business/payment
 *
 * Values আসে shared-constants/business/payment-method.constants থেকে।
 */

import { z } from 'zod';
import { PAYMENT_METHOD, PAYMENT_METHOD_TYPE } from '@vubon/shared-constants/business';

export const PaymentMethodSchema = z.enum(Object.values(PAYMENT_METHOD) as [string, ...string[]]);

export const PaymentMethodTypeSchema = z.enum(
  Object.values(PAYMENT_METHOD_TYPE) as [string, ...string[]]
);

export type PaymentMethodSchemaType = z.infer<typeof PaymentMethodSchema>;
export type PaymentMethodTypeSchemaType = z.infer<typeof PaymentMethodTypeSchema>;
