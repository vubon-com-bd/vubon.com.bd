/**
 * Apply Voucher Request Schema
 * @module shared-schemas/business/cart/requests
 */

import { z } from 'zod';

export const ApplyVoucherRequestSchema = z
  .object({
    code: z.string().trim().toUpperCase().min(8).max(32),
  })
  .strict();

export const RemoveVoucherRequestSchema = z
  .object({
    voucherId: z.string().min(1),
  })
  .strict();

export type ApplyVoucherRequestSchemaType = z.infer<typeof ApplyVoucherRequestSchema>;
export type RemoveVoucherRequestSchemaType = z.infer<typeof RemoveVoucherRequestSchema>;
