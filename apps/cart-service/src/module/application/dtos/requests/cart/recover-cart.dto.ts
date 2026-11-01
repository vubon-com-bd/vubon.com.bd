/**
 * Recover Cart Request DTO
 * @module cart-service/application/dtos/requests/cart
 *
 * Recovery of an abandoned cart — triggers recovery notification.
 */
import { z } from 'zod';

export const RecoverCartRequestSchema = z
  .object({
    abandonedCartId: z.string().uuid(),
    orderId: z.string().uuid().optional(),
    recoveryDiscountPercent: z.number().min(0).max(100).optional(),
    sendNotification: z.boolean().optional().default(true),
  })
  .strict();

export type RecoverCartRequestDTO = z.infer<typeof RecoverCartRequestSchema>;
