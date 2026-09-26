import { z } from 'zod';
import { ShipmentPublicSchema } from '@vubon/shared-schemas/logistics';

export type ShipmentPublicResponseDTO = z.infer<typeof ShipmentPublicSchema>;
