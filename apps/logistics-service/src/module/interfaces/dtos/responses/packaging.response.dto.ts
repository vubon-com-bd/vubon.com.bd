import { z } from 'zod';
import { PackagingPublicSchema } from '@vubon/shared-schemas/logistics';
export type PackagingResponseDTO = z.infer<typeof PackagingPublicSchema>;
