import { z } from 'zod';
import { CourierPublicSchema } from '@vubon/shared-schemas/logistics';
export type CourierResponseDTO = z.infer<typeof CourierPublicSchema>;
