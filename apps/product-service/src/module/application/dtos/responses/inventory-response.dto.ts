import { z } from 'zod';
import { InventorySchema } from '@vubon/shared-schemas/business/product';

export type InventoryResponseDTO = z.infer<typeof InventorySchema>;
