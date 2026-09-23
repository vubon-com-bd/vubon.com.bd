import { z } from 'zod';
import { WarehousePublicSchema } from '@vubon/shared-schemas/logistics';
export type WarehouseResponseDTO = z.infer<typeof WarehousePublicSchema>;
