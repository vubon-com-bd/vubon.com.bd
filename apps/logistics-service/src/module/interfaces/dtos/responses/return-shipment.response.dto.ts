import { z } from 'zod';
import { ReturnShipmentPublicSchema } from '@vubon/shared-schemas/logistics';
export type ReturnShipmentResponseDTO = z.infer<typeof ReturnShipmentPublicSchema>;
