import { z } from 'zod';
import { TrackingInfoSchema } from '@vubon/shared-schemas/logistics';

export type TrackingResponseDTO = z.infer<typeof TrackingInfoSchema>;
