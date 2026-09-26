import { z } from 'zod';
import { DeliverySchema } from '@vubon/shared-schemas/logistics';

export type DeliveryResponseDTO = z.infer<typeof DeliverySchema>;
