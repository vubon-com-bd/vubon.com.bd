import { z } from 'zod';
import { TrackingPublicSchema } from '@vubon/shared-schemas/logistics';
export type TrackingResponseDTO = z.infer<typeof TrackingPublicSchema>;
