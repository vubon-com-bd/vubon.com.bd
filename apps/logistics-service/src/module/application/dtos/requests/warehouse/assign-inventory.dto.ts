import { z } from 'zod';

export const AssignInventoryRequestSchema = z.object({
  warehouseId: z.string().uuid(),
  locationId: z.string().uuid(),
  productId: z.string().uuid(),
  quantity: z.number().int().positive(),
});

export type AssignInventoryRequestDTO = z.infer<typeof AssignInventoryRequestSchema>;
