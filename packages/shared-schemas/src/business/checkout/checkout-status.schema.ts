/**
 * Checkout Status Schema
 * @module shared-schemas/business/checkout
 *
 * Values আসে shared-constants/business/checkout-status.constants থেকে।
 */

import { z } from 'zod';
import { CHECKOUT_STATUS } from '@vubon/shared-constants/business';

export const CheckoutStatusSchema = z.enum(Object.values(CHECKOUT_STATUS) as [string, ...string[]]);

export type CheckoutStatusSchemaType = z.infer<typeof CheckoutStatusSchema>;
