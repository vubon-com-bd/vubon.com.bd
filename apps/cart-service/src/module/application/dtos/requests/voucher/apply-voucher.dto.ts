/**
 * Apply Voucher Request DTO
 * @module cart-service/application/dtos/requests/voucher
 */
import { z } from 'zod';

export const ApplyVoucherRequestSchema = z
  .object({
    cartId: z.string().uuid(),
    code: z.string().trim().toUpperCase().min(8).max(32),
    idempotencyKey: z.string().min(16).max(128).optional(),
  })
  .strict();

export type ApplyVoucherRequestDTO = z.infer<typeof ApplyVoucherRequestSchema>;
