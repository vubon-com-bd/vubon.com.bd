import { z } from 'zod';
import { FulfillmentPublicSchema } from '@vubon/shared-schemas/logistics';
export type FulfillmentResponseDTO = z.infer<typeof FulfillmentPublicSchema>;
