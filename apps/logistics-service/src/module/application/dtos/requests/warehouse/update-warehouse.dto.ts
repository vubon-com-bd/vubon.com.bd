import { z } from 'zod';

export const UpdateWarehouseRequestSchema = z.object({
  warehouseId: z.string().uuid(),
  name: z.string().min(2).max(100).optional(),
  address: z.string().max(500).optional(),
  capacity: z.number().int().positive().optional(),
});

export type UpdateWarehouseRequestDTO = z.infer<typeof UpdateWarehouseRequestSchema>;
