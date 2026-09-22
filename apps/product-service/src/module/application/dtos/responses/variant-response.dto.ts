import { z } from 'zod';
import { VariantPublicSchema } from '@vubon/shared-schemas/business/product';

export type VariantResponseDTO = z.infer<typeof VariantPublicSchema>;
