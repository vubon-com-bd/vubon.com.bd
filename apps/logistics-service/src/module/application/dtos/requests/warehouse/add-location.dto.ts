import { z } from 'zod';

export const AddLocationRequestSchema = z.object({
  warehouseId: z.string().uuid(),
  code: z.string().min(2).max(50),
  name: z.string().max(100).optional(),
  type: z.enum(['bin', 'shelf', 'rack', 'zone', 'aisle', 'floor']),
  capacity: z.number().int().positive().optional(),
});

export type AddLocationRequestDTO = z.infer<typeof AddLocationRequestSchema>;
