/**
 * Payment Status Schema
 * @module shared-schemas/business/payment
 *
 * Values আসে shared-constants/business/payment-status.constants থেকে।
 */

import { z } from 'zod';
import { PAYMENT_STATUS } from '@vubon/shared-constants/business';

export const PaymentStatusSchema = z.enum(Object.values(PAYMENT_STATUS) as [string, ...string[]]);

export type PaymentStatusSchemaType = z.infer<typeof PaymentStatusSchema>;
