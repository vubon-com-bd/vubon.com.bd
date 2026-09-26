import { z } from 'zod';
import { ShippingMethodPublicSchema } from '@vubon/shared-schemas/logistics';
export type ShippingMethodResponseDTO = z.infer<typeof ShippingMethodPublicSchema>;
