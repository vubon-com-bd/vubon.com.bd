import { z } from 'zod';
import { WarehouseSchema } from '@vubon/shared-schemas/logistics';

export type WarehouseResponseDTO = z.infer<typeof WarehouseSchema>;
