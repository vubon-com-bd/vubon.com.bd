import { z } from 'zod';
import { FulfillmentSchema } from '@vubon/shared-schemas/logistics';

export type FulfillmentResponseDTO = z.infer<typeof FulfillmentSchema>;
