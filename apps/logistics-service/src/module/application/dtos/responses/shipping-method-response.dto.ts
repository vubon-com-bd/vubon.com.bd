import { z } from 'zod';
import { ShippingMethodSchema } from '@vubon/shared-schemas/logistics';

export type ShippingMethodResponseDTO = z.infer<typeof ShippingMethodSchema>;
