/**
 * Remove Voucher Request DTO
 * @module cart-service/application/dtos/requests/voucher
 */
import { z } from 'zod';

export const RemoveVoucherRequestSchema = z
  .object({
    cartId: z.string().uuid(),
    code: z.string().trim().toUpperCase().min(8).max(32),
  })
  .strict();

export type RemoveVoucherRequestDTO = z.infer<typeof RemoveVoucherRequestSchema>;
