import { z } from 'zod';
import { WarehouseTypeSchema } from '@vubon/shared-schemas/logistics';

export const CreateWarehouseRequestSchema = z.object({
  code: z.string().min(2).max(20),
  name: z.string().min(2).max(100),
  type: WarehouseTypeSchema,
  division: z.string().optional(),
  district: z.string().optional(),
  address: z.string().max(500).optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  capacity: z.number().int().positive().optional(),
});

export type CreateWarehouseRequestDTO = z.infer<typeof CreateWarehouseRequestSchema>;
