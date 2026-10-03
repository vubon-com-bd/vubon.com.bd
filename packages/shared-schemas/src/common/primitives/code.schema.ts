/**
 * Code Schema
 * @module shared-schemas/common/primitives
 */

import { z } from 'zod';

export const CodeSchema = z
  .string()
  .trim()
  .toUpperCase()
  .min(2, 'Code is too short')
  .max(32, 'Code is too long')
  .regex(/^[A-Z0-9_-]+$/, 'Code can only contain uppercase letters, numbers, hyphen, underscore');

export const CouponCodeSchema = CodeSchema;
export const ReferralCodeSchema = CodeSchema;

export type CodeSchemaType = z.infer<typeof CodeSchema>;
export type CouponCodeSchemaType = z.infer<typeof CouponCodeSchema>;
