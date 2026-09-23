import { z } from 'zod';
import { RouteSchema } from '@vubon/shared-schemas/logistics';

export type RouteResponseDTO = z.infer<typeof RouteSchema>;
