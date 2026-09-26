import { z } from 'zod';
import { CollectionPublicSchema } from '@vubon/shared-schemas/business/product';

export type CollectionResponseDTO = z.infer<typeof CollectionPublicSchema>;
