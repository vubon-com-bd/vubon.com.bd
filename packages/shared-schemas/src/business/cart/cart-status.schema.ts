/**
 * Cart Status Schema
 * @module shared-schemas/business/cart
 *
 * Values আসে shared-constants/business/cart-status.constants থেকে।
 */

import { z } from 'zod';
import { CART_STATUS } from '@vubon/shared-constants/business';

export const CartStatusSchema = z.enum(Object.values(CART_STATUS) as [string, ...string[]]);

export type CartStatusSchemaType = z.infer<typeof CartStatusSchema>;
