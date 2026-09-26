import { z } from 'zod';
import { UpdateInventoryRequestSchema } from '@vubon/shared-schemas/business/product';

export type UpdateInventoryRequestDTO = z.infer<typeof UpdateInventoryRequestSchema>;
