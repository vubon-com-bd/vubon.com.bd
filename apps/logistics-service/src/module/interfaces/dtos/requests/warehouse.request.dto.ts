import { z } from 'zod';

export const CreateWarehouseRequestSchema = z.object({
  code: z.string().min(2).max(20),
  name: z.string().min(2).max(100),
  type: z.string().min(1),
  division: z.string().optional(),
  district: z.string().optional(),
  address: z.string().max(500).optional(),
  capacity: z.number().int().positive().optional(),
});

export type CreateWarehouseRequestDTO = z.infer<typeof CreateWarehouseRequestSchema>;
