import { z } from 'zod';
import { ReturnShipmentCreateInputSchema } from '@vubon/shared-schemas/logistics';

export type RequestReturnRequestDTO = z.infer<typeof ReturnShipmentCreateInputSchema>;
