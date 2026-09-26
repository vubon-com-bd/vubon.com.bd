import { z } from 'zod';
import { ShipmentCreateInputSchema } from '@vubon/shared-schemas/logistics';

export type CreateShipmentRequestDTO = z.infer<typeof ShipmentCreateInputSchema>;
