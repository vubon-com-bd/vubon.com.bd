import { z } from 'zod';
import { RoutePublicSchema } from '@vubon/shared-schemas/logistics';
export type RouteResponseDTO = z.infer<typeof RoutePublicSchema>;
