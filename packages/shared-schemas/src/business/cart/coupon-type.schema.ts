/**
 * Coupon Type Schema
 * @module shared-schemas/business/cart
 *
 * Values আসে shared-constants/business/coupon-type.constants থেকে।
 */

import { z } from 'zod';
import { COUPON_TYPE } from '@vubon/shared-constants/business';

export const CouponTypeSchema = z.enum(Object.values(COUPON_TYPE) as [string, ...string[]]);

export type CouponTypeSchemaType = z.infer<typeof CouponTypeSchema>;
