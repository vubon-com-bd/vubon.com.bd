import { z } from 'zod';
import { CategoryPublicSchema } from '@vubon/shared-schemas/business/product';

export type CategoryResponseDTO = z.infer<typeof CategoryPublicSchema>;
