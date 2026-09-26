import { z } from 'zod';
import { CourierSchema } from '@vubon/shared-schemas/logistics';

export type CourierResponseDTO = z.infer<typeof CourierSchema>;
